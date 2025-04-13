import { useState } from "react";
import "./CheckboxGroup.css";

const infoTexts = {
  osInfo: "Helpful for identifying the target environment.",
  procList: "Useful for detecting suspicious or hidden processes.",
  cmds: "Great for reconstructing attacker actions.",
  netConn: "Key for spotting remote connections or data exfiltration.",
  listFiles: "Useful for finding files in use during compromise.",
  yara: "Powerful for detecting known threats or custom patterns.",
};

function Checkboxes(props) {

  const [visibleInfo, setVisibleInfo] = useState(null);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    props.setCheckedItems({ ...props.checkedItems, [name]: checked });
  };

  const toggleInfo = (name) => {
    setVisibleInfo((prev) => (prev === name ? null : name));
  };

  const renderCheckbox = (name, label) => (
    <label className="checkbox-wrapper" key={name}>
      <input
        type="checkbox"
        name={name}
        checked={props.checkedItems[name]}
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
      {renderCheckbox("osInfo", "OS info")}
      {renderCheckbox("procList", "Process List")}
      {renderCheckbox("cmds", "Executed Commands")}
      {renderCheckbox("netConn", "Show Net Connections")}
      {renderCheckbox("listFiles", "List Files")}
      {renderCheckbox("yara", "Yara Rules Check")}
    </div>
  );  
}

export default Checkboxes;