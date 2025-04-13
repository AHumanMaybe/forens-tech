import React from "react";
import "./executeBtnStyle.css";

function ExecuteBtn({ label = "Click Me", onClick }) {
  return (
    <button className="execute-button" onClick={onClick}>
      Execute
    </button>
  );
}

export default ExecuteBtn;