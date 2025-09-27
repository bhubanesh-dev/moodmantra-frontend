import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import notificationService from "../services/notificationService";
import {
  FaBell,
  FaTimes,
  FaCheck,
  FaClock,
  FaTrash,
  FaCog,
  FaEye,
  FaEyeSlash,
  FaFilter,
  FaSearch,
  FaEllipsisV,
  FaExclamationTriangle,
  FaTrophy,
  FaChartLine,
  FaBullseye,
  FaFire,
  FaRobot,
  FaShieldAlt,
} from "react-icons/fa";

const NotificationBell = () => {
  const { userData } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // all, unread, urgent
  const [searchTerm, setSearchTerm] = useState("");
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    moodReminders: true,
    weeklyInsights: true,
    crisisAlerts: true,
    therapistNotifications: false,
  });

  useEffect(() => {
    if (userData?._id) {
      loadNotifications();
      loadPreferences();
    }
  }, [userData]);

  useEffect(() => {
    // Refresh notifications every 2 minutes when component is mounted
    const interval = setInterval(() => {
      if (userData?._id) {
        loadNotifications();
      }
    }, 120000); // 2 minutes instead of 30 seconds

    return () => clearInterval(interval);
  }, [userData]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getUserNotifications(
        userData._id,
        {
          limit: 50,
          unreadOnly: false,
        }
      );

      const transformedNotifications =
        notificationService.transformNotificationList(
          response.data.notifications
        );

      setNotifications(transformedNotifications);
      setUnreadCount(
        notificationService.getUnreadNotifications(transformedNotifications)
          .length
      );
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadPreferences = async () => {
    try {
      const response = await notificationService.getNotificationPreferences(
        userData._id
      );
      setPreferences(response.data.notificationPreferences);
    } catch (error) {
      console.error("Error loading preferences:", error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markNotificationAsRead(
        userData._id,
        notificationId
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true, readAt: new Date() }
            : notification
        )
      );

      setUnreadCount((prev) => Math.max(0, prev - 1));
      toast.success("Notification marked as read");
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllNotificationsAsRead(userData._id);

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
          readAt: new Date(),
        }))
      );

      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all notifications as read");
    }
  };

  const snoozeNotification = async (notificationId, minutes = 30) => {
    try {
      await notificationService.snoozeNotification(
        userData._id,
        notificationId,
        minutes
      );

      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );

      setUnreadCount((prev) => Math.max(0, prev - 1));
      toast.success(`Notification snoozed for ${minutes} minutes`);
    } catch (error) {
      toast.error("Failed to snooze notification");
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await notificationService.deleteNotification(
        userData._id,
        notificationId
      );

      const notification = notifications.find((n) => n.id === notificationId);
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));

      if (!notification.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  const updatePreferences = async (newPreferences) => {
    try {
      await notificationService.updateNotificationPreferences(
        userData._id,
        newPreferences
      );
      setPreferences(newPreferences);
      setShowPreferences(false);
      toast.success("Notification preferences updated");
    } catch (error) {
      toast.error("Failed to update preferences");
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      mood_reminder: <FaBell className="text-blue-500" />,
      weekly_insights: <FaChartLine className="text-green-500" />,
      crisis_alert: <FaExclamationTriangle className="text-red-500" />,
      goal_progress: <FaBullseye className="text-purple-500" />,
      goal_achievement: <FaTrophy className="text-yellow-500" />,
      ai_analysis_ready: <FaRobot className="text-indigo-500" />,
      streak_milestone: <FaFire className="text-orange-500" />,
      pattern_detected: <FaShieldAlt className="text-teal-500" />,
    };
    return icons[type] || <FaBell className="text-gray-500" />;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "border-l-gray-400",
      medium: "border-l-blue-400",
      high: "border-l-orange-400",
      urgent: "border-l-red-400",
    };
    return colors[priority] || colors.medium;
  };

  const filteredNotifications = notifications.filter((notification) => {
    // Apply filter
    if (filter === "unread" && notification.isRead) return false;
    if (
      filter === "urgent" &&
      !["high", "urgent"].includes(notification.priority)
    )
      return false;

    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        notification.title.toLowerCase().includes(searchLower) ||
        notification.message.toLowerCase().includes(searchLower) ||
        notification.type.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const groupedNotifications = notificationService.groupNotificationsByDate(
    filteredNotifications
  );

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
      >
        <FaBell className="text-xl" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.div>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notifications
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowPreferences(!showPreferences)}
                    className="p-1 text-gray-500 hover:text-gray-700 rounded"
                  >
                    <FaCog className="text-sm" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-gray-500 hover:text-gray-700 rounded"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="space-y-2">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="unread">Unread</option>
                    <option value="urgent">Urgent</option>
                  </select>

                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2">Loading notifications...</p>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <FaBell className="text-3xl mx-auto mb-2 text-gray-300" />
                  <p>No notifications found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {groupedNotifications.map((group) => (
                    <div key={group.date}>
                      <div className="px-4 py-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {group.date}
                      </div>
                      {group.notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(
                            notification.priority
                          )} ${!notification.isRead ? "bg-blue-50" : ""}`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p
                                  className={`text-sm font-medium ${
                                    !notification.isRead
                                      ? "text-gray-900"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                <div className="flex items-center space-x-1">
                                  <span className="text-xs text-gray-500">
                                    {notification.timeAgo}
                                  </span>
                                  <div className="relative group">
                                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                                      <FaEllipsisV className="text-xs" />
                                    </button>
                                    <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                      <div className="py-1">
                                        {!notification.isRead && (
                                          <button
                                            onClick={() =>
                                              markAsRead(notification.id)
                                            }
                                            className="flex items-center w-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                          >
                                            <FaCheck className="mr-2 text-xs" />
                                            Mark as read
                                          </button>
                                        )}
                                        <button
                                          onClick={() =>
                                            snoozeNotification(notification.id)
                                          }
                                          className="flex items-center w-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                          <FaClock className="mr-2 text-xs" />
                                          Snooze 30m
                                        </button>
                                        <button
                                          onClick={() =>
                                            deleteNotification(notification.id)
                                          }
                                          className="flex items-center w-full px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                                        >
                                          <FaTrash className="mr-2 text-xs" />
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>

                              {notification.data?.actionType && (
                                <div className="mt-2">
                                  <button
                                    onClick={() => {
                                      // Handle notification action
                                      const url =
                                        notificationService.getNotificationActionUrl(
                                          notification.type,
                                          notification.data
                                        );
                                      window.location.href = url;
                                      markAsRead(notification.id);
                                      setIsOpen(false);
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                  >
                                    {notificationService.getNotificationActionText(
                                      notification.type
                                    )}{" "}
                                    →
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  {filteredNotifications.length} notification
                  {filteredNotifications.length !== 1 ? "s" : ""}
                </span>
                <button
                  onClick={() => {
                    // Navigate to full notifications page
                    window.location.href = "/notifications";
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={() => setShowPreferences(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-96 max-w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notification Preferences
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                {Object.entries(preferences).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {key === "moodReminders" &&
                          "Daily reminders to track your mood"}
                        {key === "weeklyInsights" &&
                          "Weekly mood analysis and insights"}
                        {key === "crisisAlerts" &&
                          "Alerts for concerning mood patterns"}
                        {key === "therapistNotifications" &&
                          "Share notifications with your therapist"}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newPreferences = {
                          ...preferences,
                          [key]: !value,
                        };
                        setPreferences(newPreferences);
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updatePreferences(preferences)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
