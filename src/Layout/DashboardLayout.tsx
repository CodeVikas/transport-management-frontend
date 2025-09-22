import React, { useState } from "react";
import Layout from "../Layout/main";
import {
  Calendar,
  MapPin,
  CheckCircle,
  CreditCard,
  Star,
  Navigation,
  Camera,
  DollarSign,
  Bell,
  TrendingUp,
  AlertTriangle,
  Package,
  Truck,
  FileText,
  AlertCircle,
  BarChart3,
  Users,
} from "lucide-react";

function DashboardLayout({ children, currentRole }) {
  
  const [activeTab, setActiveTab] = useState("dashboard");

  const accountantSidebarItems = [
    { icon: <DollarSign size={20} />, label: "Dashboard", active: true },
    { icon: <TrendingUp size={20} />, label: "Revenue" },
    { icon: <FileText size={20} />, label: "Expenses" },
    { icon: <FileText size={20} />, label: "Invoices" },
    { icon: <AlertCircle size={20} />, label: "Reports" },
  ];
  const adminSidebarItems = [
    {
      icon: <BarChart3 size={20} />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    { icon: <Users size={20} />, label: "Manage Staff / Customer", path: "/admin/user/list" },
    { icon: <Truck size={20} />, label: "Fleet", path: "/admin/fleet/list" },
    { icon: <Calendar size={20} />, label: "Booking", path: "/admin/booking/list" },
    { icon: <FileText size={20} />, label: "Reports", path: "/admin/reports" },
    
  ];
  const customerSidebarItems = [
    {
      icon: <Package size={20} />,
      label: "Dashboard",
      active: true,
      path: "/customer/dashboard",
    },
    {
      icon: <Calendar size={20} />,
      label: "My Booking",
      path: "/customer/booking/list",
    },
    {
      icon: <CreditCard size={20} />,
      label: "Invoices",
      path: "/customer/booking/invoice",
    },
    { icon: <Star size={20} />, label: "Feedback", path: "/customer/feedback" },
  ];
  const driverSidebarItems = [
    {
      icon: <Navigation size={20} />,
      label: "Dashboard",
      active: true,
      path: "/driver/dashboard",
    },
    {
      icon: <CheckCircle size={20} />,
      label: "Bookings",
      path: "/driver/booking/list",
    },
    {
      icon: <MapPin size={20} />,
      label: "My Trips",
      path: "/driver/my-trips/list",
    },
    {
      icon: <Camera size={20} />,
      label: "Proof of Delivery",
      path: "/driver/delivery",
    },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      path: "/driver/notifications",
    },
  ];
  const managerSidebarItems = [
    {
      icon: <Calendar size={20} />,
      label: "Dashboard",
      path: "/manager/dashboard",
    },
    {
      icon: <CheckCircle size={20} />,
      label: "Bookings",
      path: "/manager/booking/list",
    },
    {
      icon: <MapPin size={20} />,
      label: "Tracking",
      path: "/manager/tracking",
    },
    {
      icon: <AlertTriangle size={20} />,
      label: "Alerts",
      path: "/manager/alert",
    },
  ];
  const getSidebarItems = () => {
    const baseItems = (() => {
      switch (currentRole) {
        case "Admin":
          return adminSidebarItems;
        case "Manager":
          return managerSidebarItems;
        case "Driver":
          return driverSidebarItems;
        case "Customer":
          return customerSidebarItems;
        case "Accountant":
          return accountantSidebarItems;
        default:
          return adminSidebarItems;
      }
    })();

    return baseItems.map((item) => ({
      ...item,
      active: item.label.toLowerCase() === activeTab,
      onClick: () => setActiveTab(item.label.toLowerCase()),
    }));
  };

  return (
    <Layout
      sidebarItems={getSidebarItems()}
      currentRole={currentRole}
      onRoleChange={(role) => {
        setCurrentRole(role);
        setActiveTab("dashboard");
      }}
    >
      {children}
    </Layout>
  );
}

export default DashboardLayout;
