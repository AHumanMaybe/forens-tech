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
    registry: bool
    cmds: bool
    procList: bool
    netConn: bool
    yara: bool


@app.post("/request")
async def root(response: Response, exec: Exec):
    
    results = getdata(r"c:\Users\antho\Desktop\forens-tech\dumps\cridex.vmem", "none", "info", "cmds", "psl", "net", "file")

    return {"message": "fail!"}