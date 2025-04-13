import { useState } from 'react';
import './ExpandDataStyle.css';

const ExpandableInfoBox = ({ title = "Additional Information", children }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleExpand = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="expandable-box">
        <div className="expandable-header" onClick={toggleExpand}>
          <span className="expandable-title">{title}</span>
          <span className="toggle-icon">{isOpen ? '−' : '+'}</span>
        </div>
        {isOpen && <div className="expandable-content">{children}</div>}
      </div>
    );
  };
  
  export default ExpandableInfoBox;