import React, { useState } from "react";
import { Menu, X, Bell, User, Settings, LogOut } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  sidebarItems: Array<{
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
  }>;
  currentRole: string;
  onRoleChange: (role: string) => void;
}

export default function Layout({
  children,
  sidebarItems,
  currentRole,
  onRoleChange,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const roles = ["Admin", "Manager", "Driver", "Customer", "Accountant"];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">TransportMS</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 px-4">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg mb-1 transition-colors ${
                item.active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Role Switcher */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Switch Role
            </label>
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 mr-4"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {currentRole} Dashboard
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 relative"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm text-gray-800">
                        New booking request from Customer #1234
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        2 minutes ago
                      </p>
                    </div>
                    <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm text-gray-800">
                        Vehicle TRK-001 maintenance due
                      </p>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50">
                      <p className="text-sm text-gray-800">
                        Payment received from Invoice #INV-456
                      </p>
                      <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                John Doe
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
