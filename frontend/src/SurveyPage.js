import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopicInput from "./TopicInput";
import QuestionsDisplay from "./QuestionsDisplay";
import SentimentNPC from "./SentimentNPC";
import PersonalInfoInput from "./PersonalInfoInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function SurveyPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSentiment, setCurrentSentiment] = useState(0.5);
  const [currentInput, setCurrentInput] = useState("");
  const [keywordsCount, setKeywordsCount] = useState({});

  const navigate = useNavigate();

  const fetchGeneratedQuestions = async (topic) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/generateQuestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      setQuestions(data.allQuestions);
      setCurrentQuestionIndex(0); // Reset the question index
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  const updateKeywordsCount = (newKeywords) => {
    const updatedCount = { ...keywordsCount };
    newKeywords.forEach((keyword) => {
      updatedCount[keyword] = (updatedCount[keyword] || 0) + 1;
    });
    setKeywordsCount(updatedCount);
  };

  // Function to handle answer submission, sentiment analysis, and keyword extraction
  const handleSubmitAnswer = async () => {
    try {
      const sentimentResponse = await fetch(
        "http://127.0.0.1:5000/analyzeSentiment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: currentInput }),
        }
      );
      const sentimentData = await sentimentResponse.json();
      const sentimentScore = parseFloat(sentimentData.sentiment);

      const keywordResponse = await fetch(
        "http://127.0.0.1:5000/extractKeywords",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answer: currentInput }),
        }
      );
      const keywordData = await keywordResponse.json();
      const newKeywords = keywordData.keywords;
      updateKeywordsCount(newKeywords);

      // Update answers and keywords count
      setAnswers([
        ...answers,
        { text: currentInput, sentiment: sentimentScore },
      ]);
      const newCount = { ...keywordsCount };
      newKeywords.forEach((keyword) => {
        newCount[keyword] = (newCount[keyword] || 0) + 1;
      });
      setKeywordsCount(newCount);

      setCurrentSentiment(sentimentScore); // Update the current sentiment for the NPC
      setCurrentInput(""); // Clear the input field

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        console.log("End of questions");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  // Function to get a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const finishSurvey = () => {
    navigate.push("/results", { answers });
  };

  return (
    <div className="surveypage">
      <Particles />
      <CanvasComponent /> {/* This is the background canvas */}
      <NavigationBar />
      <div className="survey-container">
        <div className="content-1">
          <div className="topic-input-wrapper">
            <TopicInput onGenerate={fetchGeneratedQuestions} />
          </div>
          <div className="Greetings">
            <PersonalInfoInput className="type-3" />
          </div>
          <div className="questions-display-wrapper">
            <QuestionsDisplay
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              onQuestionSelect={setCurrentQuestion}
            />
          </div>
        </div>
        <div className="content-2">
          <div className="current-question">
            <h2>Current Question</h2>
            <div className="current-q-content">
              <p className="current-q">{currentQuestion}</p>
            </div>
          </div>
          <div className="sentiment-container">
            <SentimentNPC sentiment={currentSentiment} />
          </div>
          <div className="chatbox">
            <div className="chat-area">
              <ReactQuill
                className="react-quill-container"
                onChange={setCurrentInput}
                value={currentInput}
                placeholder="Type here and feel free to express your experience..."
              ></ReactQuill>
            </div>
            <button className="loginBtn" onClick={handleSubmitAnswer}>
              Submit Answer
            </button>
          </div>
        </div>

        <div className="keywords-summary">
          <div className="keywords-title">
            <h2>Keywords Summary</h2>
          </div>
          <div className="keywords-container">
            <div className="keywords-section">
              {Object.entries(keywordsCount).map(([keyword, count]) => (
                <div
                  key={keyword}
                  className="keyword-item"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  {keyword}: {count}
                </div>
              ))}
            </div>
          </div>
        </div>
        {currentQuestionIndex === questions.length - 1 && (
          <button onClick={finishSurvey}>Finish Survey</button>
        )}
      </div>
    </div>
  );
}

export default SurveyPage;
