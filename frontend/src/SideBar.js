// Sidebar.js
import React from "react";
import "./SideBar.css"; // Make sure to import the CSS styles
// Add more icons as needed

function SideBar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-icon">
        <i className="fa fa-home" aria-hidden="true"></i> {/* Home icon */}
      </div>
      <div className="sidebar-icon">
        <i className="fa fa-envelope-open" aria-hidden="true"></i>{" "}
        {/* Survey icon */}
      </div>
      {/* Add more sidebar icons as needed */}
    </div>
  );
}

export default SideBar;
