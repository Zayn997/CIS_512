// NavigationBar.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./NavigationBar.css"; // Importing the CSS file

const NavigationBar = () => {
  return (
    <header className="navigation-header">
      <h1 className="survey-name">Smart Survey</h1>
      <div className="navigation-buttons">
        <button className="review-button">Review</button>
        <button className="publish-button">Publish</button>
        {/* <Link to="/personalInfo">
          <i className="fa fa-user" aria-hidden="true"></i>
        </Link> */}

        {/* Additional buttons or icons can be added here */}
      </div>
    </header>
  );
};

export default NavigationBar;
