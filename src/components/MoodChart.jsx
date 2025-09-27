import React from "react";
import { motion } from "framer-motion";

const MoodChart = ({ data, width = 400, height = 200 }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl text-gray-400 mb-2">📊</div>
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  // Sort data by timestamp
  const sortedData = [...data].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  // Calculate chart dimensions
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Find min and max values
  const scores = sortedData.map((d) => d.moodScore);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const scoreRange = maxScore - minScore || 1;

  // Calculate points
  const points = sortedData.map((entry, index) => {
    const x = padding + (index / (sortedData.length - 1)) * chartWidth;
    const y =
      padding +
      chartHeight -
      ((entry.moodScore - minScore) / scoreRange) * chartHeight;
    return { x, y, score: entry.moodScore, label: entry.moodLabel };
  });

  // Create path for line
  const pathData = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      return `L ${point.x} ${point.y}`;
    })
    .join(" ");

  // Get mood color
  const getMoodColor = (score) => {
    if (score >= 4) return "#10B981"; // green
    if (score >= 3) return "#F59E0B"; // yellow
    if (score >= 2) return "#F97316"; // orange
    return "#EF4444"; // red
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Trend</h3>
      <div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          {/* Grid lines */}
          {[1, 2, 3, 4, 5].map((score) => {
            const y =
              padding +
              chartHeight -
              ((score - minScore) / scoreRange) * chartHeight;
            return (
              <line
                key={score}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            );
          })}

          {/* Y-axis labels */}
          {[1, 2, 3, 4, 5].map((score) => {
            const y =
              padding +
              chartHeight -
              ((score - minScore) / scoreRange) * chartHeight;
            return (
              <text
                key={score}
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs text-gray-500"
              >
                {score}
              </text>
            );
          })}

          {/* Line chart */}
          <motion.path
            d={pathData}
            stroke="#8B5CF6"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Data points */}
          {points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={getMoodColor(point.score)}
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            />
          ))}

          {/* X-axis */}
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#D1D5DB"
            strokeWidth="2"
          />

          {/* Y-axis */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#D1D5DB"
            strokeWidth="2"
          />
        </svg>

        {/* Legend */}
        <div className="flex justify-center mt-4 space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-600">Low (1-2)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-gray-600">Medium (3)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600">High (4-5)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodChart;
