// export default MoodAnalyticsCard;
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import { ChevronDown } from "lucide-react";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const row = payload[0].payload;

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg px-3 py-2 text-xs text-gray-700">
      <div className="flex items-center gap-2">
        <span className="text-lg">{row.mood}</span>
        <div className="flex flex-col">
          <span className="font-medium">{row.label}</span>
          <span className="text-gray-500 text-[11px]">
            Score: {row.value} / 30
          </span>
          {row.result && (
            <span className="text-[11px] text-blue-500">{row.result}</span>
          )}
          <span className="text-[11px] text-gray-500">Day: {row.day}</span>
        </div>
      </div>
    </div>
  );
};

const MoodAnalyticsCard = ({ data }) => {
  const chartData = useMemo(() => {
    return data?.map((entry) => ({
      ...entry,
      // Format completedAt as "Thu 7", "Thu 14", etc.
      displayDay: entry.completedAt
        ? new Date(entry.completedAt).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
          })
        : entry.day, // Fallback to day if completedAt is missing
    }));
  }, [data]);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Positive
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span> Neutral
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>{" "}
            Negative
          </span>
        </div>
        <button className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-lg">
          Monthly <ChevronDown size={14} className="ml-1" />
        </button>
      </div>

      <div className="h-40 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={20}>
            <XAxis dataKey="displayDay" axisLine={false} tickLine={false} />
            <Tooltip content={CustomTooltip} cursor={{ fill: "transparent" }} />
            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {chartData.map((entry, index) => {
                let color = "#22C55E"; // green
                if (entry.type === "neutral") color = "#A0AEC0"; // gray
                if (entry.type === "negative") color = "#F97316"; // orange
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="text-sm font-semibold text-gray-800 mb-2">Mood History</h3>
      <div className="flex justify-between">
        {chartData.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-xl">{d.mood}</span>
            <span className="text-xs text-gray-600">{d.displayDay}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodAnalyticsCard;
