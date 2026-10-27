import React from 'react';
import { Grid, useTheme } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { MetricCard } from '../common/MetricCard';
import { useFilters } from '../../context/FilterContext';

export const KpiGrid: React.FC = () => {
  const theme = useTheme();
  const { kpiStats, isLoading } = useFilters();

  return (
    <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
      {/* 1. Total Workforce */}
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
        <MetricCard
          title="Total Workforce"
          value={kpiStats.totalEmployees.toLocaleString()}
          subtitle="Active talent base"
          trend={{ value: kpiStats.totalChangeMoM, isPositiveGood: true, text: 'vs last month' }}
          icon={<GroupsIcon sx={{ fontSize: 24, color: theme.palette.primary.main }} />}
          iconBgColor={theme.palette.mode === 'dark' ? 'rgba(79, 70, 229, 0.18)' : 'rgba(79, 70, 229, 0.1)'}
          loading={isLoading}
        />
      </Grid>

      {/* 2. Present Today */}
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
        <MetricCard
          title="Present Today"
          value={kpiStats.presentToday.toLocaleString()}
          subtitle={`${kpiStats.attendanceRate}% Attendance Rate`}
          progress={kpiStats.attendanceRate}
          progressColor="success"
          trend={{ value: 2.1, isPositiveGood: true }}
          icon={<CheckCircleIcon sx={{ fontSize: 24, color: theme.palette.success.main }} />}
          iconBgColor={theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.18)' : 'rgba(16, 185, 129, 0.1)'}
          loading={isLoading}
        />
      </Grid>

      {/* 3. On Leave */}
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
        <MetricCard
          title="On Leave"
          value={kpiStats.onLeave.toLocaleString()}
          subtitle={`${kpiStats.leaveBreakdown.casual} Casual · ${kpiStats.leaveBreakdown.sick} Sick`}
          trend={{ value: -1.2, isPositiveGood: false, text: 'planned absences' }}
          icon={<EventBusyIcon sx={{ fontSize: 24, color: theme.palette.warning.main }} />}
          iconBgColor={theme.palette.mode === 'dark' ? 'rgba(245, 158, 11, 0.18)' : 'rgba(245, 158, 11, 0.1)'}
          loading={isLoading}
        />
      </Grid>

      {/* 4. Remote / WFH */}
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
        <MetricCard
          title="Remote / WFH"
          value={kpiStats.remoteWFH.toLocaleString()}
          subtitle={`${kpiStats.remotePercentage}% of current workforce`}
          progress={kpiStats.remotePercentage}
          progressColor="info"
          trend={{ value: 0.8, isPositiveGood: true }}
          icon={<HomeWorkIcon sx={{ fontSize: 24, color: theme.palette.info.main }} />}
          iconBgColor={theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.18)' : 'rgba(59, 130, 246, 0.1)'}
          loading={isLoading}
        />
      </Grid>

      {/* 5. Avg Working Hours */}
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
        <MetricCard
          title="Avg Daily Hours"
          value={`${kpiStats.avgWorkingHours}h`}
          subtitle="Target: 8.0h / day"
          progress={Math.round((kpiStats.avgWorkingHours / 8.0) * 100)}
          progressColor="secondary"
          trend={{ value: kpiStats.hoursChangeVsLastWeek, isPositiveGood: true }}
          icon={<AccessTimeIcon sx={{ fontSize: 24, color: theme.palette.secondary.main }} />}
          iconBgColor={theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.18)' : 'rgba(6, 182, 212, 0.1)'}
          loading={isLoading}
        />
      </Grid>
    </Grid>
  );
};
