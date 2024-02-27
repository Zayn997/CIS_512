import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./PersonalInfoInput.css"; // Import the CSS file for styling

function PersonalInfoInput({ personalInfo, setPersonalInfo }) {
  const [greeting, setGreeting] = useState("");

  const fetchGreeting = async (personalInfo) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/generategreetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ personalInfo }),
      });
      const data = await response.json();
      setGreeting(data.personalInfo); // Make sure this matches the key in the response
    } catch (error) {
      console.error("Failed to fetch greeting:", error);
    }
  };

  const handleFormSubmit = () => {
    fetchGreeting(personalInfo);
  };

  return (
    <div className="type-3">
      <h2>Personal Information</h2>
      <div className="tooltip-container">
        <ReactQuill
          className="personal-info-input"
          placeholder="Enter your personal information"
          value={personalInfo}
          onChange={setPersonalInfo}
        />
        <span className="tooltip-text">
          Please enter your personal information
        </span>
      </div>
      <button className="submit-button" onClick={handleFormSubmit}>
        Submit Info
      </button>
      {greeting && (
        <div className="greeting-bubble">
          <div className="greeting">{greeting}</div>
        </div>
      )}
    </div>
  );
}

export default PersonalInfoInput;
