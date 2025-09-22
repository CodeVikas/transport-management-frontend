import React, { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import Card from '../../../components/Card';


export default function CustomerDashboard() {
  const [bookingForm, setBookingForm] = useState({
    pickup: '',
    dropoff: '',
    vehicleType: '',
    date: '',
    time: '',
    loadType: ''
  });

  const [activeShipment, setActiveShipment] = useState({
    id: 'SH-2025-001',
    status: 'In Transit',
    progress: 60,
    pickup: 'New York, NY',
    dropoff: 'Boston, MA',
    driver: 'John Smith',
    vehicle: 'TRK-001',
    estimatedDelivery: '2025-01-15 3:00 PM'
  });

  const recentBookings = [
    { id: 'BK-001', route: 'NYC → Boston', status: 'Delivered', date: '2025-01-10', amount: '$1,200' },
    { id: 'BK-002', route: 'Boston → Philly', status: 'In Transit', date: '2025-01-12', amount: '$850' },
    { id: 'BK-003', route: 'Philly → Baltimore', status: 'Scheduled', date: '2025-01-16', amount: '$650' },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', bookingForm);
  };

  const progressSteps = [
    { label: 'Scheduled', completed: true },
    { label: 'Picked Up', completed: true },
    { label: 'In Transit', completed: true },
    { label: 'Out for Delivery', completed: false },
    { label: 'Delivered', completed: false }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">9</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-gray-600">In Transit</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">1</div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Form */}
        <Card title="New Booking">
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Location
                </label>
                <input
                  type="text"
                  value={bookingForm.pickup}
                  onChange={(e) => setBookingForm({...bookingForm, pickup: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter pickup address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Drop-off Location
                </label>
                <input
                  type="text"
                  value={bookingForm.dropoff}
                  onChange={(e) => setBookingForm({...bookingForm, dropoff: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter drop-off address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type
                </label>
                <select
                  value={bookingForm.vehicleType}
                  onChange={(e) => setBookingForm({...bookingForm, vehicleType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select vehicle type</option>
                  <option value="van">Van</option>
                  <option value="truck">Truck</option>
                  <option value="trailer">Trailer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Load Type
                </label>
                <input
                  type="text"
                  value={bookingForm.loadType}
                  onChange={(e) => setBookingForm({...bookingForm, loadType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Electronics, Furniture"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Date
                </label>
                <input
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Time
                </label>
                <input
                  type="time"
                  value={bookingForm.time}
                  onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Quote & Book
            </button>
          </form>
        </Card>

        {/* Active Shipment Tracking */}
        <Card title="Track Active Shipment">
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-gray-900">Shipment {activeShipment.id}</div>
                  <div className="text-sm text-gray-600">{activeShipment.pickup} → {activeShipment.dropoff}</div>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {activeShipment.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{activeShipment.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${activeShipment.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Driver</div>
                  <div className="font-medium text-gray-900">{activeShipment.driver}</div>
                </div>
                <div>
                  <div className="text-gray-600">Vehicle</div>
                  <div className="font-medium text-gray-900">{activeShipment.vehicle}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="text-sm text-gray-600">Estimated Delivery</div>
                <div className="font-medium text-gray-900">{activeShipment.estimatedDelivery}</div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-3">
              {progressSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.completed ? <CheckCircle size={14} /> : <div className="w-2 h-2 bg-gray-400 rounded-full" />}
                  </div>
                  <span className={`text-sm ${
                    step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card title="Recent Bookings">
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-gray-900">{booking.id}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'In Transit'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{booking.route}</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{booking.amount}</div>
                    <div className="text-gray-500">{booking.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Payment & Feedback */}
        <div className="space-y-6">
          {/* Invoice/Payment Card */}
          <Card title="Recent Invoice">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-gray-900">Invoice #INV-2025-001</div>
                  <div className="text-sm text-gray-600">Booking BK-001</div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Paid
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700">Amount</span>
                <span className="text-xl font-bold text-gray-900">$1,200.00</span>
              </div>

              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Download Invoice
              </button>
            </div>
          </Card>

          {/* Feedback Form */}
          <Card title="Rate Your Experience">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-700 mb-2">Overall Rating</div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className="text-yellow-400 fill-current cursor-pointer hover:scale-110 transition-transform"
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-2">Comments</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your experience..."
                />
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Submit Feedback
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
