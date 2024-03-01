// App.js
import React from "react";
import { SurveyProvider } from "./SurveyContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage";
import SurveyPage from "./SurveyPage";
import ResultsPage from "./ResultsPage";

function App() {
  return (
    <Router>
      <SurveyProvider>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <MainPage />
            </Route>
            <Route path="/survey">
              <SurveyPage />
            </Route>
            <Route path="/results">
              <ResultsPage />
            </Route>
            <Route path="/personal-info">
              <PersonalInfo />
            </Route>
          </Switch>
        </div>
      </SurveyProvider>
    </Router>
  );
}

export default App;
