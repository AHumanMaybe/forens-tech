import React from "react";
import "./TopNavStyle.css";

function TopNav() {
  const handleDashboardClick = () => {
    alert("Navigating to Dashboard...");
  };

  const handleLogoutClick = () => {
    alert("Logging out...");
  };

  return (
    <div className="top-nav">
      <div className="pill longer-pill" onClick={handleDashboardClick}>
        Home
      </div>
      <div className="pill shorter-pill" onClick={handleLogoutClick}>
        2025
      </div>
    </div>
  );
}

export default TopNav;
