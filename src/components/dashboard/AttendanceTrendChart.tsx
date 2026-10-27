import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Skeleton,
  useTheme,
} from '@mui/material';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {
  ATTENDANCE_TREND_DAILY,
  ATTENDANCE_TREND_WEEKLY,
  ATTENDANCE_TREND_MONTHLY,
} from '../../data/mockData';
import { useFilters } from '../../context/FilterContext';

export const AttendanceTrendChart: React.FC = () => {
  const theme = useTheme();
  const { isLoading } = useFilters();
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const chartData =
    viewMode === 'daily'
      ? ATTENDANCE_TREND_DAILY
      : viewMode === 'weekly'
      ? ATTENDANCE_TREND_WEEKLY
      : ATTENDANCE_TREND_MONTHLY;

  const isDark = theme.palette.mode === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9';
  const textColor = isDark ? '#9ca3af' : '#64748b';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 2, sm: 2.5 } }}>
        {/* Header & Controls */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1.5,
            mb: 2.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                backgroundColor: isDark ? 'rgba(79, 70, 229, 0.18)' : 'rgba(79, 70, 229, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.primary.main,
              }}
            >
              <ShowChartIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                Attendance Velocity & Trend
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Tracking on-site presence vs enterprise target (92%)
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label="Stackly Target: 92%"
              size="small"
              color="success"
              variant="outlined"
              sx={{ height: 24, fontSize: '0.72rem', fontWeight: 600 }}
            />
            <ToggleButtonGroup
              size="small"
              value={viewMode}
              exclusive
              onChange={(_, val) => val && setViewMode(val)}
              sx={{
                '& .MuiToggleButton-root': {
                  px: 1.2,
                  py: 0.3,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'none',
                },
              }}
            >
              <ToggleButton value="daily">Daily</ToggleButton>
              <ToggleButton value="weekly">Weekly</ToggleButton>
              <ToggleButton value="monthly">Monthly</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Chart View */}
        {isLoading ? (
          <Box sx={{ flexGrow: 1, height: 280, display: 'flex', alignItems: 'center' }}>
            <Skeleton variant="rectangular" width="100%" height={260} sx={{ borderRadius: 2 }} />
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, minHeight: 280, width: '100%', mt: 1 }}>
            <ResponsiveContainer width="100%" height={290}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="wfhGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="label"
                  stroke={textColor}
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                />
                <YAxis
                  domain={[80, 100]}
                  stroke={textColor}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <Box
                          sx={{
                            backgroundColor: isDark ? '#1f2937' : '#ffffff',
                            border: `1px solid ${isDark ? '#374151' : '#e2e8f0'}`,
                            borderRadius: 2,
                            p: 1.5,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {label} ({data.date})
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: theme.palette.primary.main }} />
                            <Typography variant="caption" color="text.secondary">
                              Attendance Rate: <strong>{data.attendanceRate}%</strong>
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: theme.palette.success.main }} />
                            <Typography variant="caption" color="text.secondary">
                              Present: <strong>{data.presentCount}</strong>
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: theme.palette.secondary.main }} />
                            <Typography variant="caption" color="text.secondary">
                              WFH: <strong>{data.wfhCount}</strong>
                            </Typography>
                          </Box>
                        </Box>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: 10, fontSize: '0.8rem' }}
                  iconType="circle"
                />
                <ReferenceLine
                  y={92}
                  label={{
                    value: 'Target 92%',
                    position: 'insideTopRight',
                    fill: theme.palette.success.main,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                  stroke={theme.palette.success.main}
                  strokeDasharray="4 4"
                />
                <Area
                  type="monotone"
                  dataKey="attendanceRate"
                  name="Attendance %"
                  stroke={theme.palette.primary.main}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#attendanceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
