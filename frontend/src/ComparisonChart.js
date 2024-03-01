import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const ComparisonChart = ({ answers }) => {
  const [chartData, setChartData] = useState(null);

  const fetchComparisonData = async () => {
    const user_answers3 = answers.map((answerObj) => answerObj.text);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/generateComparisonData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: user_answers3 }),
        }
      );
      const data = await response.json();
      if (data.insights) {
        // Assuming the insights data is an array of objects with 'question' and 'answerCount' properties
        const labels = data.insights.map((item) => item.question);
        const values = data.insights.map((item) => item.answerCount);
        const backgroundColors = labels.map(
          () =>
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 0.2)`
        );

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Answers Count",
              data: values,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map((color) =>
                color.replace("0.2", "1")
              ),
              borderWidth: 1,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching comparison data:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchComparisonData}>Generate Comparison Chart</button>
      {chartData && (
        <Bar
          data={chartData}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              display: true,
              position: "top",
            },
          }}
        />
      )}
    </div>
  );
};

export default ComparisonChart;
