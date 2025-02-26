import React from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function SkillsChart({ matchedSkills, missingSkills, requiredSkills, availableSkills }) {
  // Prepare data for Bar Chart
  const barChartData = {
    labels: ['Matched Skills', 'Missing Skills'],
    datasets: [
      {
        label: 'Percentage',
        data: [matchedSkills, missingSkills],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Radar Chart
  const radarChartData = {
    labels: Object.keys(requiredSkills),
    datasets: [
      {
        label: 'Required Skills',
        data: Object.values(requiredSkills),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Your Skills',
        data: Object.values(availableSkills),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };
  
  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };

  return (
    <>
      <div className="chart-container">
        <h4>Match Score Breakdown</h4>
        <div className="bar-chart">
          <Bar 
            data={barChartData} 
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  title: {
                    display: true,
                    text: 'Percentage'
                  }
                }
              }
            }}
          />
        </div>
      </div>
      
      <div className="chart-container">
        <h4>Required vs. Available Skills</h4>
        <div className="radar-chart">
          <Radar data={radarChartData} options={radarOptions} />
        </div>
      </div>
    </>
  );
}

export default SkillsChart;