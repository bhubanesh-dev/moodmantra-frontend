import React from "react";
import { motion } from "framer-motion";

// Line Chart Component
const LineChart = ({ data, width = 600, height = 300, title = "Mood Trend" }) => {
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
  const padding = 50;
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
    return { x, y, score: entry.moodScore, label: entry.moodLabel, date: entry.timestamp };
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
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
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
              r="5"
              fill={getMoodColor(point.score)}
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            />
          ))}

          {/* Axes */}
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#D1D5DB"
            strokeWidth="2"
          />
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

// Bar Chart Component
const BarChart = ({ data, width = 600, height = 300, title = "Mood Distribution" }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl text-gray-400 mb-2">📊</div>
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const entries = Object.entries(data);
  const maxValue = Math.max(...entries.map(([, value]) => value));
  const barWidth = chartWidth / entries.length - 10;

  const moodColors = {
    very_happy: "#10B981",
    happy: "#3B82F6",
    neutral: "#F59E0B",
    sad: "#F97316",
    very_sad: "#EF4444",
    anxious: "#8B5CF6",
    stressed: "#6366F1",
    excited: "#EC4899",
    calm: "#14B8A6",
    angry: "#DC2626",
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          {/* Bars */}
          {entries.map(([mood, count], index) => {
            const barHeight = (count / maxValue) * chartHeight;
            const x = padding + index * (chartWidth / entries.length) + 5;
            const y = padding + chartHeight - barHeight;

            return (
              <motion.rect
                key={mood}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={moodColors[mood] || "#6B7280"}
                initial={{ height: 0, y: padding + chartHeight }}
                animate={{ height: barHeight, y: y }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              />
            );
          })}

          {/* X-axis labels */}
          {entries.map(([mood], index) => {
            const x = padding + index * (chartWidth / entries.length) + 5 + barWidth / 2;
            const y = height - padding + 20;

            return (
              <text
                key={mood}
                x={x}
                y={y}
                textAnchor="middle"
                className="text-xs text-gray-600"
                transform={`rotate(-45 ${x} ${y})`}
              >
                {mood.replace("_", " ")}
              </text>
            );
          })}

          {/* Y-axis */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#D1D5DB"
            strokeWidth="2"
          />

          {/* X-axis */}
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#D1D5DB"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

// Heatmap Component
const Heatmap = ({ data, width = 600, height = 300, title = "Mood Heatmap" }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl text-gray-400 mb-2">📊</div>
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const cellSize = Math.min((width - 100) / 24, (height - 100) / 7);

  const getHeatmapColor = (score) => {
    if (score >= 4) return "#10B981"; // green
    if (score >= 3) return "#F59E0B"; // yellow
    if (score >= 2) return "#F97316"; // orange
    return "#EF4444"; // red
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          {/* Day labels */}
          {days.map((day, dayIndex) => (
            <text
              key={day}
              x={30}
              y={60 + dayIndex * cellSize + cellSize / 2}
              className="text-xs text-gray-600"
              textAnchor="end"
            >
              {day}
            </text>
          ))}

          {/* Hour labels */}
          {hours.map((hour, hourIndex) => (
            <text
              key={hour}
              x={60 + hourIndex * cellSize + cellSize / 2}
              y={30}
              className="text-xs text-gray-600"
              textAnchor="middle"
            >
              {hour === 0 ? "12 AM" : hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
            </text>
          ))}

          {/* Heatmap cells */}
          {days.map((day, dayIndex) =>
            hours.map((hour, hourIndex) => {
              const score = data[hour] || 0;
              const x = 60 + hourIndex * cellSize;
              const y = 60 + dayIndex * cellSize;

              return (
                <rect
                  key={`${day}-${hour}`}
                  x={x}
                  y={y}
                  width={cellSize - 1}
                  height={cellSize - 1}
                  fill={score > 0 ? getHeatmapColor(score) : "#F3F4F6"}
                  stroke="#E5E7EB"
                  strokeWidth="0.5"
                />
              );
            })
          )}
        </svg>

        {/* Legend */}
        <div className="flex justify-center mt-4 space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 border border-gray-300"></div>
            <span className="text-xs text-gray-600">No data</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500"></div>
            <span className="text-xs text-gray-600">Low mood</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500"></div>
            <span className="text-xs text-gray-600">High mood</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Radar Chart Component
const RadarChart = ({ data, width = 400, height = 400, title = "Mood Factors" }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl text-gray-400 mb-2">📊</div>
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 60;

  const factors = Object.keys(data);
  const maxValue = Math.max(...Object.values(data));

  const getPoint = (factor, value, index) => {
    const angle = (index * 2 * Math.PI) / factors.length - Math.PI / 2;
    const distance = (value / maxValue) * radius;
    return {
      x: centerX + distance * Math.cos(angle),
      y: centerY + distance * Math.sin(angle),
    };
  };

  const points = factors.map((factor, index) => 
    getPoint(factor, data[factor], index)
  );

  const pathData = points
    .map((point, index) => (index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`))
    .join(" ") + " Z";

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          {/* Radar grid */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((level) => (
            <circle
              key={level}
              cx={centerX}
              cy={centerY}
              r={radius * level}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}

          {/* Factor labels */}
          {factors.map((factor, index) => {
            const angle = (index * 2 * Math.PI) / factors.length - Math.PI / 2;
            const labelRadius = radius + 30;
            const x = centerX + labelRadius * Math.cos(angle);
            const y = centerY + labelRadius * Math.sin(angle);

            return (
              <text
                key={factor}
                x={x}
                y={y}
                textAnchor="middle"
                className="text-xs text-gray-600"
              >
                {factor.replace("_", " ")}
              </text>
            );
          })}

          {/* Radar area */}
          <motion.path
            d={pathData}
            fill="rgba(139, 92, 246, 0.2)"
            stroke="#8B5CF6"
            strokeWidth="2"
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
              fill="#8B5CF6"
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

// Activity Correlation Chart
const ActivityCorrelationChart = ({ data, width = 600, height = 300, title = "Activity Impact" }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl text-gray-400 mb-2">📊</div>
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  const entries = Object.entries(data).sort(([, a], [, b]) => b - a);
  const maxValue = Math.max(...entries.map(([, value]) => value));
  const minValue = Math.min(...entries.map(([, value]) => value));
  const valueRange = maxValue - minValue;

  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / entries.length - 10;

  const activityIcons = {
    exercise: "🏃‍♂️",
    work: "💼",
    social: "👥",
    sleep: "😴",
    eating: "🍽️",
    hobby: "🎨",
    family: "👨‍👩‍👧‍👦",
    travel: "✈️",
    study: "📚",
    other: "📋",
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          {/* Bars */}
          {entries.map(([activity, score], index) => {
            const barHeight = ((score - minValue) / valueRange) * chartHeight;
            const x = padding + index * (chartWidth / entries.length) + 5;
            const y = padding + chartHeight - barHeight;

            const color = score >= 4 ? "#10B981" : score >= 3 ? "#F59E0B" : "#F97316";

            return (
              <motion.rect
                key={activity}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                initial={{ height: 0, y: padding + chartHeight }}
                animate={{ height: barHeight, y: y }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              />
            );
          })}

          {/* Activity labels */}
          {entries.map(([activity], index) => {
            const x = padding + index * (chartWidth / entries.length) + 5 + barWidth / 2;
            const y = height - padding + 20;

            return (
              <text
                key={activity}
                x={x}
                y={y}
                textAnchor="middle"
                className="text-xs text-gray-600"
              >
                {activityIcons[activity] || "📋"}
              </text>
            );
          })}

          {/* Score labels */}
          {entries.map(([, score], index) => {
            const x = padding + index * (chartWidth / entries.length) + 5 + barWidth / 2;
            const y = padding + chartHeight - ((score - minValue) / valueRange) * chartHeight - 10;

            return (
              <text
                key={index}
                x={x}
                y={y}
                textAnchor="middle"
                className="text-xs font-medium text-gray-700"
              >
                {score.toFixed(1)}
              </text>
            );
          })}

          {/* Axes */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#D1D5DB"
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#D1D5DB"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

// Main Charts Component
const MoodCharts = ({ 
  moodEntries, 
  analytics, 
  chartType = "line",
  width = 600,
  height = 300,
  title 
}) => {
  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <LineChart data={moodEntries} width={width} height={height} title={title} />;
      case "bar":
        return <BarChart data={analytics?.moodDistribution} width={width} height={height} title={title} />;
      case "heatmap":
        return <Heatmap data={analytics?.timePatterns} width={width} height={height} title={title} />;
      case "radar":
        return <RadarChart data={analytics?.factorCorrelations} width={width} height={height} title={title} />;
      case "activity":
        return <ActivityCorrelationChart data={analytics?.activityCorrelation} width={width} height={height} title={title} />;
      default:
        return <LineChart data={moodEntries} width={width} height={height} title={title} />;
    }
  };

  return renderChart();
};

export default MoodCharts;
export { LineChart, BarChart, Heatmap, RadarChart, ActivityCorrelationChart };
