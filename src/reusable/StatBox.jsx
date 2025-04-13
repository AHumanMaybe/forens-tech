import React from "react";
import "./StatBoxStyle.css";

const StatBox = ({ number, label, anchorId }) => {
    const handleClick = () => {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
  
    return (
      <div className="stat-box" onClick={handleClick}>
        <div className="stat-number">{number}</div>
        <div className="stat-label">{label}</div>
      </div>
    );
  };
  
  export default StatBox;
