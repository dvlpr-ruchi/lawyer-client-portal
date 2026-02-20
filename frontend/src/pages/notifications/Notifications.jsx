import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  MessageSquare,
  FileText,
  CreditCard,
  Mail,
  Smartphone,
  Check,
  Trash2,
  Filter,
  Settings,
} from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    type: "booking",
    title: "Consultation Confirmed",
    message: "Your consultation with Adv. Raj Sharma is confirmed for 20 Feb at 4:00 PM.",
    channel: "email",
    read: false,
    time: "2 mins ago",
  },
  {
    id: 2,
    type: "message",
    title: "New Message from Lawyer",
    message: "Your lawyer has sent an update regarding your case documents.",
    channel: "sms",
    read: false,
    time: "10 mins ago",
  },
  {
    id: 3,
    type: "fir",
    title: "FIR Status Updated",
    message: "Your FIR request status has been changed to 'Under Review'.",
    channel: "email",
    read: true,
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "payment",
    title: "Payment Receipt Generated",
    message: "Payment of ₹1500 received. Receipt has been emailed.",
    channel: "email",
    read: true,
    time: "Yesterday",
  },
  {
    id: 5,
    type: "message",
    title: "Document Verification Complete",
    message: "All your submitted documents have been verified successfully.",
    channel: "email",
    read: true,
    time: "2 days ago",
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type) => {
    const iconClass = "w-5 h-5 sm:w-6 sm:h-6";
    switch (type) {
      case "booking":
        return <CheckCircle className={`${iconClass} text-green-600`} />;
      case "message":
        return <MessageSquare className={`${iconClass} text-blue-600`} />;
      case "fir":
        return <FileText className={`${iconClass} text-purple-600`} />;
      case "payment":
        return <CreditCard className={`${iconClass} text-orange-600`} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case "booking":
        return "bg-green-100";
      case "message":
        return "bg-blue-100";
      case "fir":
        return "bg-purple-100";
      case "payment":
        return "bg-orange-100";
      default:
        return "bg-gray-100";
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case "email":
        return <Mail size={14} className="text-gray-500" />;
      case "sms":
        return <Smartphone size={14} className="text-gray-500" />;
      case "whatsapp":
        return (
          <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  const filterOptions = [
    { value: "all", label: "All", count: notifications.length },
    { value: "booking", label: "Bookings", count: notifications.filter(n => n.type === "booking").length },
    { value: "message", label: "Messages", count: notifications.filter(n => n.type === "message").length },
    { value: "fir", label: "FIR", count: notifications.filter(n => n.type === "fir").length },
    { value: "payment", label: "Payments", count: notifications.filter(n => n.type === "payment").length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 rounded-2xl shadow-lg">
                <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Notifications
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Stay updated with your legal matters
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {unreadCount > 0 && (
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl shadow-lg">
                  <p className="text-xs font-medium">Unread</p>
                  <p className="text-xl font-bold">{unreadCount}</p>
                </div>
              )}
              
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-xl transition-colors text-sm font-medium"
                >
                  <Check size={16} />
                  <span className="hidden sm:inline">Mark all read</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8">
          {/* Filters */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={18} className="text-gray-600" />
              <h3 className="font-semibold text-gray-700">Filter by type</h3>
            </div>
            
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                    transition-all duration-200 whitespace-nowrap flex-shrink-0
                    ${
                      filter === option.value
                        ? "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg shadow-yellow-200 scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  <span>{option.label}</span>
                  <span className={`
                    text-xs px-2 py-0.5 rounded-full
                    ${filter === option.value ? "bg-white/20" : "bg-gray-200"}
                  `}>
                    {option.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notification List */}
          <div className="space-y-3 sm:space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                  group relative rounded-2xl border-2 p-4 sm:p-5 
                  transition-all duration-300 hover:shadow-lg
                  ${
                    !notification.read
                      ? "bg-gradient-to-r from-yellow-50 to-indigo-50 border-yellow-200 shadow-md"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                {/* Unread indicator */}
                {!notification.read && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-600 rounded-full animate-pulse"></div>
                )}

                <div className="flex gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className={`
                    flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                    flex items-center justify-center ${getIconBg(notification.type)}
                    shadow-sm
                  `}>
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className={`
                        font-semibold text-base sm:text-lg
                        ${!notification.read ? "text-gray-900" : "text-gray-700"}
                      `}>
                        {notification.title}
                      </h4>
                    </div>

                    <p className="text-sm sm:text-base text-gray-600 mb-3 leading-relaxed">
                      {notification.message}
                    </p>

                    {/* Footer */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <span className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {notification.time}
                      </span>

                      <span className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 bg-white px-3 py-1 rounded-lg border border-gray-200">
                        {getChannelIcon(notification.channel)}
                        <span className="font-medium">{notification.channel.charAt(0).toUpperCase() + notification.channel.slice(1)}</span>
                      </span>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 ml-auto">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm text-yellow-700 hover:text-yellow-800 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition-colors font-medium"
                          >
                            <Check size={14} />
                            <span className="hidden sm:inline">Mark read</span>
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete notification"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No notifications found
              </h3>
              <p className="text-gray-500 text-sm">
                {filter === "all" 
                  ? "You're all caught up! Check back later for updates."
                  : `No ${filter} notifications at the moment.`
                }
              </p>
            </div>
          )}

          {/* Notification Settings Link */}
          {notifications.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mx-auto">
                <Settings size={16} />
                <span>Manage notification preferences</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Notifications;