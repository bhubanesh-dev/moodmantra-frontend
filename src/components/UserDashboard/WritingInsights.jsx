import React from "react";
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
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function WritingInsights() {
  const doughnutData = {
    labels: [
      "Academic Stress",
      "Gratitude",
      "Self-Care",
      "Relationships",
      "Goals",
    ],
    datasets: [
      {
        data: [40, 25, 15, 10, 10],
        backgroundColor: [
          "#1E3A8A", // dark blue
          "#3B82F6", // blue-500
          "#60A5FA", // blue-400
          "#93C5FD", // blue-300
          "#DBEAFE", // light blue
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#1E3A8A",
        bodyColor: "#111827",
        borderColor: "#1E3A8A",
        borderWidth: 1,
        padding: 8,
        cornerRadius: 6,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Chart + Custom Legend */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Topics You Write About</h3>
          <div className="h-56 md:h-64">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>

          {/* Custom Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 text-sm text-gray-800">
            {[
              ["#1E3A8A", "Academic Stress"],
              ["#3B82F6", "Gratitude"],
              ["#60A5FA", "Self-Care"],
              ["#93C5FD", "Relationships"],
              ["#DBEAFE", "Goals"],
            ].map(([color, label], i) => (
              <span key={i} className="flex items-center">
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: color }}
                ></span>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Insights Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Writing Insights</h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm">Most Productive Day</p>
              <p className="text-base font-semibold text-blue-800">Thursday</p>
              <p className="text-xs text-gray-600">
                You write 40% more on Thursdays
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm">Average Session</p>
              <p className="text-base font-semibold text-blue-800">
                12 minutes
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm">Consistency</p>
              <p className="text-xs text-gray-600">
                You maintain regular writing sessions
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm">Longest Entry</p>
              <p className="text-base font-semibold text-blue-800">487 words</p>
              <p className="text-xs text-gray-600">Written on Jan 15th</p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm">Writing Streak</p>
              <p className="text-base font-semibold text-blue-800">7 days</p>
              <p className="text-xs text-gray-600">Current active streak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
