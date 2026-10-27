import React from 'react';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PlaceIcon from '@mui/icons-material/Place';
import BadgeIcon from '@mui/icons-material/Badge';
import { useFilters } from '../../context/FilterContext';
import type { Department, Location, AttendanceStatus } from '../../types/workforce';

const departments: (Department | 'All')[] = [
  'All',
  'Engineering',
  'Product & Design',
  'Sales',
  'Marketing',
  'Human Resources',
  'Customer Success',
  'Finance & Ops',
];

const locations: (Location | 'All')[] = [
  'All',
  'Global Headquarters',
  'New York Tech Hub',
  'London EMEA Office',
  'Bengaluru Innovation Center',
  'Remote',
];

const statuses: (AttendanceStatus | 'All')[] = [
  'All',
  'Present',
  'Work From Home',
  'On Leave',
  'Late / Half Day',
  'Absent',
];

export const FilterBar: React.FC = () => {
  const theme = useTheme();
  const {
    filters,
    setDepartment,
    setLocation,
    setStatus,
    setDateRange,
    resetFilters,
    filteredEmployees,
  } = useFilters();

  const hasActiveFilters =
    filters.department !== 'All' ||
    filters.location !== 'All' ||
    filters.status !== 'All' ||
    filters.dateRange !== 'today' ||
    filters.searchQuery !== '';

  return (
    <Card sx={{ mb: 3.5, overflow: 'visible' }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        {/* Top Header inside filter bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1.5,
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterListIcon color="primary" sx={{ fontSize: 22 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Workforce Telemetry Filters
            </Typography>
            <Chip
              label={`${filteredEmployees.length} Matching`}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600, height: 22 }}
            />
          </Box>

          {/* Date range toggle buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarMonthIcon sx={{ color: 'text.secondary', fontSize: 18, display: { xs: 'none', sm: 'block' } }} />
            <ToggleButtonGroup
              size="small"
              value={filters.dateRange}
              exclusive
              onChange={(_, val) => val && setDateRange(val)}
              sx={{
                '& .MuiToggleButton-root': {
                  px: { xs: 1, sm: 1.5 },
                  py: 0.4,
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textTransform: 'none',
                },
              }}
            >
              <ToggleButton value="today">Today</ToggleButton>
              <ToggleButton value="7days">7 Days</ToggleButton>
              <ToggleButton value="30days">30 Days</ToggleButton>
              <ToggleButton value="quarter">Q4 2026</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Filter dropdowns grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr) auto',
            },
            gap: 2,
            alignItems: 'center',
          }}
        >
          {/* Department Filter */}
          <FormControl size="small" fullWidth>
            <InputLabel id="dept-filter-label" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              Department
            </InputLabel>
            <Select
              labelId="dept-filter-label"
              value={filters.department}
              label="Department"
              onChange={(e) => setDepartment(e.target.value as Department | 'All')}
              startAdornment={<CorporateFareIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />}
              sx={{ borderRadius: 2 }}
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept === 'All' ? 'All Departments' : dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Location Filter */}
          <FormControl size="small" fullWidth>
            <InputLabel id="loc-filter-label">Location</InputLabel>
            <Select
              labelId="loc-filter-label"
              value={filters.location}
              label="Location"
              onChange={(e) => setLocation(e.target.value as Location | 'All')}
              startAdornment={<PlaceIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />}
              sx={{ borderRadius: 2 }}
            >
              {locations.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc === 'All' ? 'All Locations' : loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Status Filter */}
          <FormControl size="small" fullWidth>
            <InputLabel id="status-filter-label">Attendance Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={filters.status}
              label="Attendance Status"
              onChange={(e) => setStatus(e.target.value as AttendanceStatus | 'All')}
              startAdornment={<BadgeIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />}
              sx={{ borderRadius: 2 }}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status === 'All' ? 'All Statuses' : status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Clear Filters Button */}
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterAltOffIcon />}
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            sx={{
              height: 40,
              whiteSpace: 'nowrap',
              borderRadius: 2,
              px: 2,
              fontWeight: 600,
              fontSize: '0.82rem',
              borderColor: theme.palette.divider,
            }}
          >
            Clear Filters
          </Button>
        </Box>

        {/* Active Filters chips bar */}
        {hasActiveFilters && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mt: 2, pt: 1.5, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              Applied Filters:
            </Typography>
            {filters.department !== 'All' && (
              <Chip
                label={`Dept: ${filters.department}`}
                size="small"
                onDelete={() => setDepartment('All')}
                color="primary"
                variant="outlined"
              />
            )}
            {filters.location !== 'All' && (
              <Chip
                label={`Loc: ${filters.location}`}
                size="small"
                onDelete={() => setLocation('All')}
                color="primary"
                variant="outlined"
              />
            )}
            {filters.status !== 'All' && (
              <Chip
                label={`Status: ${filters.status}`}
                size="small"
                onDelete={() => setStatus('All')}
                color="primary"
                variant="outlined"
              />
            )}
            {filters.searchQuery && (
              <Chip
                label={`Query: "${filters.searchQuery}"`}
                size="small"
                onDelete={() => {}}
                color="secondary"
                variant="outlined"
              />
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
