import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle, XCircle, Clock, AlertTriangle, Truck } from 'lucide-react';
import Card from '../../../components/Card';
import { mockBookings } from '../../../data/mockData';


export default function ManagerDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookings, setBookings] = useState(mockBookings);



  const liveVehicles = [
    { id: 'TRK-001', location: 'Interstate 95, Mile 45', status: 'On Time', eta: '2:30 PM' },
    { id: 'TRK-002', location: 'Highway 101, Mile 128', status: 'Delayed', eta: '4:15 PM' },
    { id: 'TRK-003', location: 'Route 66, Mile 89', status: 'On Time', eta: '6:45 PM' },
  ];

  const alerts = [
    {
      type: 'warning',
      message: 'TRK-002 is 30 minutes behind schedule',
      time: '10 minutes ago'
    },
    {
      type: 'info',
      message: 'New booking request from Premium Customer',
      time: '25 minutes ago'
    },
    {
      type: 'error',
      message: 'TRK-004 reported mechanical issue',
      time: '1 hour ago'
    }
  ];


  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">24</div>
            <div className="text-sm text-gray-600">Active Trips</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">8</div>
            <div className="text-sm text-gray-600">Pending Approvals</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">156</div>
            <div className="text-sm text-gray-600">Completed Today</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">3</div>
            <div className="text-sm text-gray-600">Delays/Issues</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trip Scheduling */}
        <Card title="Trip Scheduling">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Calendar className="text-blue-600" size={20} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Today's Schedule</h4>
                <span className="text-sm text-blue-600">6 trips planned</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 px-3 bg-white rounded border-l-4 border-blue-500">
                  <div>
                    <div className="text-sm font-medium text-gray-900">NYC → Boston</div>
                    <div className="text-xs text-gray-500">TRK-001 • 8:00 AM</div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">In Transit</span>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-white rounded border-l-4 border-yellow-500">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Chicago → Detroit</div>
                    <div className="text-xs text-gray-500">TRK-002 • 10:30 AM</div>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Starting</span>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-white rounded border-l-4 border-gray-300">
                  <div>
                    <div className="text-sm font-medium text-gray-900">LA → San Francisco</div>
                    <div className="text-xs text-gray-500">TRK-003 • 2:00 PM</div>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Live Vehicle Tracking */}
        <Card title="Live Vehicle Tracking">
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500">
              <MapPin size={48} className="mx-auto mb-2 text-gray-400" />
              <div className="text-sm">Interactive Map View</div>
              <div className="text-xs">Real-time vehicle locations would be displayed here</div>
            </div>
            
            <div className="space-y-2">
              {liveVehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Truck size={16} className="text-blue-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{vehicle.id}</div>
                      <div className="text-xs text-gray-500">{vehicle.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs px-2 py-1 rounded ${
                      vehicle.status === 'On Time' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {vehicle.status}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">ETA: {vehicle.eta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Approvals */}
        <Card title="Booking Approvals">
          <div className="space-y-3">
            {bookings.slice(0, 3).map((booking) => (
              <div key={booking.booking_id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{booking.booking_id}</div>
                    <div className="text-sm text-gray-600">{booking.customer?.user?.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">${booking.estimated_cost.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{booking.booking_date}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">{booking.pickup_location} → {booking.drop_location}</div>
                  <div className="flex items-center space-x-2">
                    {booking.status === 'Pending' ? (
                      <>
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                          <CheckCircle size={16} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <XCircle size={16} />
                        </button>
                      </>
                    ) : (
                      <span className={`text-xs px-2 py-1 rounded ${
                        booking.status === 'Approved' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts & Notifications */}
        <Card title="Alerts & Notifications">
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                alert.type === 'error' 
                  ? 'bg-red-50 border border-red-200'
                  : alert.type === 'warning'
                  ? 'bg-yellow-50 border border-yellow-200'
                  : 'bg-blue-50 border border-blue-200'
              }`}>
                <div className={`p-1 rounded-full ${
                  alert.type === 'error'
                    ? 'bg-red-100'
                    : alert.type === 'warning'
                    ? 'bg-yellow-100'
                    : 'bg-blue-100'
                }`}>
                  {alert.type === 'error' ? (
                    <XCircle size={16} className="text-red-600" />
                  ) : alert.type === 'warning' ? (
                    <AlertTriangle size={16} className="text-yellow-600" />
                  ) : (
                    <Clock size={16} className="text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
