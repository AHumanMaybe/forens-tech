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
  const [checkedItems, setCheckedItems] = useState({
    osInfo: false,
    cmds: false,
    procList: false,
    netConn: false,
    yara: false
  });
  

  const handleSubmit = async (event) =>
  {
    setIsdatamode(!isdatamode)
    try {
      console.log("Initiate Execute Analysis!");
      const formData = new FormData();
      formData.append('dumpName', file);
      formData.append('osInfo', checkedItems["osInfo"]);
      formData.append('cmds', checkedItems["cmds"]);
      formData.append('procList', checkedItems["procList"]);
      formData.append('netConn', checkedItems["netConn"]);
      formData.append('yara', checkedItems["yara"]);

      const requestOptions = {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      };

      const response = await fetch("http://127.0.0.1", requestOptions);
      const data = await response.json();
      console.log('Response:', data);
      
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
        <StatBox number={85} label="Threats Detected" />
        <StatBox number={13} label="Investigations" />
        <StatBox number={7} label="Alerts Resolved" />
      </div>
    );
  };

  if (isdatamode) {
    return(
      <>
        <div className="dash-wrapper">
          <Dashboard />
        </div>
      </>
    )
  }
  return (
    <>
    <TopNav/>
    <div className = "layout" onMouseMove={handleMouseMove}>
      
        <img src="/public/forenstech-red-small.svg" alt="forenstech-logo" className="forenstech-svg" />
        <div className="left-side">
          <div className = "logo"></div>
          <div className = "tagline">Accelerated cybersecurity analytics for your mission by combining legacy tools with emerging artificial intelligence technologies. </div>
          <div className = "upload"></div>
          <Dropdown selected={file} setFile={setFile}/>
          <div className="check-tests">
            <h3>Select Arguments:</h3>
            <Checkboxes setCheckedItems={setCheckedItems} checkedItems = {checkedItems} />
            <ExecuteBtn onClick={handleSubmit}/>
          </div>
        </div>

        <div className="wrapper"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`}} 
        >
          <img src={randomImage} alt="Masked Image" className="masked-image" />
        </div>
    </div>
    </>
  );
}

export default App
