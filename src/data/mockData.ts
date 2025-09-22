import { User, Vehicle, Driver, Customer, Booking, Trip, Payment, Expense, Notification } from '../types';

export const mockUsers: User[] = [
  {
    user_id: '1',
    name: 'John Admin',
    email: 'admin@transport.com',
    role: 'Admin',
    phone: '+1-555-0101',
    address: '123 Admin St, New York, NY',
    status: 'active',
    created_at: '2024-01-15'
  },
  {
    user_id: '2',
    name: 'Sarah Manager',
    email: 'sarah@transport.com',
    role: 'Manager',
    phone: '+1-555-0102',
    address: '456 Manager Ave, Boston, MA',
    status: 'active',
    created_at: '2024-01-16'
  },
  {
    user_id: '3',
    name: 'Mike Driver',
    email: 'mike@transport.com',
    role: 'Driver',
    phone: '+1-555-0103',
    address: '789 Driver Rd, Chicago, IL',
    status: 'active',
    created_at: '2024-01-17'
  },
  {
    user_id: '4',
    name: 'Lisa Customer',
    email: 'lisa@company.com',
    role: 'Customer',
    phone: '+1-555-0104',
    address: '321 Customer Blvd, Los Angeles, CA',
    status: 'active',
    created_at: '2024-01-18'
  },
  {
    user_id: '5',
    name: 'David Accountant',
    email: 'david@transport.com',
    role: 'Accountant',
    phone: '+1-555-0105',
    address: '654 Finance St, Miami, FL',
    status: 'active',
    created_at: '2024-01-19'
  }
];

export const mockVehicles: Vehicle[] = [
  {
    vehicle_id: '1',
    vehicle_number: 'TRK-001',
    type: 'Truck',
    capacity: 5000,
    status: 'Available',
    last_service_date: '2024-12-01',
    next_service_due: '2025-03-01',
    created_at: '2024-01-10'
  },
  {
    vehicle_id: '2',
    vehicle_number: 'VAN-002',
    type: 'Van',
    capacity: 2000,
    status: 'In Trip',
    last_service_date: '2024-11-15',
    next_service_due: '2025-02-15',
    created_at: '2024-01-11'
  },
  {
    vehicle_id: '3',
    vehicle_number: 'TRK-003',
    type: 'Truck',
    capacity: 7500,
    status: 'Under Maintenance',
    last_service_date: '2024-10-20',
    next_service_due: '2025-01-20',
    created_at: '2024-01-12'
  }
];

export const mockDrivers: Driver[] = [
  {
    driver_id: '1',
    user_id: '3',
    license_number: 'DL123456789',
    license_expiry: '2026-12-31',
    experience_years: 8,
    assigned_vehicle_id: '1',
    user: mockUsers.find(u => u.user_id === '3'),
    vehicle: mockVehicles.find(v => v.vehicle_id === '1')
  }
];

export const mockCustomers: Customer[] = [
  {
    customer_id: '1',
    user_id: '4',
    company_name: 'ABC Corporation',
    preferred_payment_method: 'Online',
    user: mockUsers.find(u => u.user_id === '4')
  }
];

export const mockBookings: Booking[] = [
  {
    booking_id: '1',
    customer_id: '1',
    booking_date: '2025-01-15',
    pickup_location: 'New York, NY',
    drop_location: 'Boston, MA',
    cargo_details: {
      description: 'Electronics Equipment',
      weight: 1500,
      volume: 50
    },
    status: 'Approved',
    estimated_cost: 1200,
    payment_status: 'Paid',
    customer: mockCustomers[0]
  },
  {
    booking_id: '2',
    customer_id: '1',
    booking_date: '2025-01-16',
    pickup_location: 'Chicago, IL',
    drop_location: 'Detroit, MI',
    cargo_details: {
      description: 'Furniture',
      weight: 2000,
      volume: 80
    },
    status: 'Pending',
    estimated_cost: 850,
    payment_status: 'Unpaid',
    customer: mockCustomers[0]
  }
];

export const mockTrips: Trip[] = [
  {
    trip_id: '1',
    booking_id: '1',
    vehicle_id: '1',
    driver_id: '1',
    manager_id: '2',
    start_time: '2025-01-15T08:00:00',
    status: 'In Progress',
    actual_cost: 1200,
    booking: mockBookings[0],
    vehicle: mockVehicles[0],
    driver: mockDrivers[0],
    manager: mockUsers.find(u => u.user_id === '2')
  }
];

export const mockPayments: Payment[] = [
  {
    payment_id: '1',
    booking_id: '1',
    amount: 1200,
    payment_date: '2025-01-14',
    payment_method: 'Online',
    status: 'Success',
    booking: mockBookings[0]
  }
];

export const mockExpenses: Expense[] = [
  {
    expense_id: '1',
    trip_id: '1',
    vehicle_id: '1',
    expense_type: 'Fuel',
    amount: 150,
    date: '2025-01-15',
    remarks: 'Highway fuel stop',
    trip: mockTrips[0],
    vehicle: mockVehicles[0]
  },
  {
    expense_id: '2',
    vehicle_id: '3',
    expense_type: 'Maintenance',
    amount: 850,
    date: '2025-01-10',
    remarks: 'Engine repair',
    vehicle: mockVehicles[2]
  }
];

export const mockNotifications: Notification[] = [
  {
    notification_id: '1',
    user_id: '2',
    message: 'New booking request requires approval',
    type: 'Booking Update',
    status: 'Unread',
    timestamp: '2025-01-15T10:30:00',
    user: mockUsers.find(u => u.user_id === '2')
  },
  {
    notification_id: '2',
    user_id: '3',
    message: 'Trip TRP-001 assigned to you',
    type: 'Trip Update',
    status: 'Read',
    timestamp: '2025-01-15T09:00:00',
    user: mockUsers.find(u => u.user_id === '3')
  }
];