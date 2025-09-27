import React from "react";
import { CheckCircle2, Clock, Award } from "lucide-react";

const ActivityDashboard = ({
  completedCount,
  pendingCount,
  totalTimeSpent,
  streak,
  avgPerAssessment,
  badges = {},
}) => {
  // Map badges keys to display names
  const badgeList = [
    { key: "firstAssessment", label: "First Assessment" },
    { key: "weekStreak", label: "Week Streak" },
    { key: "consistentTracker", label: "Consistent Tracker" },
    { key: "monthChampion", label: "Month Champion" },
    { key: "mindfulWriter", label: "Mindful Writer" },
    { key: "earlyBird", label: "Early Bird" },
  ];

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <CheckCircle2 className="w-5 h-5 text-[#1e90ff]" />
        <h2 className="text-lg font-semibold text-gray-700">
          Activity & Engagement
        </h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Track your assessment completion and engagement patterns
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-[#E6F0FF] p-4 rounded-lg text-center border border-[#CCE0FF]">
          <p className="text-2xl font-bold text-[#1e90ff]">{completedCount}</p>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
        <div className="bg-[#E6F0FF] p-4 rounded-lg text-center border border-[#CCE0FF]">
          <p className="text-2xl font-bold text-[#004c99]">{pendingCount}</p>
          <p className="text-sm text-gray-600">Pending</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Completion Rate
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#1e90ff] h-2 rounded-full"
            style={{
              width: `${
                (completedCount / (completedCount + pendingCount) || 0) * 100
              }%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 text-right">
          {(
            (completedCount / (completedCount + pendingCount) || 0) * 100
          ).toFixed(0)}
          %
        </p>
      </div>

      {/* Streak */}
      <div className="bg-[#E6F0FF] p-4 rounded-lg mb-4 flex items-center justify-between border border-[#CCE0FF]">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-[#1e90ff]" />
          <p className="text-sm font-medium text-gray-700">Current Streak</p>
          <span className="text-xs text-gray-500">Keep it up!</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold text-gray-800">{streak}</p>
          <p className="text-sm text-gray-600">days</p>
        </div>
      </div>

      {/* Time Insights */}
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-5 h-5 text-[#1e90ff]" />
        <h2 className="text-lg font-semibold text-gray-700">Time Insights</h2>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <p className="text-sm text-gray-600">Avg. per assessment:</p>
          <p className="text-sm font-medium text-[#1e90ff]">
            {avgPerAssessment}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total time spent:</p>
          <p className="text-sm font-medium text-[#1e90ff]">{totalTimeSpent}</p>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="flex items-center space-x-2 mb-4">
        <Award className="w-5 h-5 text-[#1e90ff]" />
        <h2 className="text-lg font-semibold text-gray-700">
          Achievement Badges
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {badgeList?.map((badge) => {
          const isUnlocked = badges[badge?.key];
          return (
            <button
              key={badge.key}
              className={`p-3 rounded-lg flex flex-col items-center justify-center text-center text-xs font-medium
              ${
                isUnlocked
                  ? "bg-[#E6F0FF] text-[#1e90ff] border border-[#CCE0FF] hover:bg-[#CCE0FF]"
                  : "bg-gray-50 text-gray-400 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              <Award className="w-5 h-5 mb-1" />
              {badge.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityDashboard;
