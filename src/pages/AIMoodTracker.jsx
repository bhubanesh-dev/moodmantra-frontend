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
} from "react-icons/fa";
import { GiMeditation, GiHealthNormal } from "react-icons/gi";

const AIMoodTracker = () => {
  const { userData, token } = useContext(AppContext);
  const [currentView, setCurrentView] = useState("track"); // track, analytics, goals, createGoal, settings
  const [moodData, setMoodData] = useState({
    score: 3,
    label: "neutral",
    activities: [],
    textFeedback: "",
    stressLevel: 5,
    energyLevel: 5,
    socialInteraction: 5,
    sleepHours: 8,
  });
  const [goalData, setGoalData] = useState({
    title: "",
    description: "",
    targetMoodScore: 4,
    targetFrequency: "daily",
    endDate: "",
  });
  const [analytics, setAnalytics] = useState(null);
  const [moodEntries, setMoodEntries] = useState([]);
  const [goals, setGoals] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const moodOptions = [
    {
      label: "very_happy",
      icon: <FaSmile />,
      color: "text-green-500",
      bg: "bg-green-100",
    },
    {
      label: "happy",
      icon: <FaSmile />,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      label: "neutral",
      icon: <FaMeh />,
      color: "text-yellow-500",
      bg: "bg-yellow-100",
    },
    {
      label: "sad",
      icon: <FaFrown />,
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
    {
      label: "very_sad",
      icon: <FaFrown />,
      color: "text-red-500",
      bg: "bg-red-100",
    },
    {
      label: "anxious",
      icon: <GiHealthNormal />,
      color: "text-purple-500",
      bg: "bg-purple-100",
    },
    {
      label: "stressed",
      icon: <FaBrain />,
      color: "text-indigo-500",
      bg: "bg-indigo-100",
    },
    {
      label: "excited",
      icon: <FaHeart />,
      color: "text-pink-500",
      bg: "bg-pink-100",
    },
    {
      label: "calm",
      icon: <GiMeditation />,
      color: "text-teal-500",
      bg: "bg-teal-100",
    },
    {
      label: "angry",
      icon: <FaTimes />,
      color: "text-red-600",
      bg: "bg-red-200",
    },
  ];

  const activityOptions = [
    { value: "exercise", label: "Exercise", icon: "🏃‍♂️" },
    { value: "work", label: "Work", icon: "💼" },
    { value: "social", label: "Social", icon: "👥" },
    { value: "sleep", label: "Sleep", icon: "😴" },
    { value: "eating", label: "Eating", icon: "🍽️" },
    { value: "hobby", label: "Hobby", icon: "🎨" },
    { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
    { value: "travel", label: "Travel", icon: "✈️" },
    { value: "study", label: "Study", icon: "📚" },
    { value: "other", label: "Other", icon: "✨" },
  ];

  useEffect(() => {
    if (userData?._id) {
      loadUserData();
    }
  }, [userData]);

  const loadUserData = async () => {
    if (!userData?._id) return;

    try {
      setLoading(true);

      // First, get user preferences from backend
      const preferencesResponse =
        await moodTrackingService.getMoodTrackingPreferences(userData._id);
      const preferencesData = preferencesResponse.moodTracking;
      setPreferences(preferencesData);

      // Only proceed if mood tracking is enabled
      if (!preferencesData?.enabled) {
        setLoading(false);
        return; // Don't show error, just return to show enable button
      }

      // Load mood entries
      const entriesData = await moodTrackingService.getMoodEntries(
        userData._id
      );
      setMoodEntries(entriesData.moodEntries);

      // Load analytics
      const analyticsData = await moodTrackingService.getMoodAnalytics(
        userData._id,
        "30"
      );
      setAnalytics(analyticsData.analytics);

      // Load goals
      const goalsData = await moodTrackingService.getMoodGoals(userData._id);
      setGoals(goalsData.moodGoals);

      // Load AI analysis only if consent is given
      if (preferencesData?.aiAnalysisConsent) {
        try {
          const aiData = await moodTrackingService.getAIAnalysis(
            userData._id,
            "weekly"
          );
          setAiAnalysis(aiData.analysisResults[0]);
        } catch (aiError) {
          console.warn("AI analysis not available:", aiError.message);
          // Don't show error toast for AI analysis - it's optional
        }
      }
    } catch (error) {
      toast.error("Failed to load mood data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserPreferences = async () => {
    // This would typically come from user profile
    // For now, return default preferences
    return {
      enabled: false, // Default to false - will be updated from backend
      frequency: "daily",
      aiAnalysisConsent: false, // Default to false for privacy
      aiAnalysisLevel: "basic",
      privacySettings: {
        shareWithTherapist: false,
        shareWithFamily: false,
        anonymousDataSharing: false,
      },
      notificationPreferences: {
        moodReminders: true,
        weeklyInsights: true,
        crisisAlerts: true,
        therapistNotifications: false,
      },
    };
  };

  const enableMoodTracking = async () => {
    if (!userData?._id) {
      toast.error("Please log in to enable mood tracking");
      return;
    }

    try {
      setLoading(true);
      await moodTrackingService.enableMoodTracking(userData._id);
      toast.success("Mood tracking enabled successfully!");

      // Reload data with new preferences
      await loadUserData();
    } catch (error) {
      toast.error("Failed to enable mood tracking");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSetting = async (setting) => {
    if (!userData?._id) {
      toast.error("Please log in to update settings");
      return;
    }

    try {
      setLoading(true);
      const newValue = !preferences[setting];

      const updatedPreferences = {
        ...preferences,
        [setting]: newValue,
      };

      await moodTrackingService.updateMoodTrackingPreferences(
        userData._id,
        updatedPreferences
      );

      toast.success(
        `${setting === "enabled" ? "Mood tracking" : "AI analysis"} ${
          newValue ? "enabled" : "disabled"
        } successfully!`
      );

      // Reload data with new preferences
      await loadUserData();
    } catch (error) {
      toast.error("Failed to update settings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleNotification = async (notification) => {
    if (!userData?._id) {
      toast.error("Please log in to update settings");
      return;
    }

    try {
      setLoading(true);
      const newValue = !preferences.notificationPreferences[notification];

      const updatedPreferences = {
        ...preferences,
        notificationPreferences: {
          ...preferences.notificationPreferences,
          [notification]: newValue,
        },
      };

      await moodTrackingService.updateMoodTrackingPreferences(
        userData._id,
        updatedPreferences
      );

      toast.success(
        `${notification} ${newValue ? "enabled" : "disabled"} successfully!`
      );

      // Reload data with new preferences
      await loadUserData();
    } catch (error) {
      toast.error("Failed to update settings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodSelect = (moodLabel) => {
    const moodOption = moodOptions.find((option) => option.label === moodLabel);
    // Map 10 mood options to 1-5 scale
    const moodIndex = moodOptions.findIndex(
      (option) => option.label === moodLabel
    );
    const score = Math.ceil((moodIndex + 1) / 2); // This maps 1-2->1, 3-4->2, 5-6->3, 7-8->4, 9-10->5
    setMoodData((prev) => ({
      ...prev,
      label: moodLabel,
      score: score,
    }));
  };

  const handleActivityToggle = (activity) => {
    setMoodData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

 const handleSubmitMood = async () => {
  if (!userData?._id) {
    toast.error("Please log in to track your mood");
    return;
  }

  // Check if mood tracking is enabled
  if (!preferences?.enabled) {
    toast.error("Mood tracking is not enabled. Please enable it in settings.");
    return;
  }

  try {
    setLoading(true);
    const formattedData = moodTrackingService.formatMoodEntry(moodData);
    await moodTrackingService.addMoodEntry(userData._id, formattedData);

    toast.success("Mood entry saved successfully!");

    // Reset form
    setMoodData({
      score: 3,
      label: "neutral",
      activities: [],
      textFeedback: "",
      stressLevel: 5,
      energyLevel: 5,
      socialInteraction: 5,
      sleepHours: 8,
    });

    // Scroll to top after submission
    window.scrollTo({
      top: 0,
      behavior: "smooth" // for smooth scrolling
    });

    // Reload data
    await loadUserData();
  } catch (error) {
    toast.error("Failed to save mood entry");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const handleCreateGoal = async () => {
    if (!userData?._id) {
      toast.error("Please log in to create a goal");
      return;
    }

    if (!goalData.title || !goalData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const formattedGoalData = moodTrackingService.formatGoalData(goalData);
      await moodTrackingService.createMoodGoal(userData._id, formattedGoalData);

      toast.success("Goal created successfully!");

      // Reset form
      setGoalData({
        title: "",
        description: "",
        targetMoodScore: 4,
        targetFrequency: "daily",
        endDate: "",
      });

      // Go back to goals view and reload data
      setCurrentView("goals");
      await loadUserData();
    } catch (error) {
      toast.error("Failed to create goal");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderMoodTracking = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Mood Selection */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          How are you feeling today?
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {moodOptions.map((mood) => (
            <motion.button
              key={mood.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelect(mood.label)}
              className={`p-4 rounded-lg border-2 transition-all ${
                moodData.label === mood.label
                  ? `${mood.bg} border-${mood.color.split("-")[1]}-500`
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className={`text-2xl mb-2 ${mood.color}`}>{mood.icon}</div>
              <div className="text-xs text-gray-600 capitalize">
                {mood.label.replace("_", " ")}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          What have you been doing?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {activityOptions.map((activity) => (
            <motion.button
              key={activity.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleActivityToggle(activity.value)}
              className={`p-3 rounded-lg border-2 transition-all ${
                moodData.activities.includes(activity.value)
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-lg mb-1">{activity.icon}</div>
              <div className="text-xs text-gray-600">{activity.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Additional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stress Level (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={moodData.stressLevel}
              onChange={(e) =>
                setMoodData((prev) => ({
                  ...prev,
                  stressLevel: parseInt(e.target.value),
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center text-sm text-gray-600 mt-1">
              {moodData.stressLevel}/10
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Energy Level (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={moodData.energyLevel}
              onChange={(e) =>
                setMoodData((prev) => ({
                  ...prev,
                  energyLevel: parseInt(e.target.value),
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center text-sm text-gray-600 mt-1">
              {moodData.energyLevel}/10
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Social Interaction (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={moodData.socialInteraction}
              onChange={(e) =>
                setMoodData((prev) => ({
                  ...prev,
                  socialInteraction: parseInt(e.target.value),
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center text-sm text-gray-600 mt-1">
              {moodData.socialInteraction}/10
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sleep Hours
            </label>
            <input
              type="number"
              min="0"
              max="24"
              value={moodData.sleepHours}
              onChange={(e) =>
                setMoodData((prev) => ({
                  ...prev,
                  sleepHours: parseFloat(e.target.value),
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Text Feedback */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Additional Notes (Optional)
        </h3>
        <textarea
          value={moodData.textFeedback}
          onChange={(e) =>
            setMoodData((prev) => ({ ...prev, textFeedback: e.target.value }))
          }
          placeholder="How was your day? Any specific thoughts or feelings you'd like to share?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="4"
          maxLength="1000"
        />
        <div className="text-right text-sm text-gray-500 mt-2">
          {moodData.textFeedback.length}/1000
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmitMood}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Mood Entry"}
      </motion.button>
    </motion.div>
  );

  const renderAnalytics = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {analytics ? (
        <>
          {/* Basic Stats */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Your Mood Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {analytics.basicStats?.averageScore || "N/A"}
                </div>
                <div className="text-sm text-gray-600">Average Mood</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {analytics.basicStats?.totalEntries || 0}
                </div>
                <div className="text-sm text-gray-600">Total Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 capitalize">
                  {analytics.trend || "N/A"}
                </div>
                <div className="text-sm text-gray-600">Trend</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {analytics.basicStats?.minScore || "N/A"}
                </div>
                <div className="text-sm text-gray-600">Lowest Mood</div>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          {aiAnalysis && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaBrain className="mr-2 text-purple-600" />
                AI Insights
              </h3>
              <div className="space-y-4">
                {aiAnalysis.recommendations?.map((rec, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-800">
                      {rec.title}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {rec.description}
                    </div>
                    <div className="flex items-center mt-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          rec.priority === "urgent"
                            ? "bg-red-100 text-red-800"
                            : rec.priority === "high"
                            ? "bg-orange-100 text-orange-800"
                            : rec.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {rec.priority} priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-gray-500">
            No mood data available yet. Start tracking your mood to see
            insights!
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderGoals = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <FaBullseye className="mr-2 text-green-600" />
            Your Mood Goals
          </h3>
          <button
            onClick={() => setCurrentView("createGoal")}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <FaPlus className="text-sm" />
            <span>New Goal</span>
          </button>
        </div>
        {goals.length > 0 ? (
          <div className="space-y-4">
            {goals.map((goal) => (
              <div
                key={goal._id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="font-semibold text-gray-800">{goal.title}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {goal.description}
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      Progress: {goal.progress?.currentStreak || 0} day streak
                    </span>
                    <span>Target: {goal.targetMoodScore}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (goal.progress?.successRate || 0) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaBullseye className="text-4xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No goals set yet</p>
            <p className="text-sm text-gray-500 mb-6">
              Create your first mood goal to track your progress and stay
              motivated!
            </p>
            <button
              onClick={() => setCurrentView("createGoal")}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Create Your First Goal
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderCreateGoal = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <FaBullseye className="mr-2 text-green-600" />
            Create New Mood Goal
          </h3>
          <button
            onClick={() => setCurrentView("goals")}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Goal Title *
            </label>
            <input
              type="text"
              value={goalData.title}
              onChange={(e) =>
                setGoalData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="e.g., Improve my daily mood"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={goalData.description}
              onChange={(e) =>
                setGoalData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe what you want to achieve..."
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Mood Score
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={goalData.targetMoodScore}
              onChange={(e) =>
                setGoalData((prev) => ({
                  ...prev,
                  targetMoodScore: parseInt(e.target.value),
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center text-sm text-gray-600 mt-1">
              Target: {goalData.targetMoodScore}/5
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency
            </label>
            <select
              value={goalData.targetFrequency}
              onChange={(e) =>
                setGoalData((prev) => ({
                  ...prev,
                  targetFrequency: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date (Optional)
            </label>
            <input
              type="date"
              value={goalData.endDate}
              onChange={(e) =>
                setGoalData((prev) => ({ ...prev, endDate: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleCreateGoal}
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Goal"}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <FaCog className="mr-2 text-gray-600" />
          Mood Tracking Settings
        </h3>
        {preferences && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">
                  Enable Mood Tracking
                </div>
                <div className="text-sm text-gray-600">
                  Track your daily mood and activities
                </div>
              </div>
              <button
                onClick={() => handleToggleSetting("enabled")}
                disabled={loading}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.enabled ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.enabled
                      ? "transform translate-x-6"
                      : "transform translate-x-1"
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">AI Analysis</div>
                <div className="text-sm text-gray-600">
                  Get personalized insights and recommendations
                </div>
              </div>
              <button
                onClick={() => handleToggleSetting("aiAnalysisConsent")}
                disabled={loading || !preferences.enabled}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.aiAnalysisConsent ? "bg-blue-500" : "bg-gray-300"
                } ${!preferences.enabled ? "opacity-50" : ""}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.aiAnalysisConsent
                      ? "transform translate-x-6"
                      : "transform translate-x-1"
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">Mood Reminders</div>
                <div className="text-sm text-gray-600">
                  Get daily reminders to track your mood
                </div>
              </div>
              <button
                onClick={() => handleToggleNotification("moodReminders")}
                disabled={loading || !preferences.enabled}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.notificationPreferences?.moodReminders
                    ? "bg-blue-500"
                    : "bg-gray-300"
                } ${!preferences.enabled ? "opacity-50" : ""}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.notificationPreferences?.moodReminders
                      ? "transform translate-x-6"
                      : "transform translate-x-1"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderNavigation = () => (
    <div className="bg-white rounded-xl p-4 shadow-lg mb-6">
      <div className="flex space-x-2">
        {[
          { key: "track", label: "Track Mood", icon: <FaPlus /> },
          { key: "analytics", label: "Analytics", icon: <FaChartLine /> },
          { key: "goals", label: "Goals", icon: <FaBullseye /> },
          { key: "settings", label: "Settings", icon: <FaCog /> },
        ].map((item) => (
          <motion.button
            key={item.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentView(item.key)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
              currentView === item.key
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {item.icon}
            <span className="hidden sm:inline">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">😊</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to Mood Tracker
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to start tracking your mood and get personalized
            insights.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Mood Tracker
          </h1>
          <p className="text-gray-600">
            Track your daily mood and get AI-powered insights
          </p>
        </motion.div>

        {/* Navigation */}
        {renderNavigation()}

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : !preferences?.enabled ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-8 shadow-lg text-center"
          >
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Mood Tracking is Disabled
            </h2>
            <p className="text-gray-600 mb-6">
              To start tracking your mood and get personalized insights, you
              need to enable mood tracking first.
            </p>
            <button
              onClick={enableMoodTracking}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? "Enabling..." : "Enable Mood Tracking"}
            </button>
          </motion.div>
        ) : (
          <>
            {currentView === "track" && renderMoodTracking()}
            {currentView === "analytics" && renderAnalytics()}
            {currentView === "goals" && renderGoals()}
            {currentView === "createGoal" && renderCreateGoal()}
            {currentView === "settings" && renderSettings()}
          </>
        )}
      </div>
    </div>
  );
};

export default AIMoodTracker;
