import React, { useState } from "react";
import {
  AlertTriangle,
  Truck,
  User,
  Search,
  MapPin ,
  Bell,
  Clock,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  BatteryWarning,
  Gauge,
  ShieldAlert,
  Wrench
} from "lucide-react";

// Mock data for alerts
const mockVehicleAlerts = [
  {
    id: 1,
    vehicleId: "MH12 AB3456",
    type: "vehicle",
    alertType: "speeding",
    message: "Vehicle is exceeding speed limit (85 km/h in 60 km/h zone)",
    severity: "high",
    location: "Mumbai-Pune Expressway, KM 45",
    time: "10 mins ago",
    driver: "Rajesh Kumar",
    status: "unresolved",
    speed: 85,
    limit: 60
  },
  {
    id: 2,
    vehicleId: "DL9 CD5678",
    type: "vehicle",
    alertType: "maintenance",
    message: "Engine check light is on",
    severity: "medium",
    location: "Delhi Ring Road, Near Okhla",
    time: "2 hours ago",
    driver: "Amit Sharma",
    status: "unresolved",
    code: "P0300"
  },
  {
    id: 3,
    vehicleId: "KA05 EF7890",
    type: "vehicle",
    alertType: "battery",
    message: "Low battery voltage detected",
    severity: "high",
    location: "Bangalore Outer Ring Road",
    time: "5 hours ago",
    driver: "Suresh Nair",
    status: "resolved",
    voltage: 11.8
  },
  {
    id: 4,
    vehicleId: "TN07 GH1234",
    type: "vehicle",
    alertType: "geofence",
    message: "Vehicle exited designated route area",
    severity: "medium",
    location: "Chennai Bypass Road",
    time: "1 day ago",
    driver: "Murali Krishnan",
    status: "unresolved"
  }
];

const mockDriverAlerts = [
  {
    id: 1,
    driverId: "DR12345",
    type: "driver",
    alertType: "fatigue",
    message: "Driver has been on duty for 10 hours (limit: 8 hours)",
    severity: "high",
    location: "Mumbai-Nashik Highway",
    time: "30 mins ago",
    driver: "Rajesh Kumar",
    status: "unresolved",
    hours: 10,
    limit: 8
  },
  {
    id: 2,
    driverId: "DR67890",
    type: "driver",
    alertType: "behavior",
    message: "Harsh braking detected 3 times in last hour",
    severity: "medium",
    location: "Delhi-Jaipur Highway",
    time: "1 hour ago",
    driver: "Amit Sharma",
    status: "unresolved",
    count: 3
  },
  {
    id: 3,
    driverId: "DR54321",
    type: "driver",
    alertType: "document",
    message: "Driver license expiring in 15 days",
    severity: "low",
    location: "Bangalore Office",
    time: "3 days ago",
    driver: "Suresh Nair",
    status: "unresolved",
    daysLeft: 15
  },
  {
    id: 4,
    driverId: "DR98765",
    type: "driver",
    alertType: "health",
    message: "Driver reported not feeling well",
    severity: "high",
    location: "Chennai Depot",
    time: "6 hours ago",
    driver: "Murali Krishnan",
    status: "resolved"
  }
];

const AlertPage = () => {
  const [activeTab, setActiveTab] = useState("vehicle");
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [sortBy, setSortBy] = useState("time"); // 'time' or 'severity'

  // Get the appropriate icon for each alert type
  const getAlertIcon = (type, alertType) => {
    if (type === "vehicle") {
      switch (alertType) {
        case "speeding": return <Gauge className="text-red-500" />;
        case "maintenance": return <Wrench className="text-yellow-500" />;
        case "battery": return <BatteryWarning className="text-red-500" />;
        case "geofence": return <ShieldAlert className="text-yellow-500" />;
        default: return <Truck className="text-gray-500" />;
      }
    } else {
      switch (alertType) {
        case "fatigue": return <Clock className="text-red-500" />;
        case "behavior": return <ShieldAlert className="text-yellow-500" />;
        case "document": return <User className="text-blue-500" />;
        case "health": return <User className="text-red-500" />;
        default: return <User className="text-gray-500" />;
      }
    }
  };

  // Get severity color class
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Get status color class
  const getStatusColor = (status) => {
    return status === "resolved"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  // Filter and sort alerts
  const filteredAlerts = (activeTab === "vehicle" ? mockVehicleAlerts : mockDriverAlerts)
    .filter(alert => {
      // Search filter
      const matchesSearch = Object.values(alert).some(
        val => typeof val === "string" && val.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Severity filter
      const matchesSeverity = severityFilter === "all" ||
        alert.severity.toLowerCase() === severityFilter.toLowerCase();

      // Status filter
      const matchesStatus = statusFilter === "all" ||
        alert.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesSeverity && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "severity") {
        const severityOrder = { high: 1, medium: 2, low: 3 };
        return severityOrder[a.severity.toLowerCase()] - severityOrder[b.severity.toLowerCase()];
      } else {
        // Sort by time (newest first)
        const timeA = a.time.includes("ago") ?
          (a.time.includes("mins") ? parseInt(a.time) :
           a.time.includes("hour") ? parseInt(a.time) * 60 :
           a.time.includes("day") ? parseInt(a.time) * 1440 : 0) : 0;

        const timeB = b.time.includes("ago") ?
          (b.time.includes("mins") ? parseInt(b.time) :
           b.time.includes("hour") ? parseInt(b.time) * 60 :
           b.time.includes("day") ? parseInt(b.time) * 1440 : 0) : 0;

        return timeA - timeB;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8 p-2">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Bell className="mr-3" />
            Alerts 
          </h1>
          <p className="mt-1 text-gray-600">
            Monitor critical alerts for vehicles and drivers
          </p>
        </div>

        {/* Tabs and Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* Tabs */}
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("vehicle")}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                  activeTab === "vehicle"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Truck className="mr-2" size={16} />
                Vehicle Alerts
              </button>
              <button
                onClick={() => setActiveTab("driver")}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                  activeTab === "driver"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <User className="mr-2" size={16} />
                Driver Alerts
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search ${activeTab} alerts...`}
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              {/* Severity Filter */}
              <div className="relative">
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Severity</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="resolved">Resolved</option>
                  <option value="unresolved">Unresolved</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
              </div>

              {/* Sort By */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="time">Sort by Time</option>
                  <option value="severity">Sort by Severity</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Alerts</p>
                <p className="text-2xl font-bold text-gray-800">
                  {activeTab === "vehicle" ? mockVehicleAlerts.length : mockDriverAlerts.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <AlertTriangle size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">High Severity</p>
                <p className="text-2xl font-bold text-gray-800">
                  {(activeTab === "vehicle" ? mockVehicleAlerts : mockDriverAlerts)
                    .filter(alert => alert.severity.toLowerCase() === "high").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <AlertTriangle size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Unresolved</p>
                <p className="text-2xl font-bold text-gray-800">
                  {(activeTab === "vehicle" ? mockVehicleAlerts : mockDriverAlerts)
                    .filter(alert => alert.status.toLowerCase() === "unresolved").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <AlertTriangle size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Resolved</p>
                <p className="text-2xl font-bold text-gray-800">
                  {(activeTab === "vehicle" ? mockVehicleAlerts : mockDriverAlerts)
                    .filter(alert => alert.status.toLowerCase() === "resolved").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-white rounded-xl shadow-sm">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div key={alert.id} className="border-b border-gray-200 last:border-b-0">
                <div className="p-4 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {getAlertIcon(alert.type, alert.alertType)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-800">
                              {alert.type === "vehicle" ? alert.vehicleId : alert.driverId}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{alert.message}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-xs text-gray-500">
                              <MapPin className="mr-1" size={12} />
                              {alert.location}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="mr-1" size={12} />
                              {alert.time}
                            </div>
                            {alert.type === "vehicle" && (
                              <div className="flex items-center text-xs text-gray-500">
                                <User className="mr-1" size={12} />
                                {alert.driver}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </span>
                          <button
                            onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {expandedAlert === alert.id ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Alert Details */}
                  {expandedAlert === alert.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {alert.type === "vehicle" ? (
                          <>
                            <div>
                              <p className="text-sm text-gray-500">Alert Type</p>
                              <p className="font-medium capitalize">{alert.alertType}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Vehicle ID</p>
                              <p className="font-medium">{alert.vehicleId}</p>
                            </div>
                            {alert.alertType === "speeding" && (
                              <>
                                <div>
                                  <p className="text-sm text-gray-500">Current Speed</p>
                                  <p className="font-medium">{alert.speed} km/h</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Speed Limit</p>
                                  <p className="font-medium">{alert.limit} km/h</p>
                                </div>
                              </>
                            )}
                            {alert.alertType === "battery" && (
                              <div>
                                <p className="text-sm text-gray-500">Battery Voltage</p>
                                <p className="font-medium">{alert.voltage}V</p>
                              </div>
                            )}
                            {alert.alertType === "maintenance" && (
                              <div>
                                <p className="text-sm text-gray-500">Error Code</p>
                                <p className="font-medium">{alert.code}</p>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <div>
                              <p className="text-sm text-gray-500">Alert Type</p>
                              <p className="font-medium capitalize">{alert.alertType}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Driver ID</p>
                              <p className="font-medium">{alert.driverId}</p>
                            </div>
                            {alert.alertType === "fatigue" && (
                              <>
                                <div>
                                  <p className="text-sm text-gray-500">Hours on Duty</p>
                                  <p className="font-medium">{alert.hours} hours</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Limit</p>
                                  <p className="font-medium">{alert.limit} hours</p>
                                </div>
                              </>
                            )}
                            {alert.alertType === "behavior" && (
                              <div>
                                <p className="text-sm text-gray-500">Incidents</p>
                                <p className="font-medium">{alert.count} times</p>
                              </div>
                            )}
                            {alert.alertType === "document" && (
                              <div>
                                <p className="text-sm text-gray-500">Days Remaining</p>
                                <p className="font-medium">{alert.daysLeft} days</p>
                              </div>
                            )}
                          </>
                        )}
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Status</p>
                          <div className="flex items-center mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs mr-2 ${getStatusColor(alert.status)}`}>
                              {alert.status}
                            </span>
                            {alert.status === "unresolved" && (
                              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                                <CheckCircle size={16} className="mr-1" />
                                Mark as Resolved
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700">
                No alerts found
              </h3>
              <p className="text-gray-500 mt-1">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertPage;
