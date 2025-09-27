import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import moodTrackingService from "../services/moodTrackingService";
import {
  FaSmile,
  FaMeh,
  FaFrown,
  FaHeart,
  FaChartLine,
  FaCog,
  FaBullseye,
  FaHistory,
  FaBrain,
  FaBell,
  FaShieldAlt,
  FaUsers,
  FaDownload,
  FaPlus,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaLightbulb,
  FaClock,
  FaThermometerHalf,
  FaBed,
  FaRunning,
  FaUtensils,
  FaBook,
  FaHome,
  FaPlane,
  FaGraduationCap,
  FaEllipsisH,
  FaQuestion,
  FaTrash,
  FaFileExport,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import { GiMeditation, GiHealthNormal } from "react-icons/gi";
import jsPDF from "jspdf";
import MoodCharts from "../components/MoodCharts";

const MoodDashboard = () => {
  const { userData, token } = useContext(AppContext);
  const [currentPeriod, setCurrentPeriod] = useState("30"); // 7, 30, 90, 365
  const [analytics, setAnalytics] = useState(null);
  const [moodEntries, setMoodEntries] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState("overview"); // overview, trends, patterns, goals, insights, data
  const [insights, setInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedChartType, setSelectedChartType] = useState("line"); // line, bar, heatmap, radar, activity
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState(false);
  const [lastAnalysisCheck, setLastAnalysisCheck] = useState(null);

  // Data management states
  const [exportLoading, setExportLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteType, setDeleteType] = useState(""); // "entries", "all"
  const [exportFormat, setExportFormat] = useState("csv"); // csv, json, pdf

  const moodIcons = {
    very_happy: <FaSmile className="text-green-500" />,
    happy: <FaSmile className="text-blue-500" />,
    neutral: <FaMeh className="text-yellow-500" />,
    sad: <FaFrown className="text-orange-500" />,
    very_sad: <FaFrown className="text-red-500" />,
    anxious: <GiHealthNormal className="text-purple-500" />,
    stressed: <FaBrain className="text-indigo-500" />,
    excited: <FaHeart className="text-pink-500" />,
    calm: <GiMeditation className="text-teal-500" />,
    angry: <FaFrown className="text-red-600" />,
  };

  const activityIcons = {
    exercise: <FaRunning className="text-green-500" />,
    work: <FaBook className="text-blue-500" />,
    social: <FaUsers className="text-purple-500" />,
    sleep: <FaBed className="text-indigo-500" />,
    eating: <FaUtensils className="text-orange-500" />,
    hobby: <FaHeart className="text-pink-500" />,
    family: <FaHome className="text-teal-500" />,
    travel: <FaPlane className="text-yellow-500" />,
    study: <FaGraduationCap className="text-gray-500" />,
    other: <FaEllipsisH className="text-gray-400" />,
  };

  useEffect(() => {
    if (userData?._id) {
      loadDashboardData();
    }
  }, [userData, currentPeriod]);

  // Check for new AI analysis every 30 seconds
  useEffect(() => {
    if (!userData?._id) return;

    const checkForNewAnalysis = async () => {
      try {
        setAiAnalysisLoading(true);
        const latestAnalysis = await moodTrackingService.getLatestAIAnalysis(
          userData._id
        );

        if (latestAnalysis.analysis) {
          const analysisDate = new Date(latestAnalysis.analysis.analysisDate);
          const lastCheck = lastAnalysisCheck
            ? new Date(lastAnalysisCheck)
            : null;

          // Only update if we have a newer analysis
          if (!lastCheck || analysisDate > lastCheck) {
            setAiAnalysis(latestAnalysis.analysis);
            setLastAnalysisCheck(analysisDate.toISOString());

            // Show notification for new analysis
            if (lastCheck) {
              toast.success(
                "New AI analysis available! Check the Insights tab for updates."
              );
            }
          }
        }
      } catch (error) {
        console.error("Error checking for new AI analysis:", error);
      } finally {
        setAiAnalysisLoading(false);
      }
    };

    // Check immediately
    checkForNewAnalysis();

    // Set up polling every 30 seconds
    const interval = setInterval(checkForNewAnalysis, 30000);

    return () => clearInterval(interval);
  }, [userData?._id, lastAnalysisCheck]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [dashboardData, entriesData] = await Promise.all([
        moodTrackingService.getMoodDashboard(userData._id, currentPeriod),
        moodTrackingService.getMoodEntries(userData._id, { limit: 100 }),
      ]);

      setAnalytics(dashboardData.dashboard?.analytics);
      setMoodEntries(entriesData.moodEntries);
      setGoals(dashboardData.dashboard?.goals || []);
      setAiAnalysis(dashboardData.dashboard?.aiAnalysis || null);
      setInsights(dashboardData.dashboard?.insights || []);
      setRecommendations(dashboardData.dashboard?.recommendations || []);
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error("Dashboard data loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "improving":
        return <FaArrowUp className="text-green-500 text-xl" />;
      case "declining":
        return <FaArrowDown className="text-red-500 text-xl" />;
      case "stable":
        return <FaMinus className="text-gray-500 text-xl" />;
      default:
        return <FaQuestion className="text-gray-400 text-xl" />;
    }
  };

  const getMoodColor = (moodLabel) => {
    const colors = {
      very_happy: "bg-green-100 text-green-800",
      happy: "bg-blue-100 text-blue-800",
      neutral: "bg-yellow-100 text-yellow-800",
      sad: "bg-orange-100 text-orange-800",
      very_sad: "bg-red-100 text-red-800",
      anxious: "bg-purple-100 text-purple-800",
      stressed: "bg-indigo-100 text-indigo-800",
      excited: "bg-pink-100 text-pink-800",
      calm: "bg-teal-100 text-teal-800",
      angry: "bg-red-100 text-red-800",
    };
    return colors[moodLabel] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Data Export Functions
  const exportMoodData = async (format = "csv") => {
    setExportLoading(true);
    try {
      // Get all mood entries for export
      const allEntries = await moodTrackingService.getMoodEntries(
        userData._id,
        { limit: 1000 }
      );

      if (format === "csv") {
        exportToCSV(allEntries.moodEntries);
      } else if (format === "json") {
        exportToJSON(allEntries.moodEntries);
      } else if (format === "pdf") {
        exportToPDF(allEntries.moodEntries);
      }

      toast.success(
        `Mood data exported successfully as ${format.toUpperCase()}`
      );
    } catch (error) {
      toast.error("Failed to export mood data");
      console.error("Export error:", error);
    } finally {
      setExportLoading(false);
    }
  };

  const exportToCSV = (entries) => {
    const headers = [
      "Date",
      "Time",
      "Mood Score",
      "Mood Label",
      "Activities",
      "Notes",
      "Sleep Hours",
      "Stress Level",
      "Energy Level",
      "Social Level",
    ];

    const csvContent = [
      headers.join(","),
      ...entries.map((entry) =>
        [
          new Date(entry.timestamp).toLocaleDateString(),
          new Date(entry.timestamp).toLocaleTimeString(),
          entry.moodScore,
          entry.moodLabel,
          entry.activities?.join("; ") || "",
          entry.notes || "",
          entry.sleepHours || "",
          entry.stressLevel || "",
          entry.energyLevel || "",
          entry.socialLevel || "",
        ].join(",")
      ),
    ].join("\n");

    downloadFile(
      csvContent,
      `mood-data-${new Date().toISOString().split("T")[0]}.csv`,
      "text/csv"
    );
  };

  const exportToJSON = (entries) => {
    const exportData = {
      exportDate: new Date().toISOString(),
      userId: userData._id,
      totalEntries: entries.length,
      moodEntries: entries.map((entry) => ({
        id: entry._id,
        timestamp: entry.timestamp,
        moodScore: entry.moodScore,
        moodLabel: entry.moodLabel,
        activities: entry.activities || [],
        notes: entry.notes || "",
        sleepHours: entry.sleepHours,
        stressLevel: entry.stressLevel,
        energyLevel: entry.energyLevel,
        socialLevel: entry.socialLevel,
      })),
    };

    const jsonContent = JSON.stringify(exportData, null, 2);
    downloadFile(
      jsonContent,
      `mood-data-${new Date().toISOString().split("T")[0]}.json`,
      "application/json"
    );
  };

  const exportToPDF = (entries) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Mood Tracking Data Report", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 15;

    // Subtitle
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      yPosition,
      { align: "center" }
    );
    yPosition += 10;

    doc.text(`Total Entries: ${entries.length}`, pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 20;

    // Summary statistics
    if (entries.length > 0) {
      const avgMood = (
        entries.reduce((sum, entry) => sum + entry.moodScore, 0) /
        entries.length
      ).toFixed(2);
      const moodCounts = entries.reduce((acc, entry) => {
        acc[entry.moodLabel] = (acc[entry.moodLabel] || 0) + 1;
        return acc;
      }, {});

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Summary Statistics", margin, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Average Mood Score: ${avgMood}/5`, margin, yPosition);
      yPosition += 7;

      doc.text("Mood Distribution:", margin, yPosition);
      yPosition += 7;

      Object.entries(moodCounts).forEach(([mood, count]) => {
        const percentage = ((count / entries.length) * 100).toFixed(1);
        doc.text(
          `  • ${mood}: ${count} entries (${percentage}%)`,
          margin + 5,
          yPosition
        );
        yPosition += 5;
      });

      yPosition += 10;
    }

    // Individual entries
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Detailed Entries", margin, yPosition);
    yPosition += 15;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    entries.forEach((entry, index) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      const entryDate = new Date(entry.timestamp);
      const dateStr = entryDate.toLocaleDateString();
      const timeStr = entryDate.toLocaleTimeString();

      // Entry header
      doc.setFont("helvetica", "bold");
      doc.text(`Entry ${index + 1}`, margin, yPosition);
      yPosition += 5;

      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${dateStr}`, margin, yPosition);
      yPosition += 5;

      doc.text(`Time: ${timeStr}`, margin, yPosition);
      yPosition += 5;

      doc.text(
        `Mood: ${entry.moodLabel} (${entry.moodScore}/5)`,
        margin,
        yPosition
      );
      yPosition += 5;

      if (entry.activities && entry.activities.length > 0) {
        doc.text(
          `Activities: ${entry.activities.join(", ")}`,
          margin,
          yPosition
        );
        yPosition += 5;
      }

      if (entry.notes) {
        // Handle long notes by wrapping text
        const notesLines = doc.splitTextToSize(
          `Notes: ${entry.notes}`,
          pageWidth - 2 * margin
        );
        doc.text(notesLines, margin, yPosition);
        yPosition += notesLines.length * 5;
      }

      yPosition += 10; // Space between entries
    });

    // Save the PDF
    doc.save(`mood-report-${new Date().toISOString().split("T")[0]}.pdf`);
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Data Deletion Functions
  const deleteMoodData = async (type) => {
    setDeleteLoading(true);
    try {
      if (type === "entries") {
        await moodTrackingService.deleteMoodEntries(userData._id);
        toast.success("All mood entries deleted successfully");
      } else if (type === "all") {
        await moodTrackingService.deleteAllMoodData(userData._id);
        toast.success("All mood tracking data deleted successfully");
      }

      // Reload dashboard data
      await loadDashboardData();
      setShowDeleteConfirm(false);
      setDeleteType("");
    } catch (error) {
      toast.error("Failed to delete mood data");
      console.error("Delete error:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const confirmDelete = (type) => {
    setDeleteType(type);
    setShowDeleteConfirm(true);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Mood</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.basicStats?.averageScore?.toFixed(1) || "N/A"}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <FaChartLine className="text-blue-500 text-xl" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            {getTrendIcon(analytics?.trend)}
            <span className="ml-1 text-gray-600 capitalize">
              {analytics?.trend || "No trend"}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Entries</p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.basicStats?.totalEntries || 0}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <FaHistory className="text-green-500 text-xl" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Last {currentPeriod} days
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Goals</p>
              <p className="text-2xl font-bold text-gray-900">
                {goals?.length || 0}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <FaBullseye className="text-purple-500 text-xl" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {goals?.filter((g) => g.isActive)?.length || 0} active
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-6 shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Insights</p>
              <p className="text-2xl font-bold text-gray-900">
                {aiAnalysisLoading
                  ? "Updating..."
                  : aiAnalysis
                  ? "Available"
                  : "None"}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-full">
              <FaBrain className="text-orange-500 text-xl" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {aiAnalysisLoading ? "Processing new data..." : "Latest analysis"}
          </p>
          {aiAnalysis && (
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600">✓ Auto-updated</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Mood Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Mood Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {analytics?.moodDistribution &&
            Object.entries(analytics.moodDistribution).map(([mood, count]) => (
              <div key={mood} className="text-center p-4 rounded-lg bg-gray-50">
                <div className="text-2xl mb-2">{moodIcons[mood]}</div>
                <p className="text-sm font-medium text-gray-900 capitalize">
                  {mood.replace("_", " ")}
                </p>
                <p className="text-lg font-bold text-gray-700">{count}</p>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Recent Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Mood Entries
        </h3>
        <div className="space-y-3">
          {moodEntries.slice(0, 5).map((entry) => (
            <div
              key={entry._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="text-xl">{moodIcons[entry.moodLabel]}</div>
                <div>
                  <p className="font-medium capitalize">
                    {entry.moodLabel.replace("_", " ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(entry.timestamp)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">Score: {entry.moodScore}/5</p>
                {entry.activities?.length > 0 && (
                  <p className="text-sm text-gray-600">
                    {entry.activities.slice(0, 2).join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderTrends = () => (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-4 shadow-sm border"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Chart Type</h3>
          <div className="flex items-center space-x-2">
            {[
              { id: "line", label: "Line Chart", icon: "📈" },
              { id: "bar", label: "Bar Chart", icon: "📊" },
              { id: "heatmap", label: "Heatmap", icon: "🔥" },
              { id: "radar", label: "Radar Chart", icon: "🎯" },
              { id: "activity", label: "Activity Impact", icon: "🏃‍♂️" },
            ].map((chart) => (
              <button
                key={chart.id}
                onClick={() => setSelectedChartType(chart.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedChartType === chart.id
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span>{chart.icon}</span>
                <span>{chart.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <MoodCharts
          moodEntries={moodEntries}
          analytics={analytics}
          chartType={selectedChartType}
          width={800}
          height={400}
          title={getChartTitle(selectedChartType)}
        />
      </motion.div>

      {/* Chart Descriptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Chart Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getChartDescription(selectedChartType)}
        </div>
      </motion.div>

      {/* Additional Charts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Mood Distribution */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <MoodCharts
            moodEntries={moodEntries}
            analytics={analytics}
            chartType="bar"
            width={400}
            height={300}
            title="Mood Distribution"
          />
        </div>

        {/* Activity Impact */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <MoodCharts
            moodEntries={moodEntries}
            analytics={analytics}
            chartType="activity"
            width={400}
            height={300}
            title="Activity Impact on Mood"
          />
        </div>
      </motion.div>

      {/* Time Patterns Heatmap */}
      {analytics?.timePatterns &&
        Object.keys(analytics.timePatterns).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-sm border"
          >
            <MoodCharts
              moodEntries={moodEntries}
              analytics={analytics}
              chartType="heatmap"
              width={800}
              height={300}
              title="Mood by Time of Day"
            />
          </motion.div>
        )}

      {/* Factor Correlations Radar */}
      {analytics?.factorCorrelations &&
        Object.keys(analytics.factorCorrelations).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-sm border"
          >
            <MoodCharts
              moodEntries={moodEntries}
              analytics={analytics}
              chartType="radar"
              width={500}
              height={400}
              title="Mood Factor Correlations"
            />
          </motion.div>
        )}
    </div>
  );

  const getChartTitle = (chartType) => {
    const titles = {
      line: "Mood Trend Over Time",
      bar: "Mood Distribution",
      heatmap: "Mood by Time of Day",
      radar: "Mood Factor Correlations",
      activity: "Activity Impact on Mood",
    };
    return titles[chartType] || "Mood Chart";
  };

  const getChartDescription = (chartType) => {
    const descriptions = {
      line: (
        <>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Line Chart</h4>
            <p className="text-sm text-gray-600">
              Shows your mood progression over time. Each point represents a
              mood entry, and the line connects them to show trends and
              patterns.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">How to Read</h4>
            <p className="text-sm text-gray-600">
              • Higher points = Better mood
              <br />
              • Steady upward line = Improving mood
              <br />
              • Sharp drops = Sudden mood changes
              <br />• Flat line = Stable mood
            </p>
          </div>
        </>
      ),
      bar: (
        <>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Bar Chart</h4>
            <p className="text-sm text-gray-600">
              Displays the frequency of different mood states. Taller bars
              indicate more frequent mood occurrences.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Insights</h4>
            <p className="text-sm text-gray-600">
              • Most common mood state
              <br />
              • Mood diversity
              <br />
              • Emotional patterns
              <br />• Mood balance
            </p>
          </div>
        </>
      ),
      heatmap: (
        <>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Heatmap</h4>
            <p className="text-sm text-gray-600">
              Visualizes mood patterns by time of day. Darker colors indicate
              higher mood scores during those hours.
            </p>
          </div>
          <div className="p-4 bg-teal-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Time Patterns</h4>
            <p className="text-sm text-gray-600">
              • Best time of day for mood
              <br />
              • Low mood periods
              <br />
              • Daily rhythm patterns
              <br />• Optimal activity timing
            </p>
          </div>
        </>
      ),
      radar: (
        <>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Radar Chart</h4>
            <p className="text-sm text-gray-600">
              Shows correlations between different factors (sleep, stress,
              energy, social) and your mood scores.
            </p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Factor Analysis</h4>
            <p className="text-sm text-gray-600">
              • Strongest mood influencers
              <br />
              • Areas for improvement
              <br />
              • Factor relationships
              <br />• Personalized insights
            </p>
          </div>
        </>
      ),
      activity: (
        <>
          <div className="p-4 bg-emerald-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Activity Impact</h4>
            <p className="text-sm text-gray-600">
              Shows how different activities affect your mood. Higher bars
              indicate activities that boost your mood more.
            </p>
          </div>
          <div className="p-4 bg-cyan-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Activity Insights
            </h4>
            <p className="text-sm text-gray-600">
              • Most mood-boosting activities
              <br />
              • Activities to increase
              <br />
              • Mood-dampening activities
              <br />• Lifestyle optimization
            </p>
          </div>
        </>
      ),
    };
    return descriptions[chartType] || descriptions.line;
  };

  const renderPatterns = () => (
    <div className="space-y-6">
      {/* Time Patterns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Mood by Time of Day
        </h3>
        <div className="grid grid-cols-6 gap-2">
          {analytics?.timePatterns &&
            Object.entries(analytics.timePatterns)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([hour, avgScore]) => (
                <div
                  key={hour}
                  className="text-center p-3 bg-gray-50 rounded-lg"
                >
                  <p className="text-sm font-medium">
                    {parseInt(hour) === 0
                      ? "12 AM"
                      : parseInt(hour) === 12
                      ? "12 PM"
                      : parseInt(hour) > 12
                      ? `${parseInt(hour) - 12} PM`
                      : `${hour} AM`}
                  </p>
                  <p className="text-lg font-bold text-gray-700">
                    {avgScore.toFixed(1)}
                  </p>
                </div>
              ))}
        </div>
      </motion.div>

      {/* Weekly Patterns */}
      {analytics?.weeklyPatterns &&
        Object.keys(analytics.weeklyPatterns).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm border"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Mood Patterns
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {Object.entries(analytics.weeklyPatterns)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([day, avgScore]) => {
                  const dayNames = [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ];
                  const dayName = dayNames[parseInt(day)];

                  return (
                    <div
                      key={day}
                      className="text-center p-3 bg-gray-50 rounded-lg"
                    >
                      <p className="text-sm font-medium text-gray-600">
                        {dayName}
                      </p>
                      <p className="text-lg font-bold text-gray-700">
                        {avgScore.toFixed(1)}
                      </p>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}

      {/* Seasonal Patterns */}
      {analytics?.seasonalPatterns &&
        Object.keys(analytics.seasonalPatterns).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-sm border"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Seasonal Mood Patterns
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(analytics.seasonalPatterns).map(
                ([season, avgScore]) => (
                  <div
                    key={season}
                    className="text-center p-4 bg-gray-50 rounded-lg"
                  >
                    <p className="text-sm font-medium text-gray-600 capitalize">
                      {season}
                    </p>
                    <p className="text-xl font-bold text-gray-700">
                      {avgScore.toFixed(1)}
                    </p>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}

      {/* Mood Variability Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Mood Variability Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Mood Range</h4>
            <p className="text-2xl font-bold text-blue-600">
              {analytics?.basicStats
                ? `${analytics.basicStats.minScore} - ${analytics.basicStats.maxScore}`
                : "N/A"}
            </p>
            <p className="text-sm text-gray-600">Min to Max Score</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Variability Score
            </h4>
            <p className="text-2xl font-bold text-green-600">
              {analytics?.moodVariability
                ? `${(analytics.moodVariability * 100).toFixed(0)}%`
                : "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              {analytics?.moodVariability > 0.6
                ? "High variability"
                : analytics?.moodVariability > 0.3
                ? "Moderate variability"
                : "Low variability"}
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Stability Score</h4>
            <p className="text-2xl font-bold text-purple-600">
              {analytics?.moodStability
                ? `${(analytics.moodStability * 100).toFixed(0)}%`
                : "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              {analytics?.moodStability > 0.8
                ? "Very stable"
                : analytics?.moodStability > 0.5
                ? "Moderately stable"
                : "Less stable"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Trend Strength Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Trend Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Current Trend</h4>
            <div className="flex items-center space-x-2 mb-2">
              {getTrendIcon(analytics?.trend)}
              <span className="text-lg font-semibold capitalize">
                {analytics?.trend || "No trend"}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {analytics?.trend === "improving" &&
                "Your mood has been getting better over time."}
              {analytics?.trend === "declining" &&
                "Your mood has been decreasing recently."}
              {analytics?.trend === "stable" &&
                "Your mood has remained consistent."}
              {!analytics?.trend && "Not enough data to determine trend."}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Trend Strength</h4>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Weak</span>
                <span>Strong</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      analytics?.trendStrength
                        ? analytics.trendStrength * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {analytics?.trendStrength > 0.7
                ? "Strong trend detected"
                : analytics?.trendStrength > 0.4
                ? "Moderate trend"
                : "Weak or no clear trend"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      {/* Active Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Goals</h3>
        </div>
        <div className="space-y-4">
          {goals?.length > 0 ? (
            goals.map((goal) => (
              <div key={goal._id} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      goal.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {goal.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{goal.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span>Target: {goal.targetMoodScore}/5</span>
                  <span>Frequency: {goal.targetFrequency}</span>
                  <span>Streak: {goal.progress?.currentStreak || 0} days</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <FaBullseye className="text-4xl text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No active goals</p>
              <p className="text-sm text-gray-500">
                Create your first mood goal to get started
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  const renderDataManagement = () => (
    <div className="space-y-6">
      {/* Data Export Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <div className="flex items-center space-x-3 mb-6">
          <FaFileExport className="text-2xl text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Export Mood Data
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export Options */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Export Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: "csv",
                    label: "CSV",
                    description: "Spreadsheet format",
                  },
                  { id: "json", label: "JSON", description: "Structured data" },
                  {
                    id: "pdf",
                    label: "PDF",
                    description: "Formatted document",
                  },
                ].map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setExportFormat(format.id)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      exportFormat === format.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <div className="font-semibold">{format.label}</div>
                    <div className="text-xs text-gray-500">
                      {format.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => exportMoodData(exportFormat)}
              disabled={exportLoading || moodEntries.length === 0}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {exportLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <FaDownload className="text-sm" />
                  <span>Export Data ({moodEntries.length} entries)</span>
                </>
              )}
            </button>
          </div>

          {/* Export Information */}
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <FaInfoCircle className="text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">
                    What's included?
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• All mood entries with timestamps</li>
                    <li>• Mood scores and labels</li>
                    <li>• Activities and notes</li>
                    <li>• Sleep, stress, energy, and social levels</li>
                    <li>• Export date and user information</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Data Summary</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total Entries:</span>
                  <span className="font-medium">{moodEntries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date Range:</span>
                  <span className="font-medium">
                    {moodEntries.length > 0
                      ? `${new Date(
                          moodEntries[moodEntries.length - 1].timestamp
                        ).toLocaleDateString()} - ${new Date(
                          moodEntries[0].timestamp
                        ).toLocaleDateString()}`
                      : "No data"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Average Mood:</span>
                  <span className="font-medium">
                    {analytics?.basicStats?.averageScore?.toFixed(1) || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Data Deletion Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <div className="flex items-center space-x-3 mb-6">
          <FaTrash className="text-2xl text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Delete Mood Data
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delete Options */}
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start space-x-2">
                <FaExclamationTriangle className="text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-900 mb-1">Warning</h4>
                  <p className="text-sm text-red-800">
                    Deleting data is permanent and cannot be undone. Please make
                    sure you have exported any important data before proceeding.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => confirmDelete("entries")}
                disabled={deleteLoading || moodEntries.length === 0}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaTrash className="text-sm" />
                <span>Delete All Mood Entries ({moodEntries.length})</span>
              </button>

              <button
                onClick={() => confirmDelete("all")}
                disabled={deleteLoading}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaTrash className="text-sm" />
                <span>Delete All Mood Data (Including Analytics)</span>
              </button>
            </div>
          </div>

          {/* Deletion Information */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                What will be deleted?
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FaTrash className="text-gray-400 text-xs" />
                  <span>All mood tracking entries</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaTrash className="text-gray-400 text-xs" />
                  <span>Mood analytics and insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaTrash className="text-gray-400 text-xs" />
                  <span>AI analysis results</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaTrash className="text-gray-400 text-xs" />
                  <span>Mood goals and progress</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                Before you delete:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Export your data if you want to keep it</li>
                <li>• Consider if you really need to delete everything</li>
                <li>• This action cannot be undone</li>
                <li>• You can start fresh after deletion</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Privacy Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <div className="flex items-center space-x-3 mb-4">
          <FaShieldAlt className="text-2xl text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Data Privacy</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-1">
                Your Data Rights
              </h4>
              <p className="text-sm text-green-800">
                You have full control over your mood tracking data. You can
                export, delete, or manage your data at any time.
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">Data Security</h4>
              <p className="text-sm text-blue-800">
                Your mood data is encrypted and stored securely. Only you and
                authorized healthcare providers can access your information.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-1">Data Usage</h4>
              <p className="text-sm text-purple-800">
                Your data is used to provide personalized insights and improve
                your mental health tracking experience.
              </p>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-1">
                Backup Recommendation
              </h4>
              <p className="text-sm text-yellow-800">
                Consider exporting your data regularly as a backup, especially
                before making significant changes.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      {/* AI Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FaBrain className="text-2xl text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              AI Analysis Insights
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            {aiAnalysisLoading && (
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Updating analysis...</span>
              </div>
            )}
            <button
              onClick={async () => {
                try {
                  setAiAnalysisLoading(true);
                  const latestAnalysis =
                    await moodTrackingService.getLatestAIAnalysis(userData._id);
                  if (latestAnalysis.analysis) {
                    setAiAnalysis(latestAnalysis.analysis);
                    setLastAnalysisCheck(
                      new Date(
                        latestAnalysis.analysis.analysisDate
                      ).toISOString()
                    );
                    toast.success("AI analysis refreshed!");
                  }
                } catch (error) {
                  toast.error("Failed to refresh AI analysis");
                } finally {
                  setAiAnalysisLoading(false);
                }
              }}
              disabled={aiAnalysisLoading}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Refresh
            </button>
          </div>
        </div>

        {aiAnalysis ? (
          <>
            {aiAnalysis.moodTrend && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Mood Trend</h4>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(aiAnalysis.moodTrend.direction)}
                  <span className="capitalize font-medium">
                    {aiAnalysis.moodTrend.direction}
                  </span>
                  <span className="text-sm text-gray-600">
                    (Confidence:{" "}
                    {(aiAnalysis.moodTrend.confidence * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            )}

            {aiAnalysis.recommendations?.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  AI Recommendations
                </h4>
                <div className="space-y-2">
                  {aiAnalysis.recommendations.slice(0, 3).map((rec, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{rec.title}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            rec.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : rec.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aiAnalysis.insights && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(aiAnalysis.insights).map(([key, value]) => (
                    <div key={key} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="text-sm text-gray-600">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <FaBrain className="text-4xl text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No AI analysis available yet</p>
            <p className="text-sm text-gray-500">
              {aiAnalysisLoading
                ? "Analysis in progress..."
                : "Add more mood entries to get AI insights"}
            </p>
          </div>
        )}
      </motion.div>

      {/* Generated Insights */}
      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 shadow-sm border"
        >
          <div className="flex items-center space-x-3 mb-4">
            <FaLightbulb className="text-2xl text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Mood Insights
            </h3>
          </div>

          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  insight.priority === "high"
                    ? "bg-red-50 border-red-500"
                    : insight.priority === "medium"
                    ? "bg-yellow-50 border-yellow-500"
                    : "bg-green-50 border-green-500"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      insight.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : insight.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {insight.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{insight.description}</p>
                <div className="mt-2">
                  <span className="text-xs text-gray-500 capitalize">
                    {insight.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 shadow-sm border"
        >
          <div className="flex items-center space-x-3 mb-4">
            <FaBullseye className="text-2xl text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Personalized Recommendations
            </h3>
          </div>

          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  rec.priority === "high"
                    ? "bg-red-50 border-red-500"
                    : rec.priority === "medium"
                    ? "bg-yellow-50 border-yellow-500"
                    : "bg-green-50 border-green-500"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{rec.title}</h4>
                  <div className="flex items-center space-x-2">
                    {rec.actionable && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Actionable
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rec.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : rec.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 capitalize">
                    {rec.category}
                  </span>
                  {rec.actionable && (
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      Take Action →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Manual Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg p-6 shadow-sm border"
      >
        <div className="flex items-center space-x-3 mb-4">
          <FaChartLine className="text-2xl text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Mood Summary</h3>
        </div>

        <div className="space-y-4">
          {analytics?.basicStats && (
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-gray-900 mb-2">
                Your Mood Range
              </h4>
              <p className="text-sm text-gray-600">
                Your mood has ranged from {analytics.basicStats.minScore} to{" "}
                {analytics.basicStats.maxScore} over the last {currentPeriod}{" "}
                days, with an average of{" "}
                {analytics.basicStats.averageScore.toFixed(1)}.
              </p>
            </div>
          )}

          {analytics?.trend && (
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-gray-900 mb-2">Trend Analysis</h4>
              <p className="text-sm text-gray-600">
                Your mood trend is currently{" "}
                <span className="font-medium capitalize">
                  {analytics.trend}
                </span>
                .{analytics.trend === "improving" && " Keep up the great work!"}
                {analytics.trend === "declining" &&
                  " Consider reaching out for support."}
                {analytics.trend === "stable" &&
                  " Your mood has been consistent."}
              </p>
            </div>
          )}

          {analytics?.activityCorrelation &&
            Object.keys(analytics.activityCorrelation).length > 0 && (
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-medium text-gray-900 mb-2">
                  Activity Impact
                </h4>
                <p className="text-sm text-gray-600">
                  Your highest mood scores are associated with{" "}
                  <span className="font-medium">
                    {Object.entries(analytics.activityCorrelation)
                      .sort(([, a], [, b]) => b - a)[0][0]
                      .replace("_", " ")}
                  </span>{" "}
                  activities. Consider incorporating more of these into your
                  routine.
                </p>
              </div>
            )}

          {analytics?.moodStability && (
            <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
              <h4 className="font-medium text-gray-900 mb-2">Mood Stability</h4>
              <p className="text-sm text-gray-600">
                Your mood stability score is{" "}
                {(analytics.moodStability * 100).toFixed(0)}%.
                {analytics.moodStability > 0.8 &&
                  " This indicates good emotional regulation."}
                {analytics.moodStability < 0.5 &&
                  " Consider strategies to stabilize your mood."}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    switch (selectedView) {
      case "overview":
        return renderOverview();
      case "trends":
        return renderTrends();
      case "patterns":
        return renderPatterns();
      case "goals":
        return renderGoals();
      case "insights":
        return renderInsights();
      case "data":
        return renderDataManagement();
      default:
        return renderOverview();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your mood dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mood Dashboard
          </h1>
          <p className="text-gray-600">
            Track your emotional well-being and discover patterns in your mood
          </p>
        </div>

        {/* Period Selector */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm border">
            {["7", "30", "90", "365"].map((period) => (
              <button
                key={period}
                onClick={() => setCurrentPeriod(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPeriod === period
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {period === "7"
                  ? "Week"
                  : period === "30"
                  ? "Month"
                  : period === "90"
                  ? "Quarter"
                  : "Year"}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex items-center space-x-1 bg-white rounded-lg p-1 shadow-sm border">
            {[
              { id: "overview", label: "Overview", icon: FaChartLine },
              { id: "trends", label: "Trends", icon: FaArrowUp },
              { id: "patterns", label: "Patterns", icon: FaClock },
              { id: "goals", label: "Goals", icon: FaBullseye },
              { id: "insights", label: "Insights", icon: FaLightbulb },
              { id: "data", label: "Data", icon: FaShieldAlt },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === tab.id
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="text-sm" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        {renderContent()}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaExclamationTriangle className="text-2xl text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                Confirm Deletion
              </h3>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                {deleteType === "entries"
                  ? "Are you sure you want to delete all your mood entries? This action cannot be undone."
                  : "Are you sure you want to delete ALL your mood tracking data including analytics, insights, and goals? This action cannot be undone."}
              </p>

              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-start space-x-2">
                  <FaExclamationTriangle className="text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900 mb-1">Warning</h4>
                    <p className="text-sm text-red-800">
                      This action is permanent and cannot be undone. Make sure
                      you have exported any important data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteType("");
                }}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMoodData(deleteType)}
                disabled={deleteLoading}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {deleteLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Deleting...</span>
                  </div>
                ) : (
                  "Delete Permanently"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MoodDashboard;
