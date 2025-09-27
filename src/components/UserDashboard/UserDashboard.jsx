// import React, { useEffect, useState, useContext, useMemo } from "react";
// import axios from "axios";
// import { AppContext } from "../../context/AppContext";

// import ActivityDashboard from "./Activity";
// import MoodAnalytics from "./MoodAnalytics";
// import WritingAnalytics from "./WritingAnalytics";
// import AnalyticsCards from "./AnalyticsCards";
// import AssessmentHistory from "./AssessmentHistory";
// import WritingInsights from "./WritingInsights";
// import AssessmentInsights from "./AssessmentInsights";

// export default function UserDashboard() {
//   const { userData, token, backendUrl } = useContext(AppContext);
//   const [userAnalyticsData, setUserAnalyticsData] = useState(null);
//   const [dayRange, setDayRange] = useState(""); // "" = all days
//   const [error, setError] = useState("");

//   const [therapyType, setTherapyType] = useState("individual");
//   // Tabs for therapy types
//   const tabs = [
//     { key: "individual", label: "Individual Therapy" },
//     { key: "couple", label: "Couple Therapy" },
//     { key: "family", label: "Family Therapy" },
//     { key: "child", label: "Child Therapy" },
//   ];

//   // Fetch user analytics data
//   useEffect(() => {
//     if (!token || !userData?._id) {
//       setUserAnalyticsData(null);
//       setError("You must be logged in to view analytics.");
//       return;
//     }

//     const fetchAnalyticsUserData = async () => {
//       try {
//         setError("");
//         const query = dayRange ? `?days=${dayRange}` : "";
//         const res = await axios.get(
//           `${backendUrl}/api/analytics/${userData._id}${query}`,
//           { headers: { token } }
//         );
//         setUserAnalyticsData(res.data);
//       } catch (err) {
//         console.error("Error fetching user analytics data:", err);
//         setError("Failed to fetch analytics. Please try again later.");
//         setUserAnalyticsData(null);
//       }
//     };
//     fetchAnalyticsUserData();
//   }, [dayRange,therapyType]);

//   // Memoized average score calculation
//   const avgScore = useMemo(() => {
//     const assessments = userAnalyticsData?.userassessments || [];
//     if (!assessments.length) return 0;

//     const total = assessments.reduce((sum, a) => sum + (a.totalScore || 0), 0);
//     return (total / assessments.length).toFixed(1);
//   }, [userAnalyticsData?.userassessments]);

//   // Reusable grid container
//   const GridContainer = ({ children }) => (
//     <div className="max-w-7xl mx-auto p-6 grid grid-cols-2 lg:grid-cols-2 md:grid-cols-1 max-sm:grid-cols-1 gap-4">
//       {children}
//     </div>
//   );

//   if (!token) {
//     return (
//       <div className="max-w-2xl mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center space-y-4">
//         {/* Icon */}
//         <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-red-500">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-8 w-8"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 11c0 .828-.672 1.5-1.5 1.5S9 11.828 9 11s.672-1.5 1.5-1.5S12 10.172 12 11zM15 11c0 .828-.672 1.5-1.5 1.5S12 11.828 12 11s.672-1.5 1.5-1.5S15 10.172 15 11zM9 16h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h4l2-2h6a2 2 0 012 2v14a2 2 0 01-2 2z"
//             />
//           </svg>
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl font-bold text-gray-800">
//           You’re not logged in
//         </h2>

//         {/* Subtitle */}
//         <p className="text-gray-500">
//           Please log in to access your personalized dashboard and see your
//           analytics.
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto p-6 text-center text-red-500 font-semibold">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Day Range Selector */}
//       <div className="max-w-7xl mx-auto p-4 flex items-center gap-2">
//         <label className="font-semibold">Select Day Range:</label>
//         <select
//           className="border p-2 rounded"
//           value={dayRange}
//           onChange={(e) => setDayRange(e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="1">1 Day</option>
//           <option value="7">7 Days</option>
//           <option value="14">14 Days</option>
//           <option value="30">30 Days</option>
//         </select>

//         {tabs &&
//           tabs.map((item, idx) => (
//             <button
//               key={idx}
//               value={item.label}
//               onClick={() => setTherapyType(item.key)}
//               className="px-4 py-2 border rounded border-black"
//             >
//               {item.label}
//             </button>
//           ))}
//       </div>

//       {/* Analytics Cards */}
//       <AnalyticsCards data={userAnalyticsData} />

//       {/* First Grid: Mood & Activity */}
//       <GridContainer>
//         <MoodAnalytics data={userAnalyticsData?.userassessments} />
//         <ActivityDashboard
//           avgPerAssessment={userAnalyticsData?.avgPerAssessment || "0 min"}
//           streak={userAnalyticsData?.streak || 0}
//           badges={userAnalyticsData?.badges}
//           totalTimeSpent={userAnalyticsData?.totalTimeSpent || "0 hours"}
//           completedCount={userAnalyticsData?.completedCount || 0}
//           pendingCount={userAnalyticsData?.pendingCount || 0}
//         />
//       </GridContainer>

//       {/* Second Grid: Assessment Insights & History */}
//       <GridContainer>
//         <AssessmentInsights data={userAnalyticsData?.userassessments} />
//         <AssessmentHistory
//           data={userAnalyticsData?.userassessments}
//           avgScore={avgScore}
//         />
//       </GridContainer>

//       {/* Third Grid: Writing Analytics & Insights */}
//       <GridContainer>
//         <WritingAnalytics />
//         <WritingInsights />
//       </GridContainer>
//     </div>
//   );
// }
import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

import ActivityDashboard from "./Activity";
import MoodAnalytics from "./MoodAnalytics";
import WritingAnalytics from "./WritingAnalytics";
import AnalyticsCards from "./AnalyticsCards";
import AssessmentHistory from "./AssessmentHistory";
import WritingInsights from "./WritingInsights";
import AssessmentInsights from "./AssessmentInsights";

export default function UserDashboard() {
  const { userData, token, backendUrl } = useContext(AppContext);
  const [userAnalyticsData, setUserAnalyticsData] = useState(null);
  const [dayRange, setDayRange] = useState(""); // "" = all days
  const [error, setError] = useState("");

  const [therapyType, setTherapyType] = useState("individual");
  // Tabs for therapy types
  const tabs = [
    { key: "individual", label: "Individual Therapy" },
    { key: "couple", label: "Couple Therapy" },
    { key: "family", label: "Family Therapy" },
    { key: "child", label: "Child Therapy" },
  ];

  // Fetch user analytics data
  useEffect(() => {
    if (!token || !userData?._id) {
      setUserAnalyticsData(null);
      setError("You must be logged in to view analytics.");
      return;
    }

    const fetchAnalyticsUserData = async () => {
      try {
        setError("");

        // Build query string dynamically
        const params = new URLSearchParams();
        if (dayRange) params.append("days", dayRange);
        if (therapyType) params.append("therapyType", therapyType);

        const query = params.toString() ? `?${params.toString()}` : "";
        console.log(query, "getting the query data");
        const res = await axios.get(
          `${backendUrl}/api/analytics/${userData._id}${query}`,
          { headers: { token } }
        );
        console.log(res.data, "we are getting all data");
        setUserAnalyticsData(res.data);
      } catch (err) {
        console.error("Error fetching user analytics data:", err);
        setError("Failed to fetch analytics. Please try again later.");
        setUserAnalyticsData(null);
      }
    };

    fetchAnalyticsUserData();
  }, [dayRange, therapyType, token, userData?._id]);

  // Memoized average score calculation
  const avgScore = useMemo(() => {
    const assessments = userAnalyticsData?.userassessments || [];
    if (!assessments.length) return 0;

    const total = assessments.reduce((sum, a) => sum + (a.totalScore || 0), 0);
    return (total / assessments.length).toFixed(1);
  }, [userAnalyticsData?.userassessments]);

  // Reusable grid container
  const GridContainer = ({ children }) => (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-2 lg:grid-cols-2 md:grid-cols-1 max-sm:grid-cols-1 gap-4">
      {children}
    </div>
  );

  if (!token) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c0 .828-.672 1.5-1.5 1.5S9 11.828 9 11s.672-1.5 1.5-1.5S12 10.172 12 11zM15 11c0 .828-.672 1.5-1.5 1.5S12 11.828 12 11s.672-1.5 1.5-1.5S15 10.172 15 11zM9 16h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h4l2-2h6a2 2 0 012 2v14a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          You’re not logged in
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500">
          Please log in to access your personalized dashboard and see your
          analytics.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Day Range Selector + Therapy Tabs */}
      <div className="max-w-7xl mx-auto p-4 flex items-center gap-2 flex-wrap">
        <label className="font-semibold">Select Day Range:</label>
        <select
          className="border p-2 rounded"
          value={dayRange}
          onChange={(e) => setDayRange(e.target.value)}
        >
          <option value="">All</option>
          <option value="1">1 Day</option>
          <option value="7">7 Days</option>
          <option value="14">14 Days</option>
          <option value="30">30 Days</option>
        </select>

        {tabs.map((item) => (
          <button
            key={item.key}
            onClick={() => setTherapyType(item.key)}
            className={`px-4 py-2 border rounded transition ${
              therapyType === item.key
                ? "bg-blue-600 text-white border-blue-600"
                : "border-black text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Analytics Cards */}
      <AnalyticsCards data={userAnalyticsData} />
      {/* First Grid: Mood & Activity */}
      <GridContainer>
        <MoodAnalytics data={userAnalyticsData?.userassessments} />
        <ActivityDashboard
          avgPerAssessment={userAnalyticsData?.avgPerAssessment || "0 min"}
          streak={userAnalyticsData?.streak || 0}
          badges={userAnalyticsData?.badges}
          totalTimeSpent={userAnalyticsData?.totalTimeSpent || "0 hours"}
          completedCount={userAnalyticsData?.completedCount || 0}
          pendingCount={userAnalyticsData?.pendingCount || 0}
        />
      </GridContainer>

      {/* Second Grid: Assessment Insights & History */}
      <GridContainer>
        <AssessmentInsights data={userAnalyticsData?.userassessments} />
        <AssessmentHistory
          data={userAnalyticsData?.userassessments}
          avgScore={avgScore}
        />
      </GridContainer>

      {/* Third Grid: Writing Analytics & Insights */}
{/*       <GridContainer>
        <WritingAnalytics />
        <WritingInsights />
      </GridContainer> */}
    </div>
  );
}
