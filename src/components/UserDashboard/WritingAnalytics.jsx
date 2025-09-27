import React from "react";
import { Pen, TrendingUp } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const WritingAnalytics = () => {
  // --- Line chart ---
  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Word Count",
        data: [1350, 1500, 900, 1800],
        borderColor: "#1e90ff", // Dodger Blue line
        backgroundColor: "rgba(30, 144, 255, 0.2)", // soft blue fill
        tension: 0.2,
        fill: true,
        pointBackgroundColor: "#004c99",
        pointBorderColor: "#004c99",
        pointRadius: 5,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e90ff",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#004c99",
        borderWidth: 1,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 2000,
        ticks: { color: "#333333" },
        grid: { color: "#f2f2f2" },
      },
      x: {
        ticks: { color: "#333333" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <Pen className="w-5 h-5 text-[#1e90ff]" />
        <h2 className="text-lg font-semibold text-gray-700">
          Writing Analytics
        </h2>
      </div>

      {/* Quick Stats */}
      <div className="p-2 rounded mb-4 flex gap-4 flex-wrap items-center">
        <span className="text-xs bg-gray-100 px-2 py-[4px] rounded-lg">
          22 entries
        </span>
        <span className="text-xs bg-gray-100 px-2 py-[4px] rounded-lg">
          5,310 words
        </span>
        <p className="text-xs flex gap-2 items-center bg-[#1e90ff] px-2 py-[4px] rounded-lg text-white">
          <TrendingUp className="w-4 h-4 text-white" />
          <span>+5.9% this month</span>
        </p>
      </div>

      {/* Writing Volume Line Chart */}
      <h3 className="text-md font-medium mb-2">Writing Volume Over Time</h3>
      <div className="h-64 mb-4">
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
};

export default WritingAnalytics;
