import React from "react";
import "./PriorityMatrix.css";

function PriorityMatrix({ matrix }) {
  const [priorityMatrix, setPriorityMatrix] = useState("");
  const fetchPriorityMatrix = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/generatePriorityMatrix",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: user_answers }),
        }
      );
      const data = await response.json();
      setPriorityMatrix(data.priorityMatrix);
    } catch (error) {
      console.error("Error fetching priority matrix:", error);
    }
  };

  return (
    <table className="priority-matrix">
      <thead>
        <tr>
          <th>Item</th>
          <th>Urgent</th>
          <th>Not Urgent</th>
        </tr>
      </thead>
      <tbody>
        {matrix.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td className={item.priority === "Urgent" ? "urgent" : ""}></td>
            <td
              className={item.priority === "Not Urgent" ? "not-urgent" : ""}
            ></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PriorityMatrix;
