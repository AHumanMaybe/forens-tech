import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './imageStyles.css'
import React, { useMemo } from "react";
import Dropdown from "./reusable/Dropdown.jsx";
import Checkboxes from "./reusable/Checkboxes.jsx";
import ExecuteBtn from "./reusable/ExecuteBtn.jsx";
import TopNav from './reusable/TopNav.jsx';
import StatBox from "./reusable/StatBox.jsx";
import ExpandData from "./reusable/ExpandData.jsx";
import BackButton from "./reusable/BackButton.jsx";

const testData = {
  "info": "TreeDepth,Variable,Value\r\n0,Kernel Base,0xf800ca419000\r\n0,DTB,0x1ad000\r\n0,Symbols,file:///C:/Users/antho/Desktop/hackViolet/Luna-Flow/.venv/Lib/site-packages/volatility3/symbols/windows/ntkrnlmp.pdb/1E158A6041094205BE17F93E54DD5E51-1.json.xz\r\n0,Is64Bit,True\r\n0,IsPAE,False\r\n0,layer_name,0 WindowsIntel32e\r\n0,memory_layer,1 FileLayer\r\n0,KdVersionBlock,0xf800ca7c0d50\r\n0,Major/Minor,15.17134\r\n0,MachineType,34404\r\n0,KeNumberProcessors,1\r\n0,SystemTime,2018-08-06 18:13:42+00:00\r\n0,NtSystemRoot,C:\\\\Windows\r\n0,NtProductType,NtProductWinNt\r\n0,NtMajorVersion,10\r\n0,NtMinorVersion,0\r\n0,PE MajorOperatingSystemVersion,10\r\n0,PE MinorOperatingSystemVersion,0\r\n0,PE Machine,34404\r\n0,PE TimeDateStamp,Sat Jul 14 03:53:27 2018\r\n\r\n",
  "cmdscount": 156,
  "gemcmds": "The system appears to be running a standard suite of Windows processes. A high number of \"Required memory is not valid\" errors associated with various processes (including notepad.exe, svchost.exe variations, and others) are present, this could indicate instability or possible attempts to access terminated/invalid memory regions. Additionally, there are some instances of `svchost.exe` that may be running from a non-standard location or that have an additional extension `svchost.exe.ex` which are also raising a similar error. These svchost variants warrant further investigation, as well as the high frequency of processes triggering a memory access issue.\n",
  "cleancmds": {
    "0": {
      "TreeDepth": "0",
      "PID": "4",
      "Process": "System",
      "Args": "Required memory at 0x20 is not valid (process exited?)"
    },
    "1": {
      "TreeDepth": "0",
      "PID": "68",
      "Process": "Registry",
      "Args": "Required memory at 0x20 is not valid (process exited?)"
    },
    "2": {
      "TreeDepth": "0",
      "PID": "500",
      "Process": "smss.exe",
      "Args": "\\SystemRoot\\System32\\smss.exe"
    },
    "3": {
      "TreeDepth": "0",
      "PID": "612",
      "Process": "csrss.exe",
      "Args": "\"%SystemRoot%\\system32\\csrss.exe ObjectDirectory=\\Windows SharedSection=1024"
    },
    "4": {
      "TreeDepth": "0",
      "PID": "680",
      "Process": "csrss.exe",
      "Args": "\"%SystemRoot%\\system32\\csrss.exe ObjectDirectory=\\Windows SharedSection=1024"
    },
    "5": {
      "TreeDepth": "0",
      "PID": "696",
      "Process": "wininit.exe",
      "Args": "wininit.exe"
    },
    "6": {
      "TreeDepth": "0",
      "PID": "732",
      "Process": "winlogon.exe",
      "Args": "winlogon.exe"
    },
    "7": {
      "TreeDepth": "0",
      "PID": "804",
      "Process": "services.exe",
      "Args": "C:\\Windows\\system32\\services.exe"
    },
    "8": {
      "TreeDepth": "0",
      "PID": "816",
      "Process": "lsass.exe",
      "Args": "C:\\Windows\\system32\\lsass.exe"
    },
    "9": {
      "TreeDepth": "0",
      "PID": "904",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k dcomlaunch -p -s PlugPlay"
    },
    "10": {
      "TreeDepth": "0",
      "PID": "924",
      "Process": "svchost.exe",
      "Args": "C:\\Windows\\system32\\svchost.exe -k DcomLaunch -p"
    },
    "11": {
      "TreeDepth": "0",
      "PID": "940",
      "Process": "fontdrvhost.ex",
      "Args": "\"\"\"fontdrvhost.exe\"\"\""
    },
    "12": {
      "TreeDepth": "0",
      "PID": "948",
      "Process": "fontdrvhost.ex",
      "Args": "\"\"\"fontdrvhost.exe\"\"\""
    },
    "13": {
      "TreeDepth": "0",
      "PID": "1020",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k rpcss -p"
    },
    "14": {
      "TreeDepth": "0",
      "PID": "628",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k dcomlaunch -p -s LSM"
    },
    "15": {
      "TreeDepth": "0",
      "PID": "800",
      "Process": "svchost.exe",
      "Args": "Required memory at 0xb42530e020 is not valid (process exited?)"
    },
    "16": {
      "TreeDepth": "0",
      "PID": "476",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservice -p -s bthserv"
    },
    "17": {
      "TreeDepth": "0",
      "PID": "1040",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservice -p -s BthAvctpSvc"
    },
    "18": {
      "TreeDepth": "0",
      "PID": "1056",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localsystemnetworkrestricted -p -s NcbService"
    },
    "19": {
      "TreeDepth": "0",
      "PID": "1072",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservicenetworkrestricted -p -s TimeBrokerSvc"
    },
    "20": {
      "TreeDepth": "0",
      "PID": "1144",
      "Process": "dwm.exe",
      "Args": "\"\"\"dwm.exe\"\"\""
    },
    "21": {
      "TreeDepth": "0",
      "PID": "1196",
      "Process": "svchost.exe",
      "Args": "C:\\Windows\\system32\\svchost.exe -k LocalService -p"
    },
    "22": {
      "TreeDepth": "0",
      "PID": "1296",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservicenetworkrestricted -p -s EventLog"
    },
    "23": {
      "TreeDepth": "0",
      "PID": "1336",
      "Process": "vmacthlp.exe",
      "Args": "\"\"\"C:\\Program Files\\VMware\\VMware Tools\\vmacthlp.exe\"\"\""
    },
    "24": {
      "TreeDepth": "0",
      "PID": "1384",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservicenetworkrestricted -s BTAGService"
    },
    "25": {
      "TreeDepth": "0",
      "PID": "1392",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservice -p -s nsi"
    },
    "26": {
      "TreeDepth": "0",
      "PID": "1472",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservicenetworkrestricted -p -s Dhcp"
    },
    "27": {
      "TreeDepth": "0",
      "PID": "1480",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s gpsvc"
    },
    "28": {
      "TreeDepth": "0",
      "PID": "1568",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s lfsvc"
    },
    "29": {
      "TreeDepth": "0",
      "PID": "1576",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s ProfSvc"
    },
    "30": {
      "TreeDepth": "0",
      "PID": "1592",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservice -p -s EventSystem"
    },
    "31": {
      "TreeDepth": "0",
      "PID": "1600",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k networkservice -p -s NlaSvc"
    },
    "32": {
      "TreeDepth": "0",
      "PID": "1608",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localsystemnetworkrestricted -p -s SysMain"
    },
    "33": {
      "TreeDepth": "0",
      "PID": "1632",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s Themes"
    },
    "34": {
      "TreeDepth": "0",
      "PID": "1692",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k networkservice -p -s Dnscache"
    },
    "35": {
      "TreeDepth": "0",
      "PID": "1768",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s Schedule"
    },
    "36": {
      "TreeDepth": "0",
      "PID": "1856",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s SENS"
    },
    "37": {
      "TreeDepth": "0",
      "PID": "1884",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s UserManager"
    },
    "38": {
      "TreeDepth": "0",
      "PID": "1936",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localsystemnetworkrestricted -p -s AudioEndpointBuilder"
    },
    "39": {
      "TreeDepth": "0",
      "PID": "1944",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservice -p -s FontCache"
    },
    "40": {
      "TreeDepth": "0",
      "PID": "1964",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservice -p -s netprofm"
    },
    "41": {
      "TreeDepth": "0",
      "PID": "1096",
      "Process": "MemCompression",
      "Args": "Required memory at 0x20 is inaccessible (swapped)"
    },
    "42": {
      "TreeDepth": "0",
      "PID": "2128",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservicenetworkrestricted -p -s WinHttpAutoProxySvc"
    },
    "43": {
      "TreeDepth": "0",
      "PID": "2164",
      "Process": "svchost.exe",
      "Args": "C:\\Windows\\System32\\svchost.exe -k LocalServiceNetworkRestricted -p"
    },
    "44": {
      "TreeDepth": "0",
      "PID": "2224",
      "Process": "svchost.exe",
      "Args": "C:\\Windows\\System32\\svchost.exe -k LocalServiceNetworkRestricted -p"
    },
    "45": {
      "TreeDepth": "0",
      "PID": "2232",
      "Process": "svchost.exe",
      "Args": "C:\\Windows\\system32\\svchost.exe -k LocalServiceNetworkRestricted -p"
    },
    "46": {
      "TreeDepth": "0",
      "PID": "2276",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s ShellHWDetection"
    },
    "47": {
      "TreeDepth": "0",
      "PID": "2332",
      "Process": "spoolsv.exe",
      "Args": "C:\\Windows\\System32\\spoolsv.exe"
    },
    "48": {
      "TreeDepth": "0",
      "PID": "2400",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservicenonetwork -p"
    },
    "49": {
      "TreeDepth": "0",
      "PID": "2420",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k networkservice -p -s LanmanWorkstation"
    },
    "50": {
      "TreeDepth": "0",
      "PID": "2476",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k appmodel -p -s StateRepository"
    },
    "51": {
      "TreeDepth": "0",
      "PID": "2620",
      "Process": "svchost.exe",
      "Args": "C:\\Windows\\System32\\svchost.exe -k utcsvc -p"
    },
    "52": {
      "TreeDepth": "0",
      "PID": "2628",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservicenonetwork -p -s DPS"
    },
    "53": {
      "TreeDepth": "0",
      "PID": "2636",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k networkservice -p -s CryptSvc"
    },
    "54": {
      "TreeDepth": "0",
      "PID": "2644",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s Winmgmt"
    },
    "55": {
      "TreeDepth": "0",
      "PID": "2680",
      "Process": "SecurityHealth",
      "Args": "C:\\Windows\\system32\\SecurityHealthService.exe"
    },
    "56": {
      "TreeDepth": "0",
      "PID": "2692",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localsystemnetworkrestricted -p -s TrkWks"
    },
    "57": {
      "TreeDepth": "0",
      "PID": "2704",
      "Process": "VGAuthService.",
      "Args": "\"\"\"C:\\Program Files\\VMware\\VMware Tools\\VMware VGAuth\\VGAuthService.exe\"\"\""
    },
    "58": {
      "TreeDepth": "0",
      "PID": "2712",
      "Process": "vmtoolsd.exe",
      "Args": "\"\"\"C:\\Program Files\\VMware\\VMware Tools\\vmtoolsd.exe\"\"\""
    },
    "59": {
      "TreeDepth": "0",
      "PID": "2724",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s LanmanServer"
    },
    "60": {
      "TreeDepth": "0",
      "PID": "2736",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s WpnService"
    },
    "61": {
      "TreeDepth": "0",
      "PID": "2756",
      "Process": "MsMpEng.exe",
      "Args": "\"\"\"C:\\ProgramData\\Microsoft\\Windows Defender\\platform\\4.18.1807.18075-0\\MsMpEng.exe\"\"\""
    },
    "62": {
      "TreeDepth": "0",
      "PID": "2892",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s iphlpsvc"
    },
    "63": {
      "TreeDepth": "0",
      "PID": "2908",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservice -p -s WdiServiceHost"
    },
    "64": {
      "TreeDepth": "0",
      "PID": "3452",
      "Process": "TPAutoConnSvc.",
      "Args": "\"\"\"C:\\Program Files\\VMware\\VMware Tools\\TPAutoConnSvc.exe\"\"\""
    },
    "65": {
      "TreeDepth": "0",
      "PID": "3460",
      "Process": "WmiPrvSE.exe",
      "Args": "C:\\Windows\\system32\\wbem\\wmiprvse.exe"
    },
    "66": {
      "TreeDepth": "0",
      "PID": "3472",
      "Process": "dllhost.exe",
      "Args": "C:\\Windows\\system32\\dllhost.exe /Processid:{02D4B3F1-FD88-11D1-960D-00805FC79235}"
    },
    "67": {
      "TreeDepth": "0",
      "PID": "3796",
      "Process": "msdtc.exe",
      "Args": "C:\\Windows\\System32\\msdtc.exe"
    },
    "68": {
      "TreeDepth": "0",
      "PID": "2060",
      "Process": "sihost.exe",
      "Args": "sihost.exe"
    },
    "69": {
      "TreeDepth": "0",
      "PID": "2020",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k unistacksvcgroup -s CDPUserSvc"
    },
    "70": {
      "TreeDepth": "0",
      "PID": "4132",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k unistacksvcgroup -s WpnUserService"
    },
    "71": {
      "TreeDepth": "0",
      "PID": "4260",
      "Process": "taskhostw.exe",
      "Args": "taskhostw.exe {222A245B-E637-4AE9-A93F-A59CA119A75E}"
    },
    "72": {
      "TreeDepth": "0",
      "PID": "4304",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s TokenBroker"
    },
    "73": {
      "TreeDepth": "0",
      "PID": "4400",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localsystemnetworkrestricted -p -s TabletInputService"
    },
    "74": {
      "TreeDepth": "0",
      "PID": "4488",
      "Process": "ctfmon.exe",
      "Args": "\"\"\"ctfmon.exe\"\"\""
    },
    "75": {
      "TreeDepth": "0",
      "PID": "4668",
      "Process": "NisSrv.exe",
      "Args": "\"\"\"C:\\ProgramData\\Microsoft\\Windows Defender\\platform\\4.18.1807.18075-0\\NisSrv.exe\"\"\""
    },
    "76": {
      "TreeDepth": "0",
      "PID": "4756",
      "Process": "userinit.exe",
      "Args": "Required memory at 0x5d2a53f020 is not valid (process exited?)"
    },
    "77": {
      "TreeDepth": "0",
      "PID": "4824",
      "Process": "explorer.exe",
      "Args": "C:\\Windows\\Explorer.EXE"
    },
    "78": {
      "TreeDepth": "0",
      "PID": "4960",
      "Process": "TPAutoConnect.",
      "Args": "TPAutoConnect.exe -q -i vmware -a COM1 -F 30"
    },
    "79": {
      "TreeDepth": "0",
      "PID": "4976",
      "Process": "conhost.exe",
      "Args": "\\??\\C:\\Windows\\system32\\conhost.exe 0x4"
    },
    "80": {
      "TreeDepth": "0",
      "PID": "5048",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservice -p -s CDPSvc"
    },
    "81": {
      "TreeDepth": "0",
      "PID": "4040",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localserviceandnoimpersonation -p -s SSDPSRV"
    },
    "82": {
      "TreeDepth": "0",
      "PID": "3648",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localsystemnetworkrestricted -p -s PcaSvc"
    },
    "83": {
      "TreeDepth": "0",
      "PID": "5264",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservice -p -s LicenseManager"
    },
    "84": {
      "TreeDepth": "0",
      "PID": "5304",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p"
    },
    "85": {
      "TreeDepth": "0",
      "PID": "5716",
      "Process": "ie4uinit.exe",
      "Args": "Required memory at 0xca7a21a020 is not valid (process exited?)"
    },
    "86": {
      "TreeDepth": "0",
      "PID": "5872",
      "Process": "dllhost.exe",
      "Args": "C:\\Windows\\system32\\DllHost.exe /Processid:{AB8902B4-09CA-4BB6-B78D-A8F59079A8D5}"
    },
    "87": {
      "TreeDepth": "0",
      "PID": "6028",
      "Process": "SearchIndexer.",
      "Args": "C:\\Windows\\system32\\SearchIndexer.exe /Embedding"
    },
    "88": {
      "TreeDepth": "0",
      "PID": "6108",
      "Process": "ShellExperienc",
      "Args": "\"\"\"C:\\Windows\\SystemApps\\ShellExperienceHost_cw5n1h2txyewy\\ShellExperienceHost.exe\"\" -ServerName:App.AppXtk181tbxbce2qsex02s8tw7hfxa9xb3t.mca\""
    },
    "89": {
      "TreeDepth": "0",
      "PID": "4768",
      "Process": "RuntimeBroker.",
      "Args": "C:\\Windows\\System32\\RuntimeBroker.exe -Embedding"
    },
    "90": {
      "TreeDepth": "0",
      "PID": "5420",
      "Process": "SearchUI.exe",
      "Args": "Required memory at 0x55090e020 is inaccessible (swapped)"
    },
    "91": {
      "TreeDepth": "0",
      "PID": "1116",
      "Process": "RuntimeBroker.",
      "Args": "C:\\Windows\\System32\\RuntimeBroker.exe -Embedding"
    },
    "92": {
      "TreeDepth": "0",
      "PID": "6236",
      "Process": "ApplicationFra",
      "Args": "C:\\Windows\\system32\\ApplicationFrameHost.exe -Embedding"
    },
    "93": {
      "TreeDepth": "0",
      "PID": "6488",
      "Process": "RuntimeBroker.",
      "Args": "C:\\Windows\\System32\\RuntimeBroker.exe -Embedding"
    },
    "94": {
      "TreeDepth": "0",
      "PID": "6524",
      "Process": "MicrosoftEdge.",
      "Args": "Required memory at 0xa626ba020 is not valid (process exited?)"
    },
    "95": {
      "TreeDepth": "0",
      "PID": "6640",
      "Process": "RuntimeBroker.",
      "Args": "Required memory at 0xdd36b95020 is not valid (process exited?)"
    },
    "96": {
      "TreeDepth": "0",
      "PID": "6268",
      "Process": "MSASCuiL.exe",
      "Args": "\"\"\"C:\\Program Files\\Windows Defender\\MSASCuiL.exe\"\" \""
    },
    "97": {
      "TreeDepth": "0",
      "PID": "3372",
      "Process": "vmtoolsd.exe",
      "Args": "\"\"\"C:\\Program Files\\VMware\\VMware Tools\\vmtoolsd.exe\"\" -n vmusr\""
    },
    "98": {
      "TreeDepth": "0",
      "PID": "2200",
      "Process": "OneDrive.exe",
      "Args": "\"\"\"C:\\Users\\CTF\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe\"\" /background\""
    },
    "99": {
      "TreeDepth": "0",
      "PID": "5024",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k networkservice -p -s DoSvc"
    },
    "100": {
      "TreeDepth": "0",
      "PID": "4244",
      "Process": "SgrmBroker.exe",
      "Args": "C:\\Windows\\system32\\SgrmBroker.exe"
    },
    "101": {
      "TreeDepth": "0",
      "PID": "5940",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localservicenetworkrestricted -p -s wscsvc"
    },
    "102": {
      "TreeDepth": "0",
      "PID": "6744",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k unistacksvcgroup"
    },
    "103": {
      "TreeDepth": "0",
      "PID": "2888",
      "Process": "svchost.exe",
      "Args": "Required memory at 0xd246dfa020 is not valid (process exited?)"
    },
    "104": {
      "TreeDepth": "0",
      "PID": "2660",
      "Process": "SystemSettings",
      "Args": "C:\\Windows\\System32\\SystemSettingsBroker.exe -Embedding"
    },
    "105": {
      "TreeDepth": "0",
      "PID": "7384",
      "Process": "dllhost.exe",
      "Args": "C:\\Windows\\system32\\DllHost.exe /Processid:{973D20D7-562D-44B9-B70B-5A0F49CCDF3F}"
    },
    "106": {
      "TreeDepth": "0",
      "PID": "7328",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localsystemnetworkrestricted -p -s SensorService"
    },
    "107": {
      "TreeDepth": "0",
      "PID": "10024",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k localsystemnetworkrestricted -p -s StorSvc"
    },
    "108": {
      "TreeDepth": "0",
      "PID": "9408",
      "Process": "taskhostw.exe",
      "Args": "taskhostw.exe"
    },
    "109": {
      "TreeDepth": "0",
      "PID": "6552",
      "Process": "MicrosoftEdge.",
      "Args": "Required memory at 0x58d8900020 is not valid (process exited?)"
    },
    "110": {
      "TreeDepth": "0",
      "PID": "3884",
      "Process": "cmd.exe",
      "Args": "\"\"\"C:\\Windows\\system32\\cmd.exe\"\" \""
    },
    "111": {
      "TreeDepth": "0",
      "PID": "9912",
      "Process": "conhost.exe",
      "Args": "\\??\\C:\\Windows\\system32\\conhost.exe 0x4"
    },
    "112": {
      "TreeDepth": "0",
      "PID": "8868",
      "Process": "cmd.exe",
      "Args": "Required memory at 0x36f2d3f020 is not valid (process exited?)"
    },
    "113": {
      "TreeDepth": "0",
      "PID": "7136",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s Appinfo"
    },
    "114": {
      "TreeDepth": "0",
      "PID": "6884",
      "Process": "dllhost.exe",
      "Args": "C:\\Windows\\system32\\DllHost.exe /Processid:{3AD05575-8857-4850-9277-11B85BDB8E09}"
    },
    "115": {
      "TreeDepth": "0",
      "PID": "3224",
      "Process": "svchost.exe",
      "Args": "C:\\Windows\\system32\\svchost.exe -k SDRSVC"
    },
    "116": {
      "TreeDepth": "0",
      "PID": "10012",
      "Process": "svchost.exe",
      "Args": "Required memory at 0x437c04a020 is not valid (process exited?)"
    },
    "117": {
      "TreeDepth": "0",
      "PID": "7852",
      "Process": "svchost.exe",
      "Args": "Required memory at 0xe0db1a3020 is not valid (process exited?)"
    },
    "118": {
      "TreeDepth": "0",
      "PID": "6948",
      "Process": "Bubbles.scr",
      "Args": "Required memory at 0x99cd406020 is not valid (process exited?)"
    },
    "119": {
      "TreeDepth": "0",
      "PID": "10204",
      "Process": "Bubbles.scr",
      "Args": "Required memory at 0xb29466f020 is not valid (process exited?)"
    },
    "120": {
      "TreeDepth": "0",
      "PID": "6532",
      "Process": "ByteCodeGenera",
      "Args": "Required memory at 0x6bfa80f020 is not valid (process exited?)"
    },
    "121": {
      "TreeDepth": "0",
      "PID": "6324",
      "Process": "dxdiag.exe",
      "Args": "Required memory at 0xe0424dc020 is not valid (process exited?)"
    },
    "122": {
      "TreeDepth": "0",
      "PID": "252",
      "Process": "xwizard.exe",
      "Args": "Required memory at 0x7676a31020 is not valid (process exited?)"
    },
    "123": {
      "TreeDepth": "0",
      "PID": "8140",
      "Process": "svchost.exe.ex",
      "Args": "Required memory at 0x99ae94e020 is not valid (process exited?)"
    },
    "124": {
      "TreeDepth": "0",
      "PID": "6176",
      "Process": "svchost.exe.ex",
      "Args": "Required memory at 0x730dc1d020 is not valid (process exited?)"
    },
    "125": {
      "TreeDepth": "0",
      "PID": "5528",
      "Process": "svchost.exe.ex",
      "Args": "Required memory at 0xbf6f581020 is not valid (process exited?)"
    },
    "126": {
      "TreeDepth": "0",
      "PID": "3016",
      "Process": "scvhost.exe.ex",
      "Args": "Required memory at 0x6d97a43020 is not valid (process exited?)"
    },
    "127": {
      "TreeDepth": "0",
      "PID": "336",
      "Process": "scvhost.exe.ex",
      "Args": "Required memory at 0xff7c15f020 is not valid (process exited?)"
    },
    "128": {
      "TreeDepth": "0",
      "PID": "1404",
      "Process": "svchost.exe",
      "Args": "Required memory at 0x284020 is not valid (process exited?)"
    },
    "129": {
      "TreeDepth": "0",
      "PID": "360",
      "Process": "scvhost.exe",
      "Args": "Required memory at 0x372020 is not valid (process exited?)"
    },
    "130": {
      "TreeDepth": "0",
      "PID": "7968",
      "Process": "notepad.exe",
      "Args": "Required memory at 0x6e92cc020 is not valid (process exited?)"
    },
    "131": {
      "TreeDepth": "0",
      "PID": "8852",
      "Process": "svchost.exe",
      "Args": "Required memory at 0xa0d020 is not valid (process exited?)"
    },
    "132": {
      "TreeDepth": "0",
      "PID": "400",
      "Process": "OfficeHubTaskH",
      "Args": "\"\"\"C:\\Program Files\\WindowsApps\\Microsoft.MicrosoftOfficeHub_17.10314.31700.0_x64__8wekyb3d8bbwe\\Office16\\OfficeHubTaskHost.exe\"\" -ServerName:Microsoft.MicrosoftOfficeHub.AppX6an27ssxm1kq22j0wm54a996rsgjh8an.mca\""
    },
    "133": {
      "TreeDepth": "0",
      "PID": "2744",
      "Process": "RuntimeBroker.",
      "Args": "C:\\Windows\\System32\\RuntimeBroker.exe -Embedding"
    },
    "134": {
      "TreeDepth": "0",
      "PID": "9128",
      "Process": "notepad.exe",
      "Args": "Required memory at 0xc6d2c1b020 is not valid (process exited?)"
    },
    "135": {
      "TreeDepth": "0",
      "PID": "7624",
      "Process": "smartscreen.ex",
      "Args": "C:\\Windows\\System32\\smartscreen.exe -Embedding"
    },
    "136": {
      "TreeDepth": "0",
      "PID": "8800",
      "Process": "notepad.exe",
      "Args": "Required memory at 0xfb0193c020 is not valid (process exited?)"
    },
    "137": {
      "TreeDepth": "0",
      "PID": "6372",
      "Process": "notepad - Copy",
      "Args": "Required memory at 0x56b0991020 is not valid (process exited?)"
    },
    "138": {
      "TreeDepth": "0",
      "PID": "2356",
      "Process": "audiodg.exe",
      "Args": "C:\\Windows\\system32\\AUDIODG.EXE 0x398"
    },
    "139": {
      "TreeDepth": "0",
      "PID": "3504",
      "Process": "notepad - Copy",
      "Args": "Required memory at 0x5f6425c020 is not valid (process exited?)"
    },
    "140": {
      "TreeDepth": "0",
      "PID": "2296",
      "Process": "SkypeHost.exe",
      "Args": "\"\"\"C:\\Program Files\\WindowsApps\\Microsoft.SkypeApp_12.1815.210.0_x64__kzf8qxf38zg5c\\SkypeHost.exe\"\" -ServerName:SkypeHost.ServerServer\""
    },
    "141": {
      "TreeDepth": "0",
      "PID": "3948",
      "Process": "RuntimeBroker.",
      "Args": "C:\\Windows\\System32\\RuntimeBroker.exe -Embedding"
    },
    "142": {
      "TreeDepth": "0",
      "PID": "7260",
      "Process": "svchost.exe",
      "Args": "C:\\Windows\\System32\\svchost.exe -k wsappx -p -s ClipSVC"
    },
    "143": {
      "TreeDepth": "0",
      "PID": "8560",
      "Process": "svchost.exe",
      "Args": "\"\"\"C:\\Windows\\svchost.exe\"\" \""
    },
    "144": {
      "TreeDepth": "0",
      "PID": "5028",
      "Process": "svchost.exe",
      "Args": "C:\\Windows\\system32\\svchost.exe -k appmodel -p -s camsvc"
    },
    "145": {
      "TreeDepth": "0",
      "PID": "9388",
      "Process": "svchost.exe",
      "Args": "C:\\Windows\\System32\\svchost.exe -k LocalServiceNetworkRestricted -p -s lmhosts"
    },
    "146": {
      "TreeDepth": "0",
      "PID": "8108",
      "Process": "svchost.exe",
      "Args": "C:\\Windows\\system32\\svchost.exe -k netsvcs -p -s wlidsvc"
    },
    "147": {
      "TreeDepth": "0",
      "PID": "6848",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k wusvcs -p -s WaaSMedicSvc"
    },
    "148": {
      "TreeDepth": "0",
      "PID": "5632",
      "Process": "WmiPrvSE.exe",
      "Args": "C:\\Windows\\system32\\wbem\\wmiprvse.exe"
    },
    "149": {
      "TreeDepth": "0",
      "PID": "1992",
      "Process": "svchost.exe",
      "Args": "Required memory at 0x3761664020 is not valid (process exited?)"
    },
    "150": {
      "TreeDepth": "0",
      "PID": "8708",
      "Process": "svchost.exe",
      "Args": "C:\\Windows\\System32\\svchost.exe -k LocalSystemNetworkRestricted -p -s WdiSystemHost"
    },
    "151": {
      "TreeDepth": "0",
      "PID": "8808",
      "Process": "svchost.exe",
      "Args": "C:\\Windows\\system32\\svchost.exe -k wsappx -p -s AppXSvc"
    },
    "152": {
      "TreeDepth": "0",
      "PID": "5712",
      "Process": "svchost.exe",
      "Args": "c:\\windows\\system32\\svchost.exe -k netsvcs -p -s BITS"
    },
    "153": {
      "TreeDepth": "0",
      "PID": "1412",
      "Process": "notepad.exe",
      "Args": "Required memory at 0x9c6b514020 is not valid (process exited?)"
    },
    "154": {
      "TreeDepth": "0",
      "PID": "6376",
      "Process": "SearchProtocol",
      "Args": "Required memory at 0xb78dc3d020 is not valid (process exited?)"
    },
    "155": {
      "TreeDepth": "'"
    }
  },
  "netscancount": 75,
  "netstatcount": 47,
  "gemScan": "The netscan data reveals multiple processes establishing and closing TCP connections, primarily over port 443 (HTTPS) and port 80 (HTTP).  `SearchUI.exe` and `svchost.exe` are frequently involved in these connections with various external IP addresses, including Microsoft-owned IPs (13.107.0.0/16). There are also LISTENING ports associated with System processes and standard services. A concerning find is a TCP connection (10.0.2.143:51460 to 52.179.129.229:443) with a missing PID and Owner, potentially indicating a terminated or hidden process.\n",
  "gemStat": "The system exhibits numerous listening ports across both TCPv4 and TCPv6, primarily associated with `svchost.exe`, `System`, `wininit.exe`, `spoolsv.exe`, `services.exe`, and `lsass.exe`, which is typical behavior.  Additionally, `SearchUI.exe` has an established connection to a Microsoft address (13.107.21.200) on port 443 (HTTPS), which is expected, as well as `svchost.exe` to  (52.173.24.17)  on port 443 (HTTPS). The wide range of UDP ports in use by `svchost.exe` warrant further investigation to ensure legitimate activity, particularly considering the use of both IPv4 and IPv6 addresses.\n",
  "cleanScan": {
    "0": {
      "TreeDepth": "0",
      "Offset": "0xa780001eddf0",
      "Proto": "UDPv6",
      "LocalAddr": "::1",
      "LocalPort": "1900",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "1": {
      "TreeDepth": "0",
      "Offset": "0xc20c69c71570",
      "Proto": "UDPv6",
      "LocalAddr": "fe80::19bd:cb63:80a8:8c7",
      "LocalPort": "546",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1472",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:47.000000 UTC"
    },
    "2": {
      "TreeDepth": "0",
      "Offset": "0xc20c6a4b0350",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51431",
      "ForeignAddr": "13.107.255.168",
      "ForeignPort": "443",
      "State": "ESTABLISHED",
      "PID": "5420",
      "Owner": "SearchUI.exe",
      "Created": "2018-08-06 18:12:44.000000 UTC"
    },
    "3": {
      "TreeDepth": "0",
      "Offset": "0xc20c6a7f9cc0",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51435",
      "ForeignAddr": "13.107.21.200",
      "ForeignPort": "443",
      "State": "CLOSED",
      "PID": "5420",
      "Owner": "SearchUI.exe",
      "Created": "2018-08-06 18:12:46.000000 UTC"
    },
    "4": {
      "TreeDepth": "0",
      "Offset": "0xc20c6a84b7c0",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51452",
      "ForeignAddr": "13.107.4.50",
      "ForeignPort": "80",
      "State": "ESTABLISHED",
      "PID": "5024",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:13:09.000000 UTC"
    },
    "5": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b22d9f0",
      "Proto": "UDPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "137",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4",
      "Owner": "System",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "6": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b269010",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "139",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "4",
      "Owner": "System",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "7": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b31aa60",
      "Proto": "UDPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "5353",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "8": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b4dddf0",
      "Proto": "UDPv6",
      "LocalAddr": "::1",
      "LocalPort": "1900",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "9": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b4fb260",
      "Proto": "UDPv6",
      "LocalAddr": "fe80::19bd:cb63:80a8:8c7",
      "LocalPort": "1900",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "10": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b500eb0",
      "Proto": "UDPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "5050",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "5048",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:21:01.000000 UTC"
    },
    "11": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b5128b0",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51381",
      "ForeignAddr": "204.79.197.200",
      "ForeignPort": "443",
      "State": "CLOSED",
      "PID": "4076",
      "Owner": "wuauclt.exe",
      "Created": "2018-08-06 18:12:13.000000 UTC"
    },
    "12": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b5b4eb0",
      "Proto": "UDPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "1900",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "13": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b607c90",
      "Proto": "UDPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "5355",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:12:00.000000 UTC"
    },
    "14": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b607c90",
      "Proto": "UDPv6",
      "LocalAddr": "::",
      "LocalPort": "5355",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:12:00.000000 UTC"
    },
    "15": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b60bc20",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51448",
      "ForeignAddr": "72.21.91.29",
      "ForeignPort": "80",
      "State": "CLOSED",
      "PID": "2636",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:13:03.000000 UTC"
    },
    "16": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b91dbc0",
      "Proto": "UDPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "5355",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:12:00.000000 UTC"
    },
    "17": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ba198a0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49664",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "696",
      "Owner": "wininit.exe",
      "Created": "2018-08-01 19:20:28.000000 UTC"
    },
    "18": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ba198a0",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "49664",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "696",
      "Owner": "wininit.exe",
      "Created": "2018-08-01 19:20:28.000000 UTC"
    },
    "19": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ba19ec0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49664",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "696",
      "Owner": "wininit.exe",
      "Created": "2018-08-01 19:20:28.000000 UTC"
    },
    "20": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ba2f9a0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "135",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1020",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:28.000000 UTC"
    },
    "21": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ba2f9a0",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "135",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1020",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:28.000000 UTC"
    },
    "22": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ba41ec0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "135",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1020",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:28.000000 UTC"
    },
    "23": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bb6bba0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49665",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1296",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:30.000000 UTC"
    },
    "24": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bbb8ec0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49665",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1296",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:30.000000 UTC"
    },
    "25": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bbb8ec0",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "49665",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1296",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:30.000000 UTC"
    },
    "26": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bc65850",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51454",
      "ForeignAddr": "184.26.143.122",
      "ForeignPort": "80",
      "State": "CLOSED",
      "PID": "2636",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:13:14.000000 UTC"
    },
    "27": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bd6eeb0",
      "Proto": "UDPv6",
      "LocalAddr": "fe80::19bd:cb63:80a8:8c7",
      "LocalPort": "64855",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "28": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bd93b30",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "5040",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "5048",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:21:04.000000 UTC"
    },
    "29": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bdbd010",
      "Proto": "UDPv4",
      "LocalAddr": "127.0.0.1",
      "LocalPort": "52442",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "2892",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:36.000000 UTC"
    },
    "30": {
      "TreeDepth": "0",
      "Offset": "0xc20c6be50010",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49666",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1768",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:31.000000 UTC"
    },
    "31": {
      "TreeDepth": "0",
      "Offset": "0xc20c6be50010",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "49666",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1768",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:31.000000 UTC"
    },
    "32": {
      "TreeDepth": "0",
      "Offset": "0xc20c6be52bf0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49666",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1768",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:31.000000 UTC"
    },
    "33": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bf39440",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49667",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "2332",
      "Owner": "spoolsv.exe",
      "Created": "2018-08-01 19:20:33.000000 UTC"
    },
    "34": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c0359f0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49667",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "2332",
      "Owner": "spoolsv.exe",
      "Created": "2018-08-01 19:20:33.000000 UTC"
    },
    "35": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c0359f0",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "49667",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "2332",
      "Owner": "spoolsv.exe",
      "Created": "2018-08-01 19:20:33.000000 UTC"
    },
    "36": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c219820",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49672",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "804",
      "Owner": "services.exe",
      "Created": "2018-08-01 19:20:35.000000 UTC"
    },
    "37": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c28eec0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49674",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "816",
      "Owner": "lsass.exe",
      "Created": "2018-08-01 19:20:38.000000 UTC"
    },
    "38": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c290ec0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "445",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "4",
      "Owner": "System",
      "Created": "2018-08-01 19:20:36.000000 UTC"
    },
    "39": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c290ec0",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "445",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "4",
      "Owner": "System",
      "Created": "2018-08-01 19:20:36.000000 UTC"
    },
    "40": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c29d400",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49672",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "804",
      "Owner": "services.exe",
      "Created": "2018-08-01 19:20:35.000000 UTC"
    },
    "41": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c29d400",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "49672",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "804",
      "Owner": "services.exe",
      "Created": "2018-08-01 19:20:35.000000 UTC"
    },
    "42": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c371c70",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49674",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "816",
      "Owner": "lsass.exe",
      "Created": "2018-08-01 19:20:39.000000 UTC"
    },
    "43": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c371c70",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "49674",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "816",
      "Owner": "lsass.exe",
      "Created": "2018-08-01 19:20:39.000000 UTC"
    },
    "44": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c439180",
      "Proto": "UDPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "138",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4",
      "Owner": "System",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "45": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c856500",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51385",
      "ForeignAddr": "51.5.150.212",
      "ForeignPort": "443",
      "State": "CLOSED",
      "PID": "5420",
      "Owner": "SearchUI.exe",
      "Created": "2018-08-06 18:12:16.000000 UTC"
    },
    "46": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c863a70",
      "Proto": "UDPv4",
      "LocalAddr": "127.0.0.1",
      "LocalPort": "1900",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "47": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c86aa70",
      "Proto": "UDPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "0",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "48": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c86aa70",
      "Proto": "UDPv6",
      "LocalAddr": "::",
      "LocalPort": "0",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "49": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c8db4a0",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51344",
      "ForeignAddr": "52.109.12.19",
      "ForeignPort": "443",
      "State": "CLOSED",
      "PID": "400",
      "Owner": "OfficeHubTaskH",
      "Created": "2018-08-01 20:03:52.000000 UTC"
    },
    "50": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ca93780",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51403",
      "ForeignAddr": "205.185.216.10",
      "ForeignPort": "80",
      "State": "CLOSED",
      "PID": "5024",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:12:28.000000 UTC"
    },
    "51": {
      "TreeDepth": "0",
      "Offset": "0xc20c6cd7bc20",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51430",
      "ForeignAddr": "51.5.150.212",
      "ForeignPort": "443",
      "State": "CLOSED",
      "PID": "5420",
      "Owner": "SearchUI.exe",
      "Created": "2018-08-06 18:12:43.000000 UTC"
    },
    "52": {
      "TreeDepth": "0",
      "Offset": "0xc20c6cdf5870",
      "Proto": "UDPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "5353",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "53": {
      "TreeDepth": "0",
      "Offset": "0xc20c6cdf5870",
      "Proto": "UDPv6",
      "LocalAddr": "::",
      "LocalPort": "5353",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "54": {
      "TreeDepth": "0",
      "Offset": "0xc20c6cf8a2f0",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51384",
      "ForeignAddr": "13.107.136.254",
      "ForeignPort": "443",
      "State": "CLOSED",
      "PID": "5420",
      "Owner": "SearchUI.exe",
      "Created": "2018-08-06 18:12:15.000000 UTC"
    },
    "55": {
      "TreeDepth": "0",
      "Offset": "0xc20c6cfda840",
      "Proto": "UDPv6",
      "LocalAddr": "::1",
      "LocalPort": "64856",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "56": {
      "TreeDepth": "0",
      "Offset": "0xc20c6d3abcc0",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51446",
      "ForeignAddr": "72.21.91.29",
      "ForeignPort": "80",
      "State": "ESTABLISHED",
      "PID": "2636",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:13:03.000000 UTC"
    },
    "57": {
      "TreeDepth": "0",
      "Offset": "0xc20c6d416280",
      "Proto": "UDPv4",
      "LocalAddr": "127.0.0.1",
      "LocalPort": "64858",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "58": {
      "TreeDepth": "0",
      "Offset": "0xc20c6d416570",
      "Proto": "UDPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "64857",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "59": {
      "TreeDepth": "0",
      "Offset": "0xc20c6d4495f0",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51455",
      "ForeignAddr": "72.21.91.29",
      "ForeignPort": "80",
      "State": "CLOSED",
      "PID": "2636",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:13:14.000000 UTC"
    },
    "60": {
      "TreeDepth": "0",
      "Offset": "0xc20c6d4dd010",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51451",
      "ForeignAddr": "52.160.42.250",
      "ForeignPort": "443",
      "State": "ESTABLISHED",
      "PID": "2756",
      "Owner": "MsMpEng.exe",
      "Created": "2018-08-06 18:13:09.000000 UTC"
    },
    "61": {
      "TreeDepth": "0",
      "Offset": "0xc20c6d666610",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51427",
      "ForeignAddr": "205.185.216.42",
      "ForeignPort": "80",
      "State": "CLOSED",
      "PID": "5024",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:12:38.000000 UTC"
    },
    "62": {
      "TreeDepth": "0",
      "Offset": "0xc20c6d88b280",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51456",
      "ForeignAddr": "184.26.143.122",
      "ForeignPort": "80",
      "State": "CLOSED",
      "PID": "2636",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:13:30.000000 UTC"
    },
    "63": {
      "TreeDepth": "0",
      "Offset": "0xc20c6d98b010",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51447",
      "ForeignAddr": "184.26.143.122",
      "ForeignPort": "80",
      "State": "CLOSED",
      "PID": "2636",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:13:03.000000 UTC"
    },
    "64": {
      "TreeDepth": "0",
      "Offset": "0xc20c6d98d350",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51394",
      "ForeignAddr": "23.43.241.224",
      "ForeignPort": "443",
      "State": "CLOSED",
      "PID": "5712",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:12:26.000000 UTC"
    },
    "65": {
      "TreeDepth": "0",
      "Offset": "0xc20c6d9ca180",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51453",
      "ForeignAddr": "13.107.4.50",
      "ForeignPort": "80",
      "State": "ESTABLISHED",
      "PID": "5024",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:13:10.000000 UTC"
    },
    "66": {
      "TreeDepth": "0",
      "Offset": "0xc20c6dc61b30",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51460",
      "ForeignAddr": "52.179.129.229",
      "ForeignPort": "443",
      "State": "CLOSED",
      "PID": "-",
      "Owner": "-",
      "Created": "2018-08-06 18:13:49.000000 UTC"
    },
    "67": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ddca630",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51436",
      "ForeignAddr": "13.107.21.200",
      "ForeignPort": "443",
      "State": "ESTABLISHED",
      "PID": "5420",
      "Owner": "SearchUI.exe",
      "Created": "2018-08-06 18:12:46.000000 UTC"
    },
    "68": {
      "TreeDepth": "0",
      "Offset": "0xc20c6e3bc5b0",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51343",
      "ForeignAddr": "52.109.6.5",
      "ForeignPort": "443",
      "State": "CLOSED",
      "PID": "400",
      "Owner": "OfficeHubTaskH",
      "Created": "2018-08-01 20:03:52.000000 UTC"
    },
    "69": {
      "TreeDepth": "0",
      "Offset": "0xc20c6e3c47e0",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51391",
      "ForeignAddr": "131.253.61.86",
      "ForeignPort": "443",
      "State": "ESTABLISHED",
      "PID": "8108",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:12:26.000000 UTC"
    },
    "70": {
      "TreeDepth": "0",
      "Offset": "0xc20c6e4af700",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51458",
      "ForeignAddr": "184.26.143.122",
      "ForeignPort": "80",
      "State": "CLOSED",
      "PID": "2636",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:13:32.000000 UTC"
    },
    "71": {
      "TreeDepth": "0",
      "Offset": "0xc20c6e7f4820",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51358",
      "ForeignAddr": "52.173.24.17",
      "ForeignPort": "443",
      "State": "ESTABLISHED",
      "PID": "2736",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:12:00.000000 UTC"
    },
    "72": {
      "TreeDepth": "0",
      "Offset": "0xf800caf54350",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51431",
      "ForeignAddr": "13.107.255.168",
      "ForeignPort": "443",
      "State": "ESTABLISHED",
      "PID": "5420",
      "Owner": "SearchUI.exe",
      "Created": "2018-08-06 18:12:44.000000 UTC"
    },
    "73": {
      "TreeDepth": ""
    },
    "74": {
      "TreeDepth": "'"
    }
  },
  "cleanStat": {
    "0": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ddca630",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51436",
      "ForeignAddr": "13.107.21.200",
      "ForeignPort": "443",
      "State": "ESTABLISHED",
      "PID": "5420",
      "Owner": "SearchUI.exe",
      "Created": "2018-08-06 18:12:46.000000 UTC"
    },
    "1": {
      "TreeDepth": "0",
      "Offset": "0xc20c6e7f4820",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "51358",
      "ForeignAddr": "52.173.24.17",
      "ForeignPort": "443",
      "State": "ESTABLISHED",
      "PID": "2736",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:12:00.000000 UTC"
    },
    "2": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ba2f9a0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "135",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1020",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:28.000000 UTC"
    },
    "3": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ba2f9a0",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "135",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1020",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:28.000000 UTC"
    },
    "4": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ba41ec0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "135",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1020",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:28.000000 UTC"
    },
    "5": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b269010",
      "Proto": "TCPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "139",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "4",
      "Owner": "System",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "6": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c290ec0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "445",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "4",
      "Owner": "System",
      "Created": "2018-08-01 19:20:36.000000 UTC"
    },
    "7": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c290ec0",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "445",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "4",
      "Owner": "System",
      "Created": "2018-08-01 19:20:36.000000 UTC"
    },
    "8": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bd93b30",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "5040",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "5048",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:21:04.000000 UTC"
    },
    "9": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ba198a0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49664",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "696",
      "Owner": "wininit.exe",
      "Created": "2018-08-01 19:20:28.000000 UTC"
    },
    "10": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ba198a0",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "49664",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "696",
      "Owner": "wininit.exe",
      "Created": "2018-08-01 19:20:28.000000 UTC"
    },
    "11": {
      "TreeDepth": "0",
      "Offset": "0xc20c6ba19ec0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49664",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "696",
      "Owner": "wininit.exe",
      "Created": "2018-08-01 19:20:28.000000 UTC"
    },
    "12": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bbb8ec0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49665",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1296",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:30.000000 UTC"
    },
    "13": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bbb8ec0",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "49665",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1296",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:30.000000 UTC"
    },
    "14": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bb6bba0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49665",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1296",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:30.000000 UTC"
    },
    "15": {
      "TreeDepth": "0",
      "Offset": "0xc20c6be50010",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49666",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1768",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:31.000000 UTC"
    },
    "16": {
      "TreeDepth": "0",
      "Offset": "0xc20c6be50010",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "49666",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1768",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:31.000000 UTC"
    },
    "17": {
      "TreeDepth": "0",
      "Offset": "0xc20c6be52bf0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49666",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "1768",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:31.000000 UTC"
    },
    "18": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c0359f0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49667",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "2332",
      "Owner": "spoolsv.exe",
      "Created": "2018-08-01 19:20:33.000000 UTC"
    },
    "19": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c0359f0",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "49667",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "2332",
      "Owner": "spoolsv.exe",
      "Created": "2018-08-01 19:20:33.000000 UTC"
    },
    "20": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bf39440",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49667",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "2332",
      "Owner": "spoolsv.exe",
      "Created": "2018-08-01 19:20:33.000000 UTC"
    },
    "21": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c29d400",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49672",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "804",
      "Owner": "services.exe",
      "Created": "2018-08-01 19:20:35.000000 UTC"
    },
    "22": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c29d400",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "49672",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "804",
      "Owner": "services.exe",
      "Created": "2018-08-01 19:20:35.000000 UTC"
    },
    "23": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c219820",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49672",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "804",
      "Owner": "services.exe",
      "Created": "2018-08-01 19:20:35.000000 UTC"
    },
    "24": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c371c70",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49674",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "816",
      "Owner": "lsass.exe",
      "Created": "2018-08-01 19:20:39.000000 UTC"
    },
    "25": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c371c70",
      "Proto": "TCPv6",
      "LocalAddr": "::",
      "LocalPort": "49674",
      "ForeignAddr": "::",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "816",
      "Owner": "lsass.exe",
      "Created": "2018-08-01 19:20:39.000000 UTC"
    },
    "26": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c28eec0",
      "Proto": "TCPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "49674",
      "ForeignAddr": "0.0.0.0",
      "ForeignPort": "0",
      "State": "LISTENING",
      "PID": "816",
      "Owner": "lsass.exe",
      "Created": "2018-08-01 19:20:38.000000 UTC"
    },
    "27": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b22d9f0",
      "Proto": "UDPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "137",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4",
      "Owner": "System",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "28": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c439180",
      "Proto": "UDPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "138",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4",
      "Owner": "System",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "29": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b4fb260",
      "Proto": "UDPv6",
      "LocalAddr": "fe80::19bd:cb63:80a8:8c7",
      "LocalPort": "1900",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "30": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b4dddf0",
      "Proto": "UDPv6",
      "LocalAddr": "::1",
      "LocalPort": "1900",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "31": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b5b4eb0",
      "Proto": "UDPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "1900",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "32": {
      "TreeDepth": "0",
      "Offset": "0xc20c6c863a70",
      "Proto": "UDPv4",
      "LocalAddr": "127.0.0.1",
      "LocalPort": "1900",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "33": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b500eb0",
      "Proto": "UDPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "5050",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "5048",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:21:01.000000 UTC"
    },
    "34": {
      "TreeDepth": "0",
      "Offset": "0xc20c6cdf5870",
      "Proto": "UDPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "5353",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "35": {
      "TreeDepth": "0",
      "Offset": "0xc20c6cdf5870",
      "Proto": "UDPv6",
      "LocalAddr": "::",
      "LocalPort": "5353",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "36": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b31aa60",
      "Proto": "UDPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "5353",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:52.000000 UTC"
    },
    "37": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b607c90",
      "Proto": "UDPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "5355",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:12:00.000000 UTC"
    },
    "38": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b607c90",
      "Proto": "UDPv6",
      "LocalAddr": "::",
      "LocalPort": "5355",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:12:00.000000 UTC"
    },
    "39": {
      "TreeDepth": "0",
      "Offset": "0xc20c6b91dbc0",
      "Proto": "UDPv4",
      "LocalAddr": "0.0.0.0",
      "LocalPort": "5355",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "1692",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:12:00.000000 UTC"
    },
    "40": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bdbd010",
      "Proto": "UDPv4",
      "LocalAddr": "127.0.0.1",
      "LocalPort": "52442",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "2892",
      "Owner": "svchost.exe",
      "Created": "2018-08-01 19:20:36.000000 UTC"
    },
    "41": {
      "TreeDepth": "0",
      "Offset": "0xc20c6bd6eeb0",
      "Proto": "UDPv6",
      "LocalAddr": "fe80::19bd:cb63:80a8:8c7",
      "LocalPort": "64855",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "42": {
      "TreeDepth": "0",
      "Offset": "0xc20c6cfda840",
      "Proto": "UDPv6",
      "LocalAddr": "::1",
      "LocalPort": "64856",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "43": {
      "TreeDepth": "0",
      "Offset": "0xc20c6d416570",
      "Proto": "UDPv4",
      "LocalAddr": "10.0.2.143",
      "LocalPort": "64857",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "44": {
      "TreeDepth": "0",
      "Offset": "0xc20c6d416280",
      "Proto": "UDPv4",
      "LocalAddr": "127.0.0.1",
      "LocalPort": "64858",
      "ForeignAddr": "*",
      "ForeignPort": "0",
      "State": "",
      "PID": "4040",
      "Owner": "svchost.exe",
      "Created": "2018-08-06 18:11:55.000000 UTC"
    },
    "45": {
      "TreeDepth": ""
    },
    "46": {
      "TreeDepth": "'"
    }
  },
  "filecount": 7,
  "gemfile": "The scan reveals file objects including system DLLs (winhttp.dll, wer.dll, twinui.pcshell.dll), a OneDrive Qt5Widgets.dll, and potentially custom API or notification components (CMApi, CMNotify).  The OneDrive component loading Qt5Widgets.dll from the user's AppData is normal. The custom components CMApi and CMNotify warrant closer inspection to verify their legitimacy and source, as they could be indicative of custom software or potential malware.\n",
  "cleanfile": {
    "0": {
      "TreeDepth": "0",
      "Offset": "0xa780001538e0",
      "Name": "\\CMApi"
    },
    "1": {
      "TreeDepth": "0",
      "Offset": "0xa78000154310",
      "Name": "\\Windows\\SysWOW64\\winhttp.dll"
    },
    "2": {
      "TreeDepth": "0",
      "Offset": "0xa780001546d0",
      "Name": "\\Users\\CTF\\AppData\\Local\\Microsoft\\OneDrive\\18.111.0603.0006\\Qt5Widgets.dll"
    },
    "3": {
      "TreeDepth": "0",
      "Offset": "0xa78000154860",
      "Name": "\\Windows\\SysWOW64\\wer.dll"
    },
    "4": {
      "TreeDepth": "0",
      "Offset": "0xa78000155cd0",
      "Name": "\\CMNotify"
    },
    "5": {
      "TreeDepth": "0",
      "Offset": "0xa78000157b00",
      "Name": "\\Windows\\System32\\twinui.pcshell.dll"
    },
    "6": {
      "TreeDepth": "'"
    }
  }
}

//randomizer selection
const imagePaths = [
  "/public/stock1.jpg",
  "/public/stock5.jpeg",
  "/public/stock6.jpeg",
  "/public/stock7.jpeg",
  "/public/stock9.jpg",
  "/public/stock91.jpg"
];

const getRandom = () => {
  const index = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[index]
};

function App() {
  const [isdatamode, setIsdatamode] = useState(false)
  const randomImage = useMemo(() => getRandom(), []);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / 80; // less = more sensitive
    const y = (e.clientY - innerHeight / 2) / 80;
    setOffset({ x, y });
  };

  const [file, setFile] = useState(null);
  const [data, setData] = useState(testData);
  const [checkedItems, setCheckedItems] = useState({
    osInfo: false,
    cmds: false,
    procList: false,
    netConn: false,
    fileList: false,
    yara: false
  });

  function backButton()
  {
    setIsdatamode(!isdatamode)
    setCheckedItems({...checkedItems, ["osInfo"]: false });
    setCheckedItems({...checkedItems, ["cmds"]: false });
    setCheckedItems({...checkedItems, ["procList"]: false });
    setCheckedItems({...checkedItems, ["netConn"]: false });
    setCheckedItems({...checkedItems, ["fileList"]: false });
    setCheckedItems({...checkedItems, ["yara"]: false });
  }


  const handleSubmit = async (event) =>
  {
    //setIsdatamode(!isdatamode)
    try {
      console.log("Initiate Execute Analysis!");
      const formData = new FormData();
      formData.append('dumpName', "c:\\Users\\antho\\Desktop\\forens-tech\\dumps\\"+file);
      formData.append('osInfo', checkedItems["osInfo"]);
      formData.append('cmds', checkedItems["cmds"]);
      formData.append('procList', checkedItems["procList"]);
      formData.append('netConn', checkedItems["netConn"]);
      formData.append('fileList', checkedItems["fileList"]);
      formData.append('yara', checkedItems["yara"]);

      const requestOptions = {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      };

      const response = await fetch("http://127.0.0.1:8000/request", requestOptions);
      const data = await response.json();
      console.log('Response:', data);
      setData(data);
      setIsdatamode(!isdatamode)

    }
    catch (err)
    {
      console.log("Failed to Execute Analysis!");
    }
  }

  const Dashboard = () => {
    return (
      <div style={{
        display: "flex",
        width: "100%",
        padding: "20px",
        boxSizing: "border-box",
        gap: "20px"
      }}>
        <StatBox disabled={!checkedItems["cmds"]} number={data["cmdscount"]} label="Commands" anchorId="#" />
        <StatBox disabled={!checkedItems["procList"]} number={data["pslcount"]} label="Processes" anchorId="#" />
        <StatBox disabled={!checkedItems["netConn"]} number={data["netscancount"]} label="Network Connections" anchorId="#" />
        <StatBox disabled={!checkedItems["fileList"]} number={data["filecount"]} label="Files" anchorId="#" />
      </div>
    );
  };

  function LogTable(props)
  {
    return(
        <div style={{
          maxHeight: "300px",
          display:"block",
          overflowY: "scroll",
          scrollbarColor: "rgb(89, 89, 89) rgb(230, 230, 230)"}}>
          <table>
            <tr>
              {Object.keys(data[props.type]["0"]).map( (item) =>
                  <th>{item}</th>
              )}
            </tr>
            {Object.keys(data[props.type]).map( (idx) =>
                <tr>
                  {
                    Object.values(data[props.type][idx]).map( (value) =>
                        <td style={{padding: "0 15px"}}>{value}</td>
                    )
                  }
                </tr>
            )}
          </table>
        </div>
    )
  }

  if (isdatamode) {
    return(
      <>
        <div className="dash-wrapper">
          <BackButton theClick = {backButton}/>
          <Dashboard />

          {(checkedItems["osInfo"])
              ?
              <>
                <ExpandData title="System Info">
                  <ExpandData title="Full Log">
                    {<p>{data["info"]}</p>}
                  </ExpandData>
                </ExpandData>
                <br/>
              </>
              : <></>
          }

          {(checkedItems["cmds"])
              ?
              <>
                <ExpandData title="Commands">
                  <p>{data["gemcmds"]}</p>
                  <ExpandData title="Full Log">
                    <LogTable type={"cleancmds"}/>
                  </ExpandData>
                </ExpandData>
                <br/>
              </>
              : <></>
          }

          {(checkedItems["procList"]) //cleanpsl
              ?
              <>
                <ExpandData title="Processes">
                  <p>{data["gempsl"]}</p>
                  <ExpandData title="Full Log">
                    <LogTable type={"cleanpsl"}/>
                  </ExpandData>
                </ExpandData>
                <br/>
              </>
              : <></>
          }

          {(checkedItems["netConn"])
              ?
              <>
                <ExpandData title="Network Connections">
                  <p>{data["gemScan"]}</p>
                  <ExpandData title="Full Log">
                    <LogTable type={"cleanScan"}/>
                  </ExpandData>
                </ExpandData>
                <br/>
              </>
              : <></>
          }

          {(checkedItems["fileList"])
              ?
              <>
                <ExpandData title="Files">
                  <p>{data["gemfile"]}</p>
                  <ExpandData title="Full Log">
                    <LogTable type={"cleanfile"}/>
                  </ExpandData>
                </ExpandData>
                <br/>
              </>
              : <></>
          }

        </div>
      </>
    )
  }
  return (
      <>
        <TopNav/>
        <div className="layout" onMouseMove={handleMouseMove}>

          <img src="/public/forenstech-red-small.svg" alt="forenstech-logo" className="forenstech-svg"/>
          <div className="left-side">
            <div className="logo"></div>
            <div className="tagline">Accelerated cybersecurity analytics for your mission by combining legacy tools
              with emerging artificial intelligence technologies.
            </div>
            <div className="upload"></div>
            <Dropdown selected={file} setFile={setFile}/>
            <div className="check-tests">
              <Checkboxes setCheckedItems={setCheckedItems} checkedItems={checkedItems}/>
              <ExecuteBtn onClick={handleSubmit}/>
            </div>
          </div>

          <div className="wrapper"
               style={{
                 transform: `translate(${offset.x}px, ${offset.y}px)`
               }}
            >
            <img src={randomImage} alt="Masked Image" className="masked-image"/>
          </div>
        </div>
      </>
  );
}

export default App
