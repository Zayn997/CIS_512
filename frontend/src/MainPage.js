import React from "react";
import { useHistory } from "react-router-dom";

function HomePage() {
  const history = useHistory();

  const startSurvey = () => {
    history.push("/survey");
  };
  useEffect(() => {
    const handleScroll = () => {
      const contentPosition = document
        .querySelector(".main-content")
        .getBoundingClientRect().top;
      const summaryPosition = document
        .querySelector(".summary-section")
        .getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (contentPosition < windowHeight) {
        setContentVisible(true);
      }

      if (summaryPosition < windowHeight) {
        setSummaryVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="homepage">
      <Particles />
      <CanvasComponent /> {/* This is the background canvas */}
      <div className="big-npc">
        <BigNPC />
      </div>
      <section className=" project-title">
        <div class="title-content">
          <h2>Smart Questionaire</h2>
          <h2>Smart Questionaire</h2>
        </div>
      </section>
      <div className="auther-container">
        <h2>Designed by Chengpu Liao, Zayn Huang, Felix Sun</h2>
      </div>
      <button onClick={startSurvey}>Start Survey</button>
    </div>
  );
}

export default HomePage;
