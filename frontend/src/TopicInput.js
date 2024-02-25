// src/TopicInput.js
import React, { useState } from "react";
import "./TopicInput.css";

function TopicInput({ onGenerate }) {
  const [topic, setTopic] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate(topic);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-box">
        <input
          type="text"
          value={topic}
          class="search-txt"
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a UX question you are doing research"
        />
        <button className="search-btn" type="submit">
          <i className="fa fa-upload" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  );
}

export default TopicInput;
