import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WritingVolumeChart = () => {
  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Word Count",
        data: [1350, 1500, 900, 1800],
        borderColor: "#1e90ff", // Dodger Blue line
        backgroundColor: "rgba(30, 144, 255, 0.15)", // soft blue fill
        pointBackgroundColor: "#004c99", // dark blue dots
        pointBorderColor: "#1e90ff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        hitRadius: 20,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      intersect: false,
      axis: "x",
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#374151", // gray-700
          font: { size: 14 },
        },
      },
      title: {
        display: false,
        font: { size: 18, weight: "bold" },
        color: "#111827", // gray-900
      },
      tooltip: {
        usePointStyle: true,
        backgroundColor: "#1e90ff",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 8,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        ticks: { color: "#6B7280" }, // gray-500
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#6B7280" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  return (
    <div className="h-[350px] p-4 rounded-xl bg-white shadow-md">
      <Line data={lineData} options={options} />
    </div>
  );
};

export default WritingVolumeChart;
