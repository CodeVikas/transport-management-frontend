import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Trash2,
  Clock,
} from "lucide-react";

const NotificationPage = () => {
  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Delivery Completed",
      message: "Your delivery to Mumbai has been successfully completed.",
      type: "success",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "New Booking Request",
      message: "You have a new booking request for tomorrow.",
      type: "info",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "Payment Received",
      message: "Payment of ₹5,000 has been received for booking #12345.",
      type: "success",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      title: "Delivery Delay",
      message: "Your delivery to Delhi is delayed due to weather conditions.",
      type: "warning",
      time: "2 days ago",
      read: true,
    },
    {
      id: 5,
      title: "Account Update",
      message: "Your account details have been updated successfully.",
      type: "info",
      time: "1 week ago",
      read: true,
    },
  ]);

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  // Get the appropriate icon for each notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={18} />;
      case "warning":
        return <AlertTriangle className="text-yellow-500" size={18} />;
      case "info":
      default:
        return <Info className="text-blue-500" size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <Bell size={20} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          </div>
          <button
            onClick={clearAll}
            className="flex items-center text-sm text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} className="mr-1" />
            Clear All
          </button>
        </div>

        {/* Notification List */}
        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              No notifications
            </h3>
            <p className="text-gray-500 mt-1">
              You currently have no notifications.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.read ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center text-xs text-gray-400 mt-2">
                          <Clock size={12} className="mr-1" />
                          {notification.time}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
