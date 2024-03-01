import React, { useState } from "react";
import "./AffinityDiagram.css";

function AffinityDiagram({ answers }) {
  const [affinityDiagramData, setAffinityDiagramData] = useState(null);

  const fetchAffinityDiagram = async () => {
    const user_answers = answers.map((answer) => answer.text);
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/generateAffinityDiagram",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: user_answers }),
        }
      );
      const data = await response.json();
      setAffinityDiagramData(data.affinity_diagram);
    } catch (error) {
      console.error("Error fetching affinity diagram:", error);
    }
  };

  return (
    <div className="affinity-diagram-section">
      <button onClick={fetchAffinityDiagram}>Generate Affinity Diagram</button>
      {affinityDiagramData && (
        <div className="affinity-diagram">
          {/* Assuming the affinity diagram data is an array of groups */}
          {affinityDiagramData.map((group, index) => (
            <div key={index} className="group">
              <h3 className="group-title">{group.title}</h3>
              <ul className="items">
                {group.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AffinityDiagram;