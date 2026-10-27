import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  useTheme,
  Stack,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ThemeProvider } from './context/ThemeContext';
import { FilterProvider, useFilters } from './context/FilterContext';
import { AppLayout } from './components/layout/AppLayout';
import { DemoStateBar } from './components/dashboard/DemoStateBar';
import { FilterBar } from './components/dashboard/FilterBar';
import { KpiGrid } from './components/dashboard/KpiGrid';
import { AttendanceTrendChart } from './components/dashboard/AttendanceTrendChart';
import { WorkforceDonutChart } from './components/dashboard/WorkforceDonutChart';
import { DepartmentDistributionChart } from './components/dashboard/DepartmentDistributionChart';
import { RecentActivityTable } from './components/dashboard/RecentActivityTable';
import { EmptyState, ErrorState } from './components/common/StateView';
import { CURRENT_USER } from './data/mockData';

const DashboardContent: React.FC = () => {
  const theme = useTheme();
  const { hasError, retryLoad, isEmpty, resetFilters, setIsLoading } = useFilters();

  const handleManualRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  return (
    <Box>
      {/* Page Title & Quick Actions Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 0.5 }}>
            Workforce Analytics Platform
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back, <strong>{CURRENT_USER.fullName}</strong> · Real-time attendance, capacity & org telemetry
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleManualRefresh}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '0.85rem',
              borderColor: theme.palette.divider,
            }}
          >
            Sync Telemetry
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={() => alert('Exporting Stackly Workforce Executive Summary (CSV/PDF)...')}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '0.85rem',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
            }}
          >
            Export Report
          </Button>
        </Stack>
      </Box>

      {/* QA / Evaluation Demo State Bar (Requirement 10) */}
      <DemoStateBar />

      {/* Error State Banner with Retry (Requirement 10) */}
      {hasError && <ErrorState onRetry={retryLoad} />}

      {/* Filter Bar Toolbar (Requirement 7) */}
      <FilterBar />

      {/* Main Content or Empty State Handling (Requirement 10) */}
      {isEmpty && !hasError ? (
        <EmptyState onReset={resetFilters} />
      ) : (
        <>
          {/* Five KPI Cards (Requirement 2) */}
          <KpiGrid />

          {/* Visual Analytics Charts (Requirements 3, 4, 5) */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Attendance Trend Chart (Requirement 3) */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <AttendanceTrendChart />
            </Grid>

            {/* Workforce Pie/Donut Chart (Requirement 5) */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <WorkforceDonutChart />
            </Grid>

            {/* Department Distribution Chart (Requirement 4) */}
            <Grid size={{ xs: 12 }}>
              <DepartmentDistributionChart />
            </Grid>
          </Grid>

          {/* Recent Employee Activity Table (Requirement 6) */}
          <RecentActivityTable />
        </>
      )}
    </Box>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <FilterProvider>
        <AppLayout>
          <DashboardContent />
        </AppLayout>
      </FilterProvider>
    </ThemeProvider>
  );
};

export default App;
