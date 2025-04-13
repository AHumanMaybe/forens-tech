from fastapi import FastAPI, Request, APIRouter, Response, File, UploadFile, Form
from pydantic import BaseModel
import secrets
import hashlib
import time
import json
import os

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
async def root(response: Response, exec: Exec):

    info = "info" if exec.osInfo else ""
    cmds = "cmds" if exec.cmds else ""
    psl = "psl" if exec.procList else ""
    net = "net" if exec.netConn else ""
    fileList = "file" if exec.fileList else ""
    
    results = getdata(r"c:\Users\antho\Desktop\forens-tech\dumps\cridex.vmem", "none", info, cmds, psl, net, fileList)

    return json.dumps(json.loads(results))