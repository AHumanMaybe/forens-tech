import { useState } from "react";
import "./CheckboxGroup.css";

function Checkboxes() {
  const [checkedItems, setCheckedItems] = useState({
    news: false,
    updates: false,
    offers: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };

  return (


    /* OS INFO */

    <div className="checkbox-container">
      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          name="OSinfo"
          checked={checkedItems.OSinfo}
          onChange={handleChange}
          className="custom-checkbox"
        />
        <span className="checkbox-label">OS info</span>
      </label>


        {/* PROCESS LIST */}

      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          name="processList"
          checked={checkedItems.processList}
          onChange={handleChange}
          className="custom-checkbox"
        />
        <span className="checkbox-label">Process List</span>
      </label>


        {/* EXECUTE COMMANDS */}

      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          name="execCmds"
          checked={checkedItems.execCmds}
          onChange={handleChange}
          className="custom-checkbox"
        />
        <span className="checkbox-label">Executed Commands</span>
      </label>


        {/* SHOW NEXT CONNECTIONS */}

      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          name="showNet"
          checked={checkedItems.showNet}
          onChange={handleChange}
          className="custom-checkbox"
        />
        <span className="checkbox-label">Show Net Connections</span>
      </label>


        {/* LIST FILES */}

      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          name="listFiles"
          checked={checkedItems.listsFiles}
          onChange={handleChange}
          className="custom-checkbox"
        />
        <span className="checkbox-label">List Files</span>
      </label>


    {/* YARA RULES CHECK */}

      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          name="yaraRules"
          checked={checkedItems.yaraRules}
          onChange={handleChange}
          className="custom-checkbox"
        />
        <span className="checkbox-label">Yara Rules Check</span>
      </label>
    </div>
  );
}

export default Checkboxes;
