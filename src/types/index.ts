export interface User {
  user_id: string;
  name: string;
  email: string;
  password_hash?: string;
  role: 'Admin' | 'Manager' | 'Driver' | 'Customer' | 'Accountant';
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  created_at?: string;
}

export interface Vehicle {
  vehicle_id: string;
  vehicle_number: string;
  type: 'Truck' | 'Van' | 'Bus' | 'Trailer';
  capacity: number;
  status: 'Available' | 'In Trip' | 'Under Maintenance';
  last_service_date: string;
  next_service_due: string;
  created_at?: string;
}

export interface Driver {
  driver_id: string;
  user_id: string;
  license_number: string;
  license_expiry: string;
  experience_years: number;
  assigned_vehicle_id?: string;
  user?: User;
  vehicle?: Vehicle;
}

export interface Customer {
  customer_id: string;
  user_id: string;
  company_name?: string;
  preferred_payment_method: 'Cash' | 'Online' | 'Card' | 'UPI';
  user?: User;
}

export interface Booking {
  booking_id: string;
  customer_id: string;
  booking_date: string;
  pickup_location: string;
  drop_location: string;
  cargo_details: {
    description: string;
    weight: number;
    volume: number;
  };
  status: 'Pending' | 'Approved' | 'Rejected' | 'Scheduled' | 'Completed' | 'Cancelled';
  estimated_cost: number;
  payment_status: 'Unpaid' | 'Paid' | 'Partially Paid';
  customer?: Customer;
}

export interface Trip {
  trip_id: string;
  booking_id?: string;
  vehicle_id: string;
  driver_id: string;
  manager_id: string;
  start_time?: string;
  end_time?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  actual_cost?: number;
  booking?: Booking;
  vehicle?: Vehicle;
  driver?: Driver;
  manager?: User;
}

export interface ShipmentTracking {
  tracking_id: string;
  trip_id: string;
  status_update: 'Scheduled' | 'Picked Up' | 'In Transit' | 'Delivered';
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
  };
  remarks?: string;
  trip?: Trip;
}

export interface Payment {
  payment_id: string;
  booking_id: string;
  amount: number;
  payment_date: string;
  payment_method: 'Cash' | 'Online' | 'Card' | 'UPI';
  status: 'Success' | 'Pending' | 'Failed';
  booking?: Booking;
}

export interface Expense {
  expense_id: string;
  trip_id?: string;
  vehicle_id?: string;
  expense_type: 'Fuel' | 'Toll' | 'Maintenance' | 'Other';
  amount: number;
  date: string;
  remarks?: string;
  trip?: Trip;
  vehicle?: Vehicle;
}

export interface Notification {
  notification_id: string;
  user_id: string;
  message: string;
  type: 'Booking Update' | 'Trip Update' | 'Maintenance Alert' | 'Payment Alert';
  status: 'Read' | 'Unread';
  timestamp: string;
  user?: User;
}