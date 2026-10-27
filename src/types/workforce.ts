export type Department =
  | 'Engineering'
  | 'Product & Design'
  | 'Sales'
  | 'Marketing'
  | 'Human Resources'
  | 'Customer Success'
  | 'Finance & Ops';

export type Location =
  | 'Global Headquarters'
  | 'New York Tech Hub'
  | 'London EMEA Office'
  | 'Bengaluru Innovation Center'
  | 'Remote';

export type EmploymentType = 'Full-time' | 'Contract' | 'Remote' | 'Intern';

export type AttendanceStatus = 'Present' | 'On Leave' | 'Work From Home' | 'Late / Half Day' | 'Absent';

export type ActivityAction =
  | 'Checked In'
  | 'Checked Out'
  | 'WFH Approved'
  | 'Leave Requested'
  | 'Leave Approved'
  | 'Department Transfer'
  | 'New Hire Onboarded';

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: Department;
  location: Location;
  employmentType: EmploymentType;
  status: AttendanceStatus;
  checkInTime?: string;
  checkOutTime?: string;
  hoursWorkedToday?: number;
  productivityScore?: number;
  joinedDate: string;
}

export interface ActivityLog {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  department: Department;
  action: ActivityAction;
  timestamp: string;
  status: AttendanceStatus;
  note?: string;
}

export interface AttendanceTrendPoint {
  date: string;
  label: string;
  attendanceRate: number; // percentage
  presentCount: number;
  wfhCount: number;
  leaveCount: number;
  targetRate: number;
}

export interface DepartmentMetric {
  department: Department;
  totalEmployees: number;
  present: number;
  wfh: number;
  onLeave: number;
  attendanceRate: number;
  avgHours: number;
}

export interface WorkforceDistribution {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface FilterState {
  dateRange: 'today' | '7days' | '30days' | 'quarter';
  department: Department | 'All';
  location: Location | 'All';
  status: AttendanceStatus | 'All';
  searchQuery: string;
}

export interface KPIStats {
  totalEmployees: number;
  totalChangeMoM: number;
  presentToday: number;
  attendanceRate: number;
  onLeave: number;
  leaveBreakdown: { casual: number; sick: number; annual: number };
  remoteWFH: number;
  remotePercentage: number;
  avgWorkingHours: number;
  hoursChangeVsLastWeek: number;
}
