import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Skeleton,
  useTheme,
} from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { useFilters } from '../../context/FilterContext';

export const DepartmentDistributionChart: React.FC = () => {
  const theme = useTheme();
  const { departmentMetrics, isLoading } = useFilters();
  const [metricView, setMetricView] = useState<'headcount' | 'rates'>('headcount');

  const isDark = theme.palette.mode === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9';
  const textColor = isDark ? '#9ca3af' : '#64748b';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 2, sm: 2.5 } }}>
        {/* Header */}
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
                backgroundColor: isDark ? 'rgba(6, 182, 212, 0.18)' : 'rgba(6, 182, 212, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.secondary.main,
              }}
            >
              <CorporateFareIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                Department Headcount & Velocity
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Workforce volume breakdown by functional org units
              </Typography>
            </Box>
          </Box>

          <ToggleButtonGroup
            size="small"
            value={metricView}
            exclusive
            onChange={(_, val) => val && setMetricView(val)}
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
            <ToggleButton value="headcount">Headcount</ToggleButton>
            <ToggleButton value="rates">Attendance %</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Chart View */}
        {isLoading ? (
          <Box sx={{ flexGrow: 1, height: 280, display: 'flex', alignItems: 'center' }}>
            <Skeleton variant="rectangular" width="100%" height={260} sx={{ borderRadius: 2 }} />
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, minHeight: 280, width: '100%', mt: 1 }}>
            <ResponsiveContainer width="100%" height={290}>
              {metricView === 'headcount' ? (
                <BarChart data={departmentMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <XAxis
                    dataKey="department"
                    stroke={textColor}
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: gridColor }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis
                    stroke={textColor}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
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
                              {label}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block' }}>
                              Total Headcount: <strong>{data.totalEmployees}</strong>
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', color: 'success.main' }}>
                              Present On-site: <strong>{data.present}</strong>
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', color: 'info.main' }}>
                              Work From Home: <strong>{data.wfh}</strong>
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', color: 'warning.main' }}>
                              On Leave: <strong>{data.onLeave}</strong>
                            </Typography>
                          </Box>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: 20, fontSize: '0.8rem' }} iconType="circle" />
                  <Bar
                    dataKey="present"
                    name="Present"
                    fill={theme.palette.primary.main}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                  />
                  <Bar
                    dataKey="wfh"
                    name="WFH"
                    fill={theme.palette.secondary.main}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                  />
                  <Bar
                    dataKey="onLeave"
                    name="On Leave"
                    fill={theme.palette.warning.main}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                  />
                </BarChart>
              ) : (
                <BarChart data={departmentMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <XAxis
                    dataKey="department"
                    stroke={textColor}
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: gridColor }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis
                    domain={[85, 100]}
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
                              {label}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block' }}>
                              Attendance Rate: <strong>{data.attendanceRate}%</strong>
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block' }}>
                              Avg Daily Hours: <strong>{data.avgHours} hrs</strong>
                            </Typography>
                          </Box>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="attendanceRate"
                    name="Attendance Rate %"
                    fill={theme.palette.success.main}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={44}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
