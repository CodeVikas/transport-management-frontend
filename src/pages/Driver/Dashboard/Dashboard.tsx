import React, { useState } from "react";
import {
  Navigation,
  MapPin,
  Camera,
  CheckCircle,
  AlertCircle,
  Bell,
} from "lucide-react";
import Card from "../../../components/Card";

export default function DriverDashboard() {
  const [currentTrip, setCurrentTrip] = useState({
    id: "TRP-001",
    source: "New York, NY",
    destination: "Boston, MA",
    loadType: "Electronics",
    status: "In Transit",
    estimatedTime: "2:30 PM",
    distance: "215 miles",
  });

  const myTrips = [
    {
      id: "TRP-001",
      source: "New York, NY",
      destination: "Boston, MA",
      loadType: "Electronics",
      status: "In Transit",
      date: "2025-01-15",
    },
    {
      id: "TRP-002",
      source: "Boston, MA",
      destination: "Philadelphia, PA",
      loadType: "Furniture",
      status: "Scheduled",
      date: "2025-01-16",
    },
    {
      id: "TRP-003",
      source: "Philadelphia, PA",
      destination: "Baltimore, MD",
      loadType: "Medical Supplies",
      status: "Scheduled",
      date: "2025-01-17",
    },
  ];

  const notifications = [
    {
      message: "New trip assigned for tomorrow",
      time: "5 minutes ago",
      type: "info",
    },
    {
      message: "Weather alert on Route 95",
      time: "30 minutes ago",
      type: "warning",
    },
    {
      message: "Delivery completed successfully",
      time: "2 hours ago",
      type: "success",
    },
  ];

  const updateTripStatus = (newStatus: string) => {
    setCurrentTrip({ ...currentTrip, status: newStatus });
  };

  return (
    <div className="space-y-4 max-w-md mx-auto lg:max-w-none">
      {/* Current Trip Status - Mobile Optimized */}
      <Card className="lg:hidden">
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Current Trip</h2>
          <div className="text-sm text-gray-600">{currentTrip.id}</div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <MapPin className="text-blue-600" size={16} />
              <span className="text-sm font-medium text-gray-900">Route</span>
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">
                {currentTrip.source}
              </div>
              <div className="text-blue-600 my-2">↓</div>
              <div className="font-medium text-gray-900">
                {currentTrip.destination}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">Load Type</div>
              <div className="font-medium text-gray-900">
                {currentTrip.loadType}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">ETA</div>
              <div className="font-medium text-gray-900">
                {currentTrip.estimatedTime}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => updateTripStatus("Started")}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                currentTrip.status === "Started"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Start Trip
            </button>
            <button
              onClick={() => updateTripStatus("In Transit")}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                currentTrip.status === "In Transit"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              In Transit
            </button>
          </div>

          <button
            onClick={() => updateTripStatus("Delivered")}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              currentTrip.status === "Delivered"
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            Mark as Delivered
          </button>
        </div>
      </Card>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Current Trip - Desktop */}
        <div className="lg:col-span-2">
          <Card title="Current Active Trip">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Trip ID</div>
                  <div className="font-medium text-gray-900">
                    {currentTrip.id}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Load Type</div>
                  <div className="font-medium text-gray-900">
                    {currentTrip.loadType}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Distance</div>
                  <div className="font-medium text-gray-900">
                    {currentTrip.distance}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Navigation className="text-blue-600" size={16} />
                    <span className="text-sm font-medium text-gray-900">
                      Route
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-900">
                        {currentTrip.source}
                      </span>
                    </div>
                    <div className="ml-4 border-l-2 border-dashed border-gray-300 h-4"></div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-900">
                        {currentTrip.destination}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-xs text-gray-600">
                      ETA: {currentTrip.estimatedTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => updateTripStatus("Started")}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Start Trip
              </button>
              <button
                onClick={() => updateTripStatus("In Transit")}
                className="flex-1 bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
              >
                In Transit
              </button>
              <button
                onClick={() => updateTripStatus("Delivered")}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Delivered
              </button>
            </div>
          </Card>
        </div>

        {/* Quick Actions - Desktop */}
        <Card title="Quick Actions">
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
              <Camera size={16} />
              <span>Upload Proof</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <AlertCircle size={16} />
              <span>Report Issue</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
              <CheckCircle size={16} />
              <span>Complete Delivery</span>
            </button>
          </div>
        </Card>
      </div>

      {/* My Trips */}
      <Card title="My Trips">
        <div className="space-y-3">
          {myTrips.map((trip) => (
            <div
              key={trip.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900">{trip.id}</div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    trip.status === "In Transit"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {trip.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <MapPin size={14} />
                  <span>
                    {trip.source} → {trip.destination}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Load: {trip.loadType}</span>
                  <span className="text-gray-500">{trip.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Proof of Delivery - Mobile */}
      <Card className="lg:hidden" title="Proof of Delivery">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Camera size={32} className="mx-auto text-gray-400 mb-2" />
            <div className="text-sm text-gray-600">Take Photo</div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="text-sm text-gray-600">Digital Signature</div>
            <div className="mt-2 bg-gray-100 rounded h-20 flex items-center justify-center">
              <span className="text-xs text-gray-500">Signature area</span>
            </div>
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
            Submit Proof of Delivery
          </button>
        </div>
      </Card>

      {/* Notifications */}
      <Card title="Recent Notifications">
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div
                className={`p-1 rounded-full ${
                  notification.type === "success"
                    ? "bg-green-100"
                    : notification.type === "warning"
                    ? "bg-yellow-100"
                    : "bg-blue-100"
                }`}
              >
                <Bell
                  size={12}
                  className={
                    notification.type === "success"
                      ? "text-green-600"
                      : notification.type === "warning"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
