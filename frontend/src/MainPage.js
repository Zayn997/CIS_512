import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "./Particles";
import CanvasComponent from "./CanvasComponent";
import BigNPC from "./BigNPC";
import "./MainPage.css";

function MainPage() {
  const navigate = useNavigate();

  const startSurvey = () => {
    navigate("/survey");
  };

  return (
    <div className="homepage">
      <Particles />
      <CanvasComponent /> {/* This is the background canvas */}
      <div className="big-npc">
        <BigNPC />
      </div>
      <section className="project-title">
        <div class="title-content">
          <h2>Smart Questionaire</h2>
          <h2>Smart Questionaire</h2>
        </div>
      </section>
      <div className="auther-container">
        <h2>Designed by Chengpu Liao, Zayn Huang, Felix Sun</h2>
      </div>
      <div className="survey-button">
        <button className="start" onClick={startSurvey}>
          Start Survey
        </button>
      </div>
    </div>
  );
}

export default MainPage;
