import { useState } from "react";
import "./BackButtonStyle.css";

function BackButton(props) {
    return (
      <button className="back-button" onClick={props.theClick}>
        ← Back
      </button>
    );
  }
  
  export default BackButton;
  
