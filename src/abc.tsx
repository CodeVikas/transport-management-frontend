import React, { useState } from 'react';
import Layout from './components/Layout';
import AdminDashboard, { adminSidebarItems } from './dashboards/AdminDashboard';
import ManagerDashboard, { managerSidebarItems } from './dashboards/ManagerDashboard';
import DriverDashboard, { driverSidebarItems } from './dashboards/DriverDashboard';
import CustomerDashboard, { customerSidebarItems } from './dashboards/CustomerDashboard';
import AccountantDashboard, { accountantSidebarItems } from './dashboards/AccountantDashboard';

function App() {
  const [currentRole, setCurrentRole] = useState('Admin');
  const [activeTab, setActiveTab] = useState('dashboard');

  const getDashboardComponent = () => {
    switch (currentRole) {
      case 'Admin':
        return <AdminDashboard />;
      case 'Manager':
        return <ManagerDashboard />;
      case 'Driver':
        return <DriverDashboard />;
      case 'Customer':
        return <CustomerDashboard />;
      case 'Accountant':
        return <AccountantDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  const getSidebarItems = () => {
    const baseItems = (() => {
      switch (currentRole) {
        case 'Admin':
          return adminSidebarItems;
        case 'Manager':
          return managerSidebarItems;
        case 'Driver':
          return driverSidebarItems;
        case 'Customer':
          return customerSidebarItems;
        case 'Accountant':
          return accountantSidebarItems;
        default:
          return adminSidebarItems;
      }
    })();

    return baseItems.map(item => ({
      ...item,
      active: item.label.toLowerCase() === activeTab,
      onClick: () => setActiveTab(item.label.toLowerCase())
    }));
  };

  const getDashboardWithProps = () => {
    const commonProps = { activeTab, setActiveTab };
    
    switch (currentRole) {
      case 'Admin':
        return <AdminDashboard {...commonProps} />;
      case 'Manager':
        return <ManagerDashboard {...commonProps} />;
      case 'Driver':
        return <DriverDashboard {...commonProps} />;
      case 'Customer':
        return <CustomerDashboard {...commonProps} />;
      case 'Accountant':
        return <AccountantDashboard {...commonProps} />;
      default:
        return <AdminDashboard {...commonProps} />;
    }
  };
  return (
    <Layout
      sidebarItems={getSidebarItems()}
      currentRole={currentRole}
      onRoleChange={(role) => {
        setCurrentRole(role);
        setActiveTab('dashboard');
      }}
    >
      {getDashboardWithProps()}
    </Layout>
  );
}

export default App;