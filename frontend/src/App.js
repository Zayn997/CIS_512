import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage"; // Create a MainPage component for the main page content
import SurveyPage from "./SurveyPage"; // Create a SurveyPage component for the survey generation page
import ResultsPage from "./ResultsPage"; // Create a ResultsPage component for the results page
import PersonalInfo from "./PersonalInfo";
import NavigationBar from "./NavigationBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/personalInfo" element={<PersonalInfo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
