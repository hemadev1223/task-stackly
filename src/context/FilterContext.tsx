import React, { createContext, useContext, useState, useMemo } from 'react';
import type {
  Department,
  Location,
  AttendanceStatus,
  FilterState,
  KPIStats,
  Employee,
  ActivityLog,
  DepartmentMetric,
} from '../types/workforce';
import {
  INITIAL_EMPLOYEES,
  INITIAL_ACTIVITIES,
  DEPARTMENT_METRICS,
} from '../data/mockData';

interface FilterContextType {
  filters: FilterState;
  setDepartment: (dept: Department | 'All') => void;
  setLocation: (loc: Location | 'All') => void;
  setStatus: (status: AttendanceStatus | 'All') => void;
  setDateRange: (range: FilterState['dateRange']) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
  
  // State Simulation controls (as per Requirement 10: Loading, Empty, and Error states)
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  hasError: boolean;
  setHasError: (error: boolean) => void;
  retryLoad: () => void;

  // Filtered computed outputs
  filteredEmployees: Employee[];
  filteredActivities: ActivityLog[];
  departmentMetrics: DepartmentMetric[];
  kpiStats: KPIStats;
  isEmpty: boolean;
}

const defaultFilters: FilterState = {
  dateRange: 'today',
  department: 'All',
  location: 'All',
  status: 'All',
  searchQuery: '',
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const setDepartment = (dept: Department | 'All') => {
    setFilters((prev) => ({ ...prev, department: dept }));
  };

  const setLocation = (loc: Location | 'All') => {
    setFilters((prev) => ({ ...prev, location: loc }));
  };

  const setStatus = (status: AttendanceStatus | 'All') => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const setDateRange = (dateRange: FilterState['dateRange']) => {
    setFilters((prev) => ({ ...prev, dateRange }));
  };

  const setSearchQuery = (searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setHasError(false);
  };

  const retryLoad = () => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return INITIAL_EMPLOYEES.filter((emp) => {
      const matchDept = filters.department === 'All' || emp.department === filters.department;
      const matchLoc = filters.location === 'All' || emp.location === filters.location;
      const matchStatus = filters.status === 'All' || emp.status === filters.status;
      const matchSearch =
        !filters.searchQuery.trim() ||
        emp.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        emp.id.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return matchDept && matchLoc && matchStatus && matchSearch;
    });
  }, [filters]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    return INITIAL_ACTIVITIES.filter((act) => {
      const matchDept = filters.department === 'All' || act.department === filters.department;
      const matchStatus = filters.status === 'All' || act.status === filters.status;
      const matchSearch =
        !filters.searchQuery.trim() ||
        act.employeeName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        act.action.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        (act.note && act.note.toLowerCase().includes(filters.searchQuery.toLowerCase()));

      return matchDept && matchStatus && matchSearch;
    });
  }, [filters]);

  // Department metrics calculation
  const departmentMetrics = useMemo(() => {
    if (filters.department !== 'All') {
      return DEPARTMENT_METRICS.filter((m) => m.department === filters.department);
    }
    return DEPARTMENT_METRICS;
  }, [filters.department]);

  // Dynamically calculate KPI Stats from filtered set
  const kpiStats = useMemo<KPIStats>(() => {
    const total = filteredEmployees.length;
    if (total === 0) {
      return {
        totalEmployees: 0,
        totalChangeMoM: 0,
        presentToday: 0,
        attendanceRate: 0,
        onLeave: 0,
        leaveBreakdown: { casual: 0, sick: 0, annual: 0 },
        remoteWFH: 0,
        remotePercentage: 0,
        avgWorkingHours: 0,
        hoursChangeVsLastWeek: 0,
      };
    }

    const present = filteredEmployees.filter(
      (e) => e.status === 'Present' || e.status === 'Late / Half Day'
    ).length;
    const leave = filteredEmployees.filter((e) => e.status === 'On Leave').length;
    const remote = filteredEmployees.filter(
      (e) => e.status === 'Work From Home' || e.employmentType === 'Remote'
    ).length;

    const rate = Math.round((present / total) * 1000) / 10;
    const remotePct = Math.round((remote / total) * 1000) / 10;

    const validHours = filteredEmployees
      .map((e) => e.hoursWorkedToday || 0)
      .filter((h) => h > 0);
    const avgHrs =
      validHours.length > 0
        ? Math.round((validHours.reduce((a, b) => a + b, 0) / validHours.length) * 10) / 10
        : 8.2;

    return {
      totalEmployees: total,
      totalChangeMoM: 5.4,
      presentToday: present,
      attendanceRate: rate,
      onLeave: leave,
      leaveBreakdown: {
        casual: Math.ceil(leave * 0.4),
        sick: Math.floor(leave * 0.4),
        annual: Math.floor(leave * 0.2),
      },
      remoteWFH: remote,
      remotePercentage: remotePct,
      avgWorkingHours: avgHrs,
      hoursChangeVsLastWeek: 0.3,
    };
  }, [filteredEmployees]);

  const isEmpty = filteredEmployees.length === 0;

  return (
    <FilterContext.Provider
      value={{
        filters,
        setDepartment,
        setLocation,
        setStatus,
        setDateRange,
        setSearchQuery,
        resetFilters,
        isLoading,
        setIsLoading,
        hasError,
        setHasError,
        retryLoad,
        filteredEmployees,
        filteredActivities,
        departmentMetrics,
        kpiStats,
        isEmpty,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
