import { useState } from "react";
import "./dropdownstyle.css";

function Dropdown() {
  const [selected, setSelected] = useState("Choose File");
  const [open, setOpen] = useState(false);

  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={() => setOpen(!open)}>
        {selected}
        <span className={`arrow ${open ? "up" : "down"}`}></span>
      </button>
      {open && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;