import React from "react";
import "./SentimentNPC.css"; // Make sure to create this CSS file

function SentimentNPC({ sentiment }) {
  // Adjust styles based on sentiment
  const npcStyles = {
    transform: `scale(${1 + sentiment * 0.1})`, // Scales up or down based on sentiment
  };
  const eyeStyles = {
    // Adjust the position of the eyes based on sentiment
    transform: `translateY(${sentiment * 10}px)`,
  };

  return (
    <div className="npc" style={npcStyles}>
      <div className="npc-eye" style={eyeStyles}></div>
      <div className="npc-eye" style={eyeStyles}></div>
    </div>
  );
}

export default SentimentNPC;
