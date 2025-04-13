import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './imageStyles.css'
import React, { useMemo } from "react";
import Dropdown from "./reusable/Dropdown.jsx";
import Checkboxes from "./reusable/Checkboxes.jsx";
import ExecuteBtn from "./reusable/ExecuteBtn.jsx";



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
  const randomImage = useMemo(() => getRandom(), []);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / 80; // less = more sensitive
    const y = (e.clientY - innerHeight / 2) / 80;
    setOffset({ x, y });
  };
    
  return (
    <div className="scroll-wrap">
    <div className = "layout" onMouseMove={handleMouseMove}>
      <img src="/public/forenstech-red-small.svg" alt="forenstech-logo" className="forenstech-svg" />
      <div className="left-side">
        <div className = "logo"></div>
        <div className = "tagline">Accelerated cybersecurity analytics for your mission by combining legacy tools with emerging artificial intelligence technologies. </div>
        <div className = "upload"></div>
        <Dropdown/>
        <div className="check-tests">
          <Checkboxes/>
          <ExecuteBtn/>
        </div>
      </div>

      <div className="wrapper"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`}} 
      >
        <img src={randomImage} alt="Masked Image" className="masked-image" />
      </div>
    </div>
    </div>
  );
}

export default App
