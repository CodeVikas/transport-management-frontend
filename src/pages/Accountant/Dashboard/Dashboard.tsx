import React from 'react';
import { DollarSign, TrendingUp, FileText, AlertCircle, Download, Plus, Filter } from 'lucide-react';
import Card from '../../../components/Card';
import Chart from '../../../components/Chart';

interface AccountantDashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AccountantDashboard({ activeTab }: AccountantDashboardProps) {

  const revenueData = [
    { label: 'Jan', value: 145000, color: 'bg-green-500' },
    { label: 'Feb', value: 162000, color: 'bg-green-500' },
    { label: 'Mar', value: 158000, color: 'bg-green-500' },
    { label: 'Apr', value: 171000, color: 'bg-green-500' },
    { label: 'May', value: 168000, color: 'bg-green-500' },
    { label: 'Jun', value: 184000, color: 'bg-green-500' },
  ];

  const expenseData = [
    { label: 'Fuel', value: 45000, color: 'bg-red-500' },
    { label: 'Maintenance', value: 18000, color: 'bg-orange-500' },
    { label: 'Driver Wages', value: 62000, color: 'bg-blue-500' },
    { label: 'Insurance', value: 12000, color: 'bg-purple-500' },
    { label: 'Tolls', value: 8500, color: 'bg-yellow-500' },
  ];

  const profitData = [
    { label: 'Revenue', value: 184000, color: 'bg-green-500' },
    { label: 'Expenses', value: 145500, color: 'bg-red-500' },
    { label: 'Net Profit', value: 38500, color: 'bg-blue-500' },
  ];

  const invoices = [
    { id: 'INV-001', customer: 'ABC Corp', amount: 2500, status: 'Paid', dueDate: '2025-01-10' },
    { id: 'INV-002', customer: 'XYZ Ltd', amount: 1800, status: 'Pending', dueDate: '2025-01-15' },
    { id: 'INV-003', customer: 'Tech Solutions', amount: 3200, status: 'Overdue', dueDate: '2025-01-05' },
    { id: 'INV-004', customer: 'Global Logistics', amount: 4100, status: 'Paid', dueDate: '2025-01-12' },
  ];

  const expenses = [
    { id: 'EXP-001', category: 'Fuel', amount: 1250, date: '2025-01-14', vendor: 'Shell Station' },
    { id: 'EXP-002', category: 'Maintenance', amount: 850, date: '2025-01-13', vendor: 'Auto Service' },
    { id: 'EXP-003', category: 'Tolls', amount: 45, date: '2025-01-12', vendor: 'Highway Authority' },
    { id: 'EXP-004', category: 'Insurance', amount: 2200, date: '2025-01-10', vendor: 'Insurance Co' },
  ];

  const topCustomers = [
    { name: 'ABC Corp', revenue: 45000, trips: 28 },
    { name: 'Global Logistics', revenue: 38000, trips: 22 },
    { name: 'Tech Solutions', revenue: 32000, trips: 19 },
    { name: 'XYZ Ltd', revenue: 28000, trips: 16 },
  ];

  if (activeTab === 'invoices') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
              <Plus size={16} />
              <span>New Invoice</span>
            </button>
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Invoice ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{invoice.id}</td>
                    <td className="py-3 px-4 text-gray-700">{invoice.customer}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">${invoice.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-600">{invoice.dueDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        invoice.status === 'Paid' 
                          ? 'bg-green-100 text-green-800'
                          : invoice.status === 'Overdue'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:bg-blue-50 p-1 rounded">
                        <Download size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  if (activeTab === 'expenses') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Expense Management</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            <span>Add Expense</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Expense Breakdown">
            <Chart type="pie" data={expenseData} height={300} />
          </Card>

          <Card title="Monthly Expenses">
            <Chart type="bar" data={expenseData} height={300} />
          </Card>
        </div>

        <Card title="Recent Expenses">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Expense ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Vendor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{expense.id}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{expense.vendor}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">${expense.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-600">{expense.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">$184K</h3>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-xs text-green-600">+12% from last month</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-red-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">$145K</h3>
              <p className="text-sm text-gray-600">Monthly Expenses</p>
              <p className="text-xs text-red-600">+5% from last month</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="text-blue-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">$38.5K</h3>
              <p className="text-sm text-gray-600">Net Profit</p>
              <p className="text-xs text-blue-600">20.9% margin</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="text-yellow-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">7</h3>
              <p className="text-sm text-gray-600">Overdue Invoices</p>
              <p className="text-xs text-yellow-600">$15.2K pending</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue Trend">
          <Chart type="bar" data={revenueData} height={300} />
        </Card>

        <Card title="Profit vs Expenses">
          <Chart type="line" data={profitData} height={300} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <Card title="Recent Payments">
          <div className="space-y-3">
            {invoices.filter(inv => inv.status === 'Paid').slice(0, 4).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{payment.customer}</div>
                  <div className="text-sm text-gray-600">{payment.id} • {payment.dueDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-600">+${payment.amount.toLocaleString()}</div>
                  <div className="text-xs text-green-500">Paid</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Customers */}
        <Card title="Top Customers by Revenue">
          <div className="space-y-3">
            {topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-600">{customer.trips} trips</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">${customer.revenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">YTD revenue</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Overdue Alerts */}
      <Card title="Payment Alerts">
        <div className="space-y-3">
          {invoices.filter(inv => inv.status === 'Overdue').map((overdue) => (
            <div key={overdue.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="text-red-600" size={20} />
                <div>
                  <div className="font-medium text-gray-900">Overdue Invoice: {overdue.id}</div>
                  <div className="text-sm text-gray-600">{overdue.customer} • Due: {overdue.dueDate}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-red-600">${overdue.amount.toLocaleString()}</div>
                <button className="text-xs text-red-700 hover:underline">Send Reminder</button>
              </div>
            </div>
          ))}
          
          {invoices.filter(inv => inv.status === 'Pending').map((pending) => (
            <div key={pending.id} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="text-yellow-600" size={20} />
                <div>
                  <div className="font-medium text-gray-900">Pending Payment: {pending.id}</div>
                  <div className="text-sm text-gray-600">{pending.customer} • Due: {pending.dueDate}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-yellow-600">${pending.amount.toLocaleString()}</div>
                <button className="text-xs text-yellow-700 hover:underline">Follow Up</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export const accountantSidebarItems = [
  { icon: <DollarSign size={20} />, label: 'Dashboard', active: true },
  { icon: <TrendingUp size={20} />, label: 'Revenue' },
  { icon: <FileText size={20} />, label: 'Expenses' },
  { icon: <FileText size={20} />, label: 'Invoices' },
  { icon: <AlertCircle size={20} />, label: 'Reports' },
];