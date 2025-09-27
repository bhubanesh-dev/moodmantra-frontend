import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

class MoodTrackingService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/api/mood-tracking`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // Mood Entry Methods
  async addMoodEntry(userId, moodData) {
    try {
      const response = await this.api.post(
        `/users/${userId}/mood-entries`,
        moodData
      );

      // Show notification about automatic AI analysis
      if (response.data.aiAnalysisTriggered) {
        console.log("AI analysis automatically triggered for new mood entry");
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMoodEntries(userId, params = {}) {
    try {
      const response = await this.api.get(`/users/${userId}/mood-entries`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Analytics Methods
  async getMoodAnalytics(userId, period = "30") {
    try {
      const response = await this.api.get(`/users/${userId}/mood-analytics`, {
        params: { period },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAIAnalysis(userId, analysisType = "weekly", limit = 10) {
    try {
      const response = await this.api.get(`/users/${userId}/ai-analysis`, {
        params: { analysisType, limit },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getLatestAIAnalysis(userId) {
    try {
      const response = await this.api.get(
        `/users/${userId}/latest-ai-analysis`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Preferences Methods
  async getMoodTrackingPreferences(userId) {
    try {
      const response = await this.api.get(`/users/${userId}/mood-preferences`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateMoodTrackingPreferences(userId, preferences) {
    try {
      const response = await this.api.put(
        `/users/${userId}/mood-preferences`,
        preferences
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Enable mood tracking for a user
  async enableMoodTracking(userId) {
    try {
      const preferences = {
        enabled: true,
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

      const response = await this.api.put(
        `/users/${userId}/mood-preferences`,
        preferences
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Goal Methods
  async createMoodGoal(userId, goalData) {
    try {
      const response = await this.api.post(
        `/users/${userId}/mood-goals`,
        goalData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMoodGoals(userId, active = true) {
    try {
      const response = await this.api.get(`/users/${userId}/mood-goals`, {
        params: { active },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Dashboard Methods
  async getMoodDashboard(userId, period = "30") {
    try {
      const response = await this.api.get(`/users/${userId}/mood-dashboard`, {
        params: { period },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMoodPatterns(userId, period = "30") {
    try {
      const response = await this.api.get(`/users/${userId}/mood-patterns`, {
        params: { period },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMoodInsights(userId, period = "30") {
    try {
      const response = await this.api.get(`/users/${userId}/mood-insights`, {
        params: { period },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Utility Methods
  handleError(error) {
    const message =
      error.response?.data?.message || error.message || "An error occurred";
    return new Error(message);
  }

  // Helper method to format mood data for API
  formatMoodEntry(moodData) {
    return {
      moodScore: moodData.score,
      moodLabel: moodData.label,
      activities: moodData.activities || [],
      textFeedback: moodData.textFeedback || "",
      location: moodData.location || null,
      weather: moodData.weather || null,
      sleepHours: moodData.sleepHours || null,
      stressLevel: moodData.stressLevel || null,
      energyLevel: moodData.energyLevel || null,
      socialInteraction: moodData.socialInteraction || null,
      tags: moodData.tags || [],
    };
  }

  // Helper method to format preferences for API
  formatPreferences(preferences) {
    return {
      enabled: preferences.enabled,
      frequency: preferences.frequency,
      reminderTimes: preferences.reminderTimes,
      aiAnalysisConsent: preferences.aiAnalysisConsent,
      aiAnalysisLevel: preferences.aiAnalysisLevel,
      privacySettings: {
        shareWithTherapist: preferences.shareWithTherapist,
        shareWithFamily: preferences.shareWithFamily,
        anonymousDataSharing: preferences.anonymousDataSharing,
      },
      notificationPreferences: {
        moodReminders: preferences.moodReminders,
        weeklyInsights: preferences.weeklyInsights,
        crisisAlerts: preferences.crisisAlerts,
        therapistNotifications: preferences.therapistNotifications,
      },
    };
  }

  // Helper method to format goal data for API
  formatGoalData(goalData) {
    return {
      title: goalData.title,
      description: goalData.description,
      targetMoodScore: goalData.targetMoodScore,
      targetFrequency: goalData.targetFrequency,
      endDate: goalData.endDate,
    };
  }

  // Data transformation methods for frontend consumption
  transformMoodEntry(entry) {
    return {
      id: entry._id,
      userId: entry.userId,
      timestamp: new Date(entry.timestamp),
      score: entry.moodScore,
      label: entry.moodLabel,
      activities: entry.activities,
      textFeedback: entry.textFeedback,
      location: entry.location,
      weather: entry.weather,
      sleepHours: entry.sleepHours,
      stressLevel: entry.stressLevel,
      energyLevel: entry.energyLevel,
      socialInteraction: entry.socialInteraction,
      tags: entry.tags,
      isPublic: entry.isPublic,
    };
  }

  transformAnalytics(analytics) {
    return {
      basicStats: analytics.basicStats,
      moodDistribution: analytics.moodDistribution,
      trend: analytics.trend,
      activityCorrelation: analytics.activityCorrelation,
      timePatterns: analytics.timePatterns,
    };
  }

  transformAIAnalysis(analysis) {
    return {
      id: analysis._id,
      userId: analysis.userId,
      analysisDate: new Date(analysis.analysisDate),
      analysisType: analysis.analysisType,
      moodTrend: analysis.moodTrend,
      patterns: analysis.patterns,
      recommendations: analysis.recommendations,
      insights: analysis.insights,
      riskAssessment: analysis.riskAssessment,
      metadata: analysis.metadata,
    };
  }

  transformGoal(goal) {
    return {
      id: goal._id,
      userId: goal.userId,
      title: goal.title,
      description: goal.description,
      targetMoodScore: goal.targetMoodScore,
      targetFrequency: goal.targetFrequency,
      startDate: new Date(goal.startDate),
      endDate: goal.endDate ? new Date(goal.endDate) : null,
      progress: goal.progress,
      isActive: goal.isActive,
      achievements: goal.achievements.map((achievement) => ({
        ...achievement,
        achievedAt: new Date(achievement.achievedAt),
      })),
    };
  }

  // Enhanced data transformation methods
  transformDashboardData(dashboardData) {
    return {
      analytics: this.transformAnalytics(dashboardData.analytics),
      aiAnalysis: dashboardData.aiAnalysis
        ? this.transformAIAnalysis(dashboardData.aiAnalysis)
        : null,
      goals: dashboardData.goals?.map((goal) => this.transformGoal(goal)) || [],
      insights: dashboardData.insights || [],
      recommendations: dashboardData.recommendations || [],
      dataPoints: dashboardData.dataPoints,
      period: dashboardData.period,
    };
  }

  transformPatterns(patterns) {
    return {
      daily: patterns.daily || {},
      weekly: patterns.weekly || {},
      monthly: patterns.monthly || {},
      seasonal: patterns.seasonal || {},
      triggers: patterns.triggers || {},
      improvements: patterns.improvements || {},
    };
  }

  transformInsights(insights) {
    return insights.map((insight) => ({
      ...insight,
      priority: insight.priority || "medium",
      category: insight.category || "general",
    }));
  }

  transformRecommendations(recommendations) {
    return recommendations.map((rec) => ({
      ...rec,
      priority: rec.priority || "medium",
      category: rec.category || "general",
      actionable: rec.actionable || false,
    }));
  }

  // Batch operations
  async addMultipleMoodEntries(userId, entries) {
    try {
      const promises = entries.map((entry) => this.addMoodEntry(userId, entry));
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Export data
  async exportMoodData(userId, format = "json") {
    try {
      const entries = await this.getMoodEntries(userId, { limit: 1000 });
      const analytics = await this.getMoodAnalytics(userId, "365");

      const exportData = {
        entries: entries.moodEntries,
        analytics: analytics.analytics,
        exportDate: new Date().toISOString(),
        format: format,
      };

      if (format === "csv") {
        return this.convertToCSV(exportData);
      }

      return exportData;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete data methods
  async deleteMoodEntries(userId) {
    try {
      const response = await this.api.delete(`/users/${userId}/mood-entries`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteAllMoodData(userId) {
    try {
      const response = await this.api.delete(`/users/${userId}/mood-data`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Convert data to CSV format
  convertToCSV(data) {
    // Implementation for CSV conversion
    // This would convert the mood entries to CSV format
    const headers = [
      "Date",
      "Mood Score",
      "Mood Label",
      "Activities",
      "Text Feedback",
    ];
    const rows = data.entries.map((entry) => [
      new Date(entry.timestamp).toISOString(),
      entry.moodScore,
      entry.moodLabel,
      entry.activities.join(", "),
      entry.textFeedback,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    return csvContent;
  }
}

// Create and export a singleton instance
const moodTrackingService = new MoodTrackingService();
export default moodTrackingService;
