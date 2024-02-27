// src/TopicInput.js
import React, { useState } from "react";
import "./TopicInput.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import PersonalInfoInput from "./PersonalInfoInput";

function TopicInput({ onGenerate }) {
  const [topic, setTopic] = useState("");
  const [background, setBackground] = useState("");
  const [keyQuestions, setKeyQuestions] = useState("");
  // const [personalInfo, setPersonalInfo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate({ topic, background, keyQuestions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-box">
        <input
          type="text"
          value={topic}
          class="search-txt"
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a research group you are interested"
        />

        <button className="search-btn" type="submit">
          <i className="fa fa-upload" aria-hidden="true"></i>
        </button>
      </div>
      <div className="text-input">
        <div className="type-1">
          <h2> Research background</h2>
          <ReactQuill
            className="background-input"
            placeholder="Enter research background information"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />
        </div>
        <div className="type-2">
          <h2> Questions Guide</h2>
          <ReactQuill
            className="key-questions-input"
            placeholder="Enter key questions from the interview guide"
            value={keyQuestions}
            onChange={(e) => setKeyQuestions(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}

export default TopicInput;
