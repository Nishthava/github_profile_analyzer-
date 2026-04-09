import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

function LanguageChart({ repos }) {

  const languageCount = {};

  repos.forEach((repo) => {
    const lang = repo.language || "Other";

    if (languageCount[lang]) {
      languageCount[lang]++;
    } else {
      languageCount[lang] = 1;
    }
  });

  const data = {
    labels: Object.keys(languageCount),
    datasets: [
  {
    data: Object.values(languageCount),
    backgroundColor: [
      "#f1c40f",
      "#3498db",
      "#2ecc71",
      "#e74c3c",
      "#9b59b6",
      "#1abc9c",
      "#e67e22"
    ]
  }
]
    
  };

  return (
    <div className="card">
      <h2>Language Usage</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pie data={data} style={{ maxWidth: "400px" }} />
      </div>
    </div>
  );
}

export default LanguageChart;