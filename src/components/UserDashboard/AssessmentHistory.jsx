import React from "react";
import { Heart, Target, TrendingUp } from "lucide-react";
import AssessmentHistoryChart from "./chart/AssessmentHistoryChart";

const AssessmentHistory = ({ data, avgScore }) => {
  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <div className="flex items-center space-x-2 ">
        <Target className="w-5 h-5 text-[#1e90ff]" />
        <h2 className="text-lg font-semibold text-gray-700">
          Assessment History
        </h2>
      </div>
      <div className="p-2 rounded mb-4 flex gap-4 items-center ">
        <span className="text-xs bg-gray-100  px-2 py-[4px] rounded-lg ">
          Average: {avgScore}/30
        </span>
      </div>
      <h3 className="text-md font-medium  mb-2">Assessment Over Time</h3>
      <div className="p-4 rounded-lg mb-4">
        <AssessmentHistoryChart
          assessmentHistory={data}
        ></AssessmentHistoryChart>
      </div>
      {/* add here */}
    </div>
  );
};

export default AssessmentHistory;
