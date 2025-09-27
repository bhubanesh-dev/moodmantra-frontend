// export default MoodAnalytics;
import React, { useMemo } from "react";
import { Heart, TrendingUp } from "lucide-react";
import MoodAnalyticsCard from "./chart/mood";

const MoodAnalytics = ({ data = [] }) => {
  const chartData = useMemo(() => {
    return data?.map((entry) => {
      const rawScore = entry?.totalScore ?? 0;
      const normalized = Math.round((rawScore / 30) * 10);

      let mood = "😐";
      let type = "neutral";
      let label = "Neutral";

      if (normalized >= 8) {
        mood = "😄";
        type = "positive";
        label = "Very Happy";
      } else if (normalized >= 6) {
        mood = "😊";
        type = "positive";
        label = "Happy";
      } else if (normalized === 5) {
        mood = "😐";
        type = "neutral";
        label = "Neutral";
      } else if (normalized === 4) {
        mood = "😟";
        type = "negative";
        label = "Stressed";
      } else if (normalized > 0) {
        mood = "☹️";
        type = "negative";
        label = "Very Stressed";
      }

      return {
        id: entry?._id,
        day: new Date(entry.completedAt).toLocaleDateString("en-GB", {
          weekday: "short",
        }),
        completedAt: entry.completedAt, // Pass completedAt to MoodAnalyticsCard
        mood,
        value: rawScore,
        type,
        label,
        result: entry?.result,
        recommendations: entry?.recommendations ?? [],
      };
    });
  }, [data]);

  const avgScore = useMemo(() => {
    if (!data?.length) return 0;
    const total = data.reduce((sum, d) => sum + (d?.totalScore ?? 0), 0);
    return (total / data.length).toFixed(1);
  }, [data]);

  const trend = useMemo(() => {
    if (!data?.length || data.length < 2) return 0;
    const first = data[0]?.totalScore ?? 0;
    const last = data[data.length - 1]?.totalScore ?? 0;
    return (last - first).toFixed(1);
  }, [data]);

  const distribution = useMemo(() => {
    const buckets = {
      "Very Happy": 0,
      Happy: 0,
      Neutral: 0,
      Stressed: 0,
      "Very Stressed": 0,
    };

    if (!data?.length) return buckets;

    data.forEach((d) => {
      const normalized = Math.round(((d?.totalScore ?? 0) / 30) * 10);
      if (normalized >= 8) buckets["Very Happy"]++;
      else if (normalized >= 6) buckets["Happy"]++;
      else if (normalized === 5) buckets["Neutral"]++;
      else if (normalized === 4) buckets["Stressed"]++;
      else if (normalized > 0) buckets["Very Stressed"]++;
    });

    return buckets;
  }, [data]);

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <div className="flex items-center space-x-2">
        <Heart className="w-5 h-5 text-[#3A8DFF]" />
        <h2 className="text-lg font-semibold text-gray-700">Mood Analytics</h2>
      </div>

      <div className="p-2 rounded mb-4 flex gap-4 items-center">
        <span className="text-xs bg-gray-100 px-2 py-[4px] rounded-lg">
          Average: {avgScore}/30
        </span>
        <p className="text-xs flex gap-2 items-center bg-[#3A8DFF] px-2 py-[4px] rounded-lg text-white">
          <TrendingUp className="w-4 h-4 text-white" />
          <span>
            {trend >= 0 ? "+" : ""}
            {trend} trend
          </span>
        </p>
      </div>

      <h3 className="text-md font-medium mb-2">Mood Over Time</h3>
      <div className="p-4 rounded-lg mb-4">
        <MoodAnalyticsCard data={chartData} />
      </div>

      <h3 className="text-md font-medium text-gray-700 mb-2">
        Mood Distribution based on your overall progress
      </h3>
      <div className="space-y-2">
        {Object.entries(distribution).map(([label, count]) => {
          const emoji =
            label === "Very Happy"
              ? "😄"
              : label === "Happy"
              ? "😊"
              : label === "Neutral"
              ? "😐"
              : label === "Stressed"
              ? "😟"
              : "☹️";

          return (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span
                  className={`w-4 h-4 rounded-full ${
                    label === "Very Happy"
                      ? "bg-[#22C55E]"
                      : label === "Happy"
                      ? "bg-[#3B82F6]"
                      : label === "Neutral"
                      ? "bg-[#A0AEC0]"
                      : label === "Stressed"
                      ? "bg-[#F6E05E]"
                      : "bg-[#EF4444]"
                  }`}
                ></span>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  {emoji} {label}
                </span>
              </div>
              <span className="text-sm text-gray-600">{count} days</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodAnalytics;
