import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

class NotificationService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/api/notifications`,
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

  // Get user notifications
  async getUserNotifications(userId, options = {}) {
    try {
      const response = await this.api.get(`/users/${userId}/notifications`, {
        params: options,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get notification statistics
  async getNotificationStats(userId) {
    try {
      const response = await this.api.get(
        `/users/${userId}/notification-stats`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get notification preferences
  async getNotificationPreferences(userId) {
    try {
      const response = await this.api.get(
        `/users/${userId}/notification-preferences`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update notification preferences
  async updateNotificationPreferences(userId, preferences) {
    try {
      const response = await this.api.put(
        `/users/${userId}/notification-preferences`,
        {
          notificationPreferences: preferences,
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Mark notification as read
  async markNotificationAsRead(userId, notificationId) {
    try {
      const response = await this.api.put(
        `/users/${userId}/notifications/${notificationId}/read`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Mark all notifications as read
  async markAllNotificationsAsRead(userId) {
    try {
      const response = await this.api.put(
        `/users/${userId}/notifications/read-all`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Snooze notification
  async snoozeNotification(userId, notificationId, minutes = 30) {
    try {
      const response = await this.api.put(
        `/users/${userId}/notifications/${notificationId}/snooze`,
        { minutes }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete notification
  async deleteNotification(userId, notificationId) {
    try {
      const response = await this.api.delete(
        `/users/${userId}/notifications/${notificationId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get notification history
  async getNotificationHistory(userId, filters = {}) {
    try {
      const response = await this.api.get(
        `/users/${userId}/notification-history`,
        {
          params: filters,
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Test notification (for development/testing)
  async testNotification(userId, notificationData = {}) {
    try {
      const response = await this.api.post(
        `/users/${userId}/test-notification`,
        notificationData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Trigger notification checks (for admin/testing)
  async triggerNotificationChecks(userId) {
    try {
      const response = await this.api.post(`/users/${userId}/trigger-checks`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handling
  handleError(error) {
    const message =
      error.response?.data?.message || error.message || "An error occurred";
    return new Error(message);
  }

  // Helper methods for frontend
  getNotificationIcon(type) {
    const icons = {
      mood_reminder: "🔔",
      weekly_insights: "📊",
      crisis_alert: "⚠️",
      goal_progress: "🎯",
      goal_achievement: "🏆",
      ai_analysis_ready: "🤖",
      streak_milestone: "🔥",
      pattern_detected: "🔍",
    };
    return icons[type] || "📢";
  }

  getNotificationColor(priority) {
    const colors = {
      low: "text-gray-600 bg-gray-50",
      medium: "text-blue-600 bg-blue-50",
      high: "text-orange-600 bg-orange-50",
      urgent: "text-red-600 bg-red-50",
    };
    return colors[priority] || colors.medium;
  }

  getNotificationBorderColor(priority) {
    const colors = {
      low: "border-gray-200",
      medium: "border-blue-200",
      high: "border-orange-200",
      urgent: "border-red-200",
    };
    return colors[priority] || colors.medium;
  }

  formatNotificationTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080)
      return `${Math.floor(diffInMinutes / 1440)}d ago`;

    return date.toLocaleDateString();
  }

  // Transform notification data for frontend consumption
  transformNotification(notification) {
    return {
      id: notification._id,
      userId: notification.userId,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      priority: notification.priority,
      category: notification.category,
      data: notification.data,
      scheduledFor: new Date(notification.scheduledFor),
      sentAt: notification.sentAt ? new Date(notification.sentAt) : null,
      readAt: notification.readAt ? new Date(notification.readAt) : null,
      actionTaken: notification.actionTaken,
      deliveryMethod: notification.deliveryMethod,
      status: notification.status,
      createdAt: new Date(notification.createdAt),
      updatedAt: new Date(notification.updatedAt),
      isRead: !!notification.readAt,
      isOverdue: notification.isOverdue,
      isActionable: notification.isActionable,
      icon: this.getNotificationIcon(notification.type),
      color: this.getNotificationColor(notification.priority),
      borderColor: this.getNotificationBorderColor(notification.priority),
      timeAgo: this.formatNotificationTime(notification.createdAt),
    };
  }

  // Transform notification list
  transformNotificationList(notifications) {
    return notifications.map((notification) =>
      this.transformNotification(notification)
    );
  }

  // Group notifications by date
  groupNotificationsByDate(notifications) {
    const groups = {};

    notifications.forEach((notification) => {
      const date = notification.createdAt.toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
    });

    return Object.entries(groups).map(([date, notifications]) => ({
      date,
      notifications,
      count: notifications.length,
    }));
  }

  // Filter notifications by type
  filterNotificationsByType(notifications, type) {
    return notifications.filter((notification) => notification.type === type);
  }

  // Filter notifications by priority
  filterNotificationsByPriority(notifications, priority) {
    return notifications.filter(
      (notification) => notification.priority === priority
    );
  }

  // Get unread notifications
  getUnreadNotifications(notifications) {
    return notifications.filter((notification) => !notification.isRead);
  }

  // Get actionable notifications
  getActionableNotifications(notifications) {
    return notifications.filter((notification) => notification.isActionable);
  }

  // Get urgent notifications
  getUrgentNotifications(notifications) {
    return notifications.filter(
      (notification) =>
        notification.priority === "urgent" || notification.priority === "high"
    );
  }

  // Check if user has unread notifications
  hasUnreadNotifications(notifications) {
    return notifications.some((notification) => !notification.isRead);
  }

  // Get notification count by type
  getNotificationCountByType(notifications) {
    const counts = {};
    notifications.forEach((notification) => {
      counts[notification.type] = (counts[notification.type] || 0) + 1;
    });
    return counts;
  }

  // Get notification count by priority
  getNotificationCountByPriority(notifications) {
    const counts = {};
    notifications.forEach((notification) => {
      counts[notification.priority] = (counts[notification.priority] || 0) + 1;
    });
    return counts;
  }

  // Create notification preferences object
  createNotificationPreferences(preferences = {}) {
    return {
      moodReminders: preferences.moodReminders ?? true,
      weeklyInsights: preferences.weeklyInsights ?? true,
      crisisAlerts: preferences.crisisAlerts ?? true,
      therapistNotifications: preferences.therapistNotifications ?? false,
    };
  }

  // Validate notification preferences
  validateNotificationPreferences(preferences) {
    const errors = [];

    if (typeof preferences.moodReminders !== "boolean") {
      errors.push("Mood reminders must be a boolean value");
    }

    if (typeof preferences.weeklyInsights !== "boolean") {
      errors.push("Weekly insights must be a boolean value");
    }

    if (typeof preferences.crisisAlerts !== "boolean") {
      errors.push("Crisis alerts must be a boolean value");
    }

    if (typeof preferences.therapistNotifications !== "boolean") {
      errors.push("Therapist notifications must be a boolean value");
    }

    return errors;
  }

  // Get notification action text
  getNotificationActionText(type) {
    const actions = {
      mood_reminder: "Track Mood",
      weekly_insights: "View Insights",
      crisis_alert: "Get Support",
      goal_progress: "View Goal",
      goal_achievement: "Celebrate",
      ai_analysis_ready: "View Analysis",
      streak_milestone: "View Streak",
      pattern_detected: "View Pattern",
    };
    return actions[type] || "View";
  }

  // Get notification action URL
  getNotificationActionUrl(type, data = {}) {
    const urls = {
      mood_reminder: "/mood-tracker",
      weekly_insights: "/mood-dashboard?tab=insights",
      crisis_alert: "/resources",
      goal_progress: "/mood-dashboard?tab=goals",
      goal_achievement: "/mood-dashboard?tab=goals",
      ai_analysis_ready: "/mood-dashboard?tab=insights",
      streak_milestone: "/mood-dashboard?tab=overview",
      pattern_detected: "/mood-dashboard?tab=patterns",
    };
    return urls[type] || "/mood-dashboard";
  }
}

// Create and export a singleton instance
const notificationService = new NotificationService();
export default notificationService;
