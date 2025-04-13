import { useState } from "react";
import "./CheckboxGroup.css";

const infoTexts = {
  OSinfo: "Helpful for identifying the target environment.",
  processList: "Useful for detecting suspicious or hidden processes.",
  execCmds: "Great for reconstructing attacker actions.",
  showNet: "Key for spotting remote connections or data exfiltration.",
  listFiles: "Useful for finding files in use during compromise.",
  yaraRules: "Powerful for detecting known threats or custom patterns.",
};

function Checkboxes() {
  const [checkedItems, setCheckedItems] = useState({
    OSinfo: false,
    processList: false,
    execCmds: false,
    showNet: false,
    listFiles: false,
    yaraRules: false,
  });

  const [visibleInfo, setVisibleInfo] = useState(null);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };

  const toggleInfo = (name) => {
    setVisibleInfo((prev) => (prev === name ? null : name));
  };

  const renderCheckbox = (name, label) => (
    <label className="checkbox-wrapper" key={name}>
      <input
        type="checkbox"
        name={name}
        checked={checkedItems[name]}
        onChange={handleChange}
        className="custom-checkbox"
      />
      <span className="checkbox-label">{label}</span>
  
      {/* Info Icon with tooltip on hover */}
      <div className="info-wrapper">
        <span className="info-icon">i</span>
        <div className="tooltip">{infoTexts[name]}</div>
      </div>
    </label>
  );
  
  return (
    <div className="checkbox-container">
      {renderCheckbox("OSinfo", "OS info")}
      {renderCheckbox("processList", "Process List")}
      {renderCheckbox("execCmds", "Executed Commands")}
      {renderCheckbox("showNet", "Show Net Connections")}
      {renderCheckbox("listFiles", "List Files")}
      {renderCheckbox("yaraRules", "Yara Rules Check")}
    </div>
  );  
}

export default Checkboxes;
