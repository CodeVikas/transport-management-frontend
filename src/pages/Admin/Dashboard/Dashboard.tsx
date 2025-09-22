import React, { useEffect } from "react";
import { Users, Truck, BarChart3, Settings } from "lucide-react";
import Card from "../../../components/Card";
import Chart from "../../../components/Chart";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboards } from "../../../Store/feature/Dashboard/DashboardThunk.js";
import Loader from "../../../ShareFolder/Loader";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { dashboards, status } = useSelector((state) => state.dashboards);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDashboards());
    }
  }, [dispatch, status]);

  const revenueData = [
    { label: "Jan", value: 45000, color: "bg-blue-500" },
    { label: "Feb", value: 52000, color: "bg-blue-500" },
    { label: "Mar", value: 48000, color: "bg-blue-500" },
    { label: "Apr", value: 61000, color: "bg-blue-500" },
    { label: "May", value: 55000, color: "bg-blue-500" },
    { label: "Jun", value: 67000, color: "bg-blue-500" },
  ];

  return (
    <div className="space-y-6">
      {status === "loading" ? (
          <div className="flex  justify-center items-center">
            <Loader colspan={5} />
          </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="text-blue-600" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {dashboards?.totalUsers}
                  </h3>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Truck className="text-green-600" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {dashboards?.totalVehicles}
                  </h3>
                  <p className="text-sm text-gray-600">Total Vehicles</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="text-purple-600" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    ₹{dashboards?.totalRevenue}
                  </h3>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Settings className="text-orange-600" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {dashboards?.activeTrips}
                  </h3>
                  <p className="text-sm text-gray-600">Active Trips</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Monthly Revenue">
              <Chart type="bar" data={revenueData} height={300} />
            </Card>

            <Card title="Booking Distribution Status">
              <Chart
                type="pie"
                data={[
                  {
                    label: "Pending",
                    value: dashboards?.statusPercentages?.pending,
                    color: "bg-green-500",
                  },
                  {
                    label: "Start",
                    value: dashboards?.statusPercentages?.startTrip,
                    color: "bg-red-500",
                  },
                  {
                    label: "In Transit",
                    value: dashboards?.statusPercentages?.inTransit,
                    color: "bg-blue-500",
                  },
                  {
                    label: "Delivered",
                    value: dashboards?.statusPercentages?.delivered,
                    color: "bg-gray-500",
                  },
                ]}
                height={300}
              />
            </Card>
          </div>

          {/* Recent Activity */}
          <Card title="Recent Activity">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="text-blue-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    New user registration
                  </p>
                  <p className="text-xs text-gray-500">
                    Sarah Johnson joined as Manager - 2 hours ago
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Truck className="text-green-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Vehicle maintenance completed
                  </p>
                  <p className="text-xs text-gray-500">
                    TRK-003 returned to service - 4 hours ago
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="text-purple-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    High revenue day
                  </p>
                  <p className="text-xs text-gray-500">
                    Generated $12,450 in bookings - 1 day ago
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
