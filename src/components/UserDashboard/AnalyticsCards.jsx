import React, { useMemo } from "react";
import {
  Heart,
  Book,
  Leaf,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const AnalyticsCards = ({ data }) => {
  if (!data) return null;

  const {
    overallWellbeingCurrent,
    overallWellbeingLast,
    overallWellbeingChange,
    therapyMetric,
  } = data;
  // Status message
  const status = useMemo(() => {
    if (overallWellbeingCurrent >= 25) return "Excellent 🌟";
    if (overallWellbeingCurrent >= 15) return "Good 🙂";
    if (overallWellbeingCurrent >= 5) return "Needs Attention ⚡";
    // return "Low – Stay Consistent 💡";
  }, [overallWellbeingCurrent]);

  // Dynamic therapy metric status (0 - 30 scale)
  const therapyMetricStatus = useMemo(() => {
    if (!therapyMetric?.current) return "No data yet";

    const value = parseFloat(therapyMetric.current);

    if (value >= 25) return `Excellent 🌟`;
    if (value >= 15) return `Good 🙂`;
    if (value >= 5) return `Needs Improvement ⚡`;
    // return `Critical 🚨 (Needs Attention)`;
  }, [therapyMetric]);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Overall Wellbeing Card */}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-md font-semibold text-gray-700">
            Overall Wellbeing
          </h3>
          <Heart className="w-5 h-5 text-blue-500" />
        </div>
        <div className="space-y-2 w-full">
          <p className="text-2xl font-bold text-gray-800 mb-2">
            {overallWellbeingCurrent}{" "}
            <span className="text-sm text-black">{status}</span>
          </p>
          <p className="text-xs flex gap-2 items-center">
            {overallWellbeingChange >= 0 ? (
              <TrendingUp className="w-4 h-4 text-blue-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span
              className={
                overallWellbeingChange >= 0 ? "text-blue-500" : "text-red-500"
              }
            >
              {Math.abs(overallWellbeingChange)}% from last period
            </span>
          </p>
          <p className="text-xs text-gray-500">
            Previous: {overallWellbeingLast}
          </p>
        </div>
      </div>

      {/* Journaling Consistency Card */}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-md font-semibold text-gray-700">
            Journaling Consistency
          </h3>
          <Book className="w-5 h-5 text-indigo-500" />
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-gray-800 mb-2">
            {data.journalingConsistency || "0%"}
          </p>
          <p className="text-xs flex gap-2 items-center text-blue-500">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span>{data.journalingChange || "0%"} from last period</span>
          </p>
          <p className="text-xs text-gray-500">
            Percentage of days with entries
          </p>
        </div>
      </div>

      {/* Stress Management Card */}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-md font-semibold text-gray-700">
            {data.therapyMetric.label}
          </h3>
          <Leaf className="w-5 h-5 text-green-500" />
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-gray-800 mb-2">
            {data.therapyMetric.current}{" "}
            <span className="text-sm">{therapyMetricStatus}</span>
          </p>
          <p className="text-xs flex gap-2 items-center">
            {data.therapyMetric.change >= 0 ? (
              <TrendingUp className="w-4 h-4 text-blue-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span
              className={
                data.therapyMetric.change >= 0
                  ? "text-blue-500"
                  : "text-red-500"
              }
            >
              {Math.abs(data.therapyMetric.change)}% from last period
            </span>
          </p>
          <p className="text-xs text-gray-500">
            Previous: {data.therapyMetric.last}
          </p>
        </div>
      </div>

      {/* Goal Achievement Card */}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-md font-semibold text-gray-700">
            Goal Achievement
          </h3>
          <Calendar className="w-5 h-5 text-purple-500" />
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-gray-800 mb-2">
            {data.goalAchievement || "0%"}
          </p>
          <p className="text-xs flex gap-2 items-center text-blue-500">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span>{data.goalChange || "0%"} from last period</span>
          </p>
          <p className="text-xs text-gray-500">Weekly goals completed</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCards;
