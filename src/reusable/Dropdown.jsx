import { useState } from "react";
import "./dropdownstyle.css";

function Dropdown(props) {
  const [open, setOpen] = useState(false);

  const options = ["memdump.mem", "cridex.vmem"];

  const handleSelect = (option) => {
    props.setFile(option);
    setOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={() => setOpen(!open)}>
        {props.selected}
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