from fastapi import FastAPI, Request, APIRouter, Response, File, UploadFile, Form
from pydantic import BaseModel
import secrets
import hashlib
import time
import json
import os
from fastapi.middleware.cors import CORSMiddleware

import subprocess
import os
from os.path import isfile, join
from os import environ
from google import genai
from dotenv import load_dotenv
import json

load_dotenv()
key = os.getenv('GEMINI_API_KEY')

def callGem(checkMe, type):
    client = genai.Client(api_key=key)
    response = client.models.generate_content (
        model="gemini-2.0-flash", contents=f"The following is data taken from a {type} scan in Volatility3, provide a brief summary in an undecorated brief paragraph of the information and include any possibly suspicious behaviors keep responses as brief as possible while still providing valuable insights and do not repeat any of the provided scan output; \n{checkMe}"
    )

    return response.text

def clean_text(raw_text):
    for text in raw_text:
        for i in raw_text[text]:
            raw_text[text][i] = raw_text[text][i].replace('\\r', '')
            raw_text[text][i] = raw_text[text][i].replace('\\n', '')
            raw_text[text][i] = raw_text[text][i].replace('\\\\\\\\', '\\')

    return raw_text

# insert related terry davis quote here
def parse_csv_render(data):
    data = str(data)
    result = {}

    rows = data.split("\\n")
    if not rows or len(rows) < 2:
        return result  # Return early if there's no data

    labels = rows[0].split(',')
    cleanLabels = []
    for label in labels:
        # if "Name" in label:
        #     label = label.replace('\\r','')

        label = label.replace('\\r', '')
        label = label.replace('\\r','')
        label = label.replace("b'", '')

        cleanLabels.append(label)
    rows = rows[1:]  # Skip the header row

    for i, row in enumerate(rows):
        items = row.split(',')
        result[i] = {}  # Initialize dictionary for each row

        for j in range(min(len(cleanLabels), len(items))):  # Prevent index errors
            result[i][cleanLabels[j]] = items[j]

    return result


# call .getdata for return output on some volatility3 commands
# dump = string with exact path from list to dump file
# yara = string with exact path from list to yara file, if none wanted use none
# args = options info: os info, reg: registry list, cmds: executed commands, psl: process list, net: network connections
def getdata(dump, yara, *args):

    results = {}

    for arg in args:

        if arg == "info":
            proc = subprocess.run(["powershell", "-command", f"vol -f '{dump}' -r csv windows.info"], capture_output=True)


            infoResult = proc.stdout.decode()
            results["info"] = infoResult

        if arg == "cmds":
            proc = subprocess.run(["powershell", "-command", f"vol -f '{dump}' -r csv windows.cmdline"], capture_output=True)

            gemcmds = callGem(proc.stdout.decode(), "list of executed commands")
            cleancmds = parse_csv_render(proc.stdout)
            cleancmds = clean_text(cleancmds)


            results["cmdscount"] = len(cleancmds)
            results["gemcmds"] = gemcmds
            results["cleancmds"] = cleancmds

        if arg == "psl":
            proc = subprocess.run(["powershell", "-command", f"vol -f '{dump}' -r csv windows.pslist"], capture_output=True)

            gempsl = callGem(proc.stdout.decode(), "list windows processes")
            cleanpsl = parse_csv_render(proc.stdout)
            cleanpsl = clean_text(cleanpsl)

            results["pslcount"] = len(cleanpsl)
            results["gempsl"] = gempsl
            results["cleanpsl"] = cleanpsl

        if arg == "net":
            procScan = subprocess.run(["powershell", "-command", f"vol -f '{dump}' -r csv windows.netscan"], capture_output=True)
            procStat = subprocess.run(["powershell", "-command", f"vol -f '{dump}' -r csv windows.netstat"], capture_output=True)

            gemScan = callGem(procScan.stdout.decode(), "checking windows netscan")
            gemStat = callGem(procStat.stdout.decode(), "checking windows netstat")
            cleanScan = parse_csv_render(procScan.stdout)
            cleanScan = clean_text(cleanScan)
            cleanStat = parse_csv_render(procStat.stdout)
            cleanStat = clean_text(cleanStat)

            results["netscancount"] = len(cleanScan)
            results["netstatcount"] = len(cleanStat)
            results["gemScan"] = gemScan
            results["gemStat"] = gemStat
            results["cleanScan"] = cleanScan
            results["cleanStat"] = cleanStat


        if arg == "file":
            proc = subprocess.run(["powershell", "-command", f"vol -f '{dump}' -r csv windows.filescan"], capture_output=True)

            gemfile = callGem(proc.stdout.decode(), "Scans for file objects present in a particular windows memory image")
            cleanfile = parse_csv_render(proc.stdout)
            cleanfile = clean_text(cleanfile)

            results["filecount"] = len(cleanfile)
            results["gemfile"] = gemfile
            results["cleanfile"] = cleanfile

        if arg == "yara":
            proc = subprocess.run([
                "vol", "-r", "csv",
                "-f", dump,
                "windows.vadyarascan",
                "--yara-file", yara
            ], capture_output=True, text=True)

            gemyara = callGem(proc.stdout, "scans using windows.vandyarascan and returns all found yara rule violations")
            cleanyara = parse_csv_render(proc.stdout)
            cleanyara = clean_text(cleanyara)

            results["gemyara"] = gemyara
            results["cleanyara"] = cleanyara

    return results

def getlists():
    dumps = [f for f in os.listdir(r"C:\Users\antho\Desktop\forens-tech\dumps") if isfile(join(r"C:\Users\antho\Desktop\forens-tech\dumps", f))]
    yaras = [f for f in os.listdir(r"C:\Users\antho\Desktop\forens-tech\yara") if isfile(join(r"C:\Users\antho\Desktop\forens-tech\yara", f))]

    response = {"dumps": dumps, "yaras": yaras}

    return response

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Exec(BaseModel):
    dumpName: str
    osInfo: bool
    cmds: bool
    procList: bool
    netConn: bool
    fileList: bool
    yara: bool


@app.post("/request")
async def root(response: Response, dumpName: str = Form(...), osInfo: bool = Form(...), cmds: bool = Form(...), procList: bool = Form(...), netConn: bool = Form(...), fileList: bool = Form(...), yara: bool = Form(...)):

    info = "info" if osInfo else ""
    cmds = "cmds" if cmds else ""
    psl = "psl" if procList else ""
    net = "net" if netConn else ""
    fileList = "file" if fileList else ""

    results = getdata(dumpName, "none", info, cmds, psl, net, fileList)

    return results