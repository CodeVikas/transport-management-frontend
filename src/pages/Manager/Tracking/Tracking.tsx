import React, { useState, useEffect } from "react";
import {
  MapPin,
  Search,
  Truck,
  Package,
  Clock,
  Filter,
  LocateFixed,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

// Mock data for tracking
const mockBookings = [
  {
    id: 1,
    bookingId: "#BK12345",
    pickup: "Mumbai, Maharashtra",
    drop: "Pune, Maharashtra",
    status: "In Transit",
    vehicle: "MH12 AB3456",
    driver: "Rajesh Kumar",
    driverPhone: "+91 9876543210",
    estimatedArrival: "2 hours",
    lastUpdated: "10 mins ago",
    latitude: 19.0760,
    longitude: 72.8777,
    progress: 65
  },
  {
    id: 2,
    bookingId: "#BK67890",
    pickup: "Delhi, Delhi",
    drop: "Gurgaon, Haryana",
    status: "Start Trip",
    vehicle: "DL9 CD5678",
    driver: "Amit Sharma",
    driverPhone: "+91 9811223344",
    estimatedArrival: "4 hours",
    lastUpdated: "30 mins ago",
    latitude: 28.7041,
    longitude: 77.1025,
    progress: 20
  },
  {
    id: 3,
    bookingId: "#BK54321",
    pickup: "Bangalore, Karnataka",
    drop: "Chennai, Tamil Nadu",
    status: "Delivered",
    vehicle: "KA05 EF7890",
    driver: "Suresh Nair",
    driverPhone: "+91 9745612309",
    estimatedArrival: "Delivered",
    lastUpdated: "1 day ago",
    latitude: 12.9716,
    longitude: 77.5946,
    progress: 100
  },
  {
    id: 4,
    bookingId: "#BK98765",
    pickup: "Hyderabad, Telangana",
    drop: "Vijayawada, Andhra Pradesh",
    status: "Pending",
    vehicle: "TS07 GH1234",
    driver: "Assigned soon",
    driverPhone: "-",
    estimatedArrival: "Not started",
    lastUpdated: "-",
    latitude: 17.3850,
    longitude: 78.4867,
    progress: 0
  }
];

const mockVehicles = [
  {
    id: 1,
    vehicleId: "MH12 AB3456",
    type: "Truck",
    status: "In Transit",
    driver: "Rajesh Kumar",
    driverPhone: "+91 9876543210",
    lastLocation: "Near Panvel, Maharashtra",
    lastUpdated: "10 mins ago",
    latitude: 19.0760,
    longitude: 72.8777,
    speed: 45
  },
  {
    id: 2,
    vehicleId: "DL9 CD5678",
    type: "Truck",
    status: "Available",
    driver: "Amit Sharma",
    driverPhone: "+91 9811223344",
    lastLocation: "Okhla, Delhi",
    lastUpdated: "1 hour ago",
    latitude: 28.7041,
    longitude: 77.1025,
    speed: 0
  },
  {
    id: 3,
    vehicleId: "KA05 EF7890",
    type: "Truck",
    status: "Maintenance",
    driver: "Suresh Nair",
    driverPhone: "+91 9745612309",
    lastLocation: "Bommasandra, Bangalore",
    lastUpdated: "2 days ago",
    latitude: 12.9716,
    longitude: 77.5946,
    speed: 0
  }
];

const TrackingPage = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedTracking, setExpandedTracking] = useState(null);
  const [mapView, setMapView] = useState("list"); // 'list' or 'map'

  // Filter data based on search and status
  const filteredData = (activeTab === "bookings" ? mockBookings : mockVehicles).filter(item => {
    const matchesSearch = Object.values(item).some(
      val => typeof val === "string" && val.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesStatus = statusFilter === "all" ||
      item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Get status color class
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "in transit":
        return "bg-blue-100 text-blue-800";
      case "start trip":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "available":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "in transit":
      case "start trip":
        return <Truck className="text-blue-500" size={18} />;
      case "delivered":
        return <CheckCircle className="text-green-500" size={18} />;
      case "pending":
        return <Clock className="text-yellow-500" size={18} />;
      case "maintenance":
        return <AlertTriangle className="text-red-500" size={18} />;
      case "available":
        return <CheckCircle className="text-green-500" size={18} />;
      default:
        return <Package className="text-gray-500" size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 p-2">
      <div className="mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <LocateFixed className="mr-3" />
            Live Tracking
          </h1>
          <p className="mt-1 text-gray-600">
            Track your bookings and vehicles in real-time
          </p>
        </div>

        {/* Tabs and Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* Tabs */}
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                  activeTab === "bookings"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Package className="mr-2" size={16} />
                Bookings
              </button>
              <button
                onClick={() => setActiveTab("vehicles")}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                  activeTab === "vehicles"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Truck className="mr-2" size={16} />
                Vehicles
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Status</option>
                  {activeTab === "bookings" ? (
                    <>
                      <option value="Pending">Pending</option>
                      <option value="Start Trip">Start Trip</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                    </>
                  ) : (
                    <>
                      <option value="Available">Available</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Maintenance">Maintenance</option>
                    </>
                  )}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
              </div>

              {/* View Toggle */}
              <button
                onClick={() => setMapView(mapView === "list" ? "map" : "list")}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                {mapView === "list" ? (
                  <MapPin className="text-gray-600" size={18} />
                ) : (
                  <Package className="text-gray-600" size={18} />
                )}
              </button>

              {/* Refresh */}
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                <RefreshCw className="text-gray-600" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Tracking Cards */}
        {mapView === "list" ? (
          <div className="space-y-4">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  {/* Card Header */}
                  <div
                    className="p-4 cursor-pointer flex justify-between items-center"
                    onClick={() =>
                      setExpandedTracking(
                        expandedTracking === item.id ? null : item.id
                      )
                    }
                  >
                    <div className="flex items-center space-x-3">
                      {activeTab === "bookings" ? (
                        <Package className="text-blue-500" size={20} />
                      ) : (
                        <Truck className="text-green-500" size={20} />
                      )}
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {activeTab === "bookings" ? item.bookingId : item.vehicleId}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {activeTab === "bookings"
                            ? `${item.pickup} → ${item.drop}`
                            : item.lastLocation}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(item.status)}`}
                      >
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{item.status}</span>
                      </span>
                      {expandedTracking === item.id ? (
                        <ChevronUp className="text-gray-500" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-500" size={20} />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedTracking === item.id && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeTab === "bookings" ? (
                          <>
                            <div>
                              <p className="text-sm text-gray-500">Vehicle</p>
                              <p className="font-medium">{item.vehicle}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Driver</p>
                              <p className="font-medium">{item.driver}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Driver Phone</p>
                              <p className="font-medium">{item.driverPhone}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Estimated Arrival</p>
                              <p className="font-medium">{item.estimatedArrival}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Last Updated</p>
                              <p className="font-medium">{item.lastUpdated}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Progress</p>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{ width: `${item.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-sm font-medium mt-1">{item.progress}%</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <p className="text-sm text-gray-500">Type</p>
                              <p className="font-medium">{item.type}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Driver</p>
                              <p className="font-medium">{item.driver}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Driver Phone</p>
                              <p className="font-medium">{item.driverPhone}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Speed</p>
                              <p className="font-medium">{item.speed} km/h</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Last Updated</p>
                              <p className="font-medium">{item.lastUpdated}</p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Map Preview */}
                      <div className="mt-4 h-40 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gray-100">
                          <img
                            src="https://maps.googleapis.com/maps/api/staticmap?center=India&zoom=4&size=600x200&key=YOUR_API_KEY"
                            alt="Map preview"
                            className="w-full h-full object-cover"
                          />
                          <div
                            className="absolute w-6 h-6 bg-blue-500 rounded-full border-2 border-white"
                            style={{
                              top: `${Math.random() * 60 + 20}%`,
                              left: `${Math.random() * 70 + 15}%`
                            }}
                          >
                            {activeTab === "bookings" ? (
                              <Package className="text-white" size={16} style={{ margin: "2px" }} />
                            ) : (
                              <Truck className="text-white" size={16} style={{ margin: "2px" }} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700">
                  No {activeTab} found
                </h3>
                <p className="text-gray-500 mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        ) : (
          // Map View
          <div className="bg-white rounded-xl shadow-sm h-[500px] relative overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://maps.googleapis.com/maps/api/staticmap?center=India&zoom=5&size=1200x500&key=YOUR_API_KEY"
                alt="Map view"
                className="w-full h-full object-cover"
              />
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="absolute w-8 h-8 bg-blue-500 rounded-full border-2 border-white cursor-pointer hover:z-10 hover:scale-110 transition-transform"
                  style={{
                    top: `${Math.random() * 70 + 15}%`,
                    left: `${Math.random() * 80 + 10}%`
                  }}
                  onClick={() => setExpandedTracking(item.id)}
                >
                  {activeTab === "bookings" ? (
                    <Package className="text-white" size={20} style={{ margin: "4px" }} />
                  ) : (
                    <Truck className="text-white" size={20} style={{ margin: "4px" }} />
                  )}
                  {expandedTracking === item.id && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
                      !
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
              <h4 className="font-medium mb-2">Legend</h4>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">{activeTab === "bookings" ? "Bookings" : "Vehicles"}</span>
              </div>
            </div>

            {/* Selected Item Details */}
            {expandedTracking && (
              <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg w-80">
                {activeTab === "bookings" ? (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Booking #{mockBookings.find(b => b.id === expandedTracking).bookingId}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(mockBookings.find(b => b.id === expandedTracking).status)}`}>
                        {mockBookings.find(b => b.id === expandedTracking).status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Route:</span>
                        <span className="font-medium text-sm">
                          {mockBookings.find(b => b.id === expandedTracking).pickup} → {mockBookings.find(b => b.id === expandedTracking).drop}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Vehicle:</span>
                        <span className="font-medium text-sm">
                          {mockBookings.find(b => b.id === expandedTracking).vehicle}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Driver:</span>
                        <span className="font-medium text-sm">
                          {mockBookings.find(b => b.id === expandedTracking).driver}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Vehicle {mockVehicles.find(v => v.id === expandedTracking).vehicleId}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(mockVehicles.find(v => v.id === expandedTracking).status)}`}>
                        {mockVehicles.find(v => v.id === expandedTracking).status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Type:</span>
                        <span className="font-medium text-sm">
                          {mockVehicles.find(v => v.id === expandedTracking).type}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Driver:</span>
                        <span className="font-medium text-sm">
                          {mockVehicles.find(v => v.id === expandedTracking).driver}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Location:</span>
                        <span className="font-medium text-sm">
                          {mockVehicles.find(v => v.id === expandedTracking).lastLocation}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
