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
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import PieChartIcon from '@mui/icons-material/PieChart';
import {
  WORKFORCE_COMPOSITION,
  WORKFORCE_STATUS_BREAKDOWN,
} from '../../data/mockData';
import { useFilters } from '../../context/FilterContext';

export const WorkforceDonutChart: React.FC = () => {
  const theme = useTheme();
  const { isLoading, kpiStats } = useFilters();
  const [dataMode, setDataMode] = useState<'contract' | 'status'>('contract');

  const data = dataMode === 'contract' ? WORKFORCE_COMPOSITION : WORKFORCE_STATUS_BREAKDOWN;
  const isDark = theme.palette.mode === 'dark';

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
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                backgroundColor: isDark ? 'rgba(16, 185, 129, 0.18)' : 'rgba(16, 185, 129, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.success.main,
              }}
            >
              <PieChartIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                Workforce Composition
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Ratio across contracts & presence
              </Typography>
            </Box>
          </Box>

          <ToggleButtonGroup
            size="small"
            value={dataMode}
            exclusive
            onChange={(_, val) => val && setDataMode(val)}
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
            <ToggleButton value="contract">Type</ToggleButton>
            <ToggleButton value="status">Status</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Donut Chart with Center Label */}
        {isLoading ? (
          <Box sx={{ flexGrow: 1, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Skeleton variant="circular" width={200} height={200} />
          </Box>
        ) : (
          <Box sx={{ position: 'relative', width: '100%', height: 230, mt: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
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
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                            Count: <strong>{item.count} employees</strong>
                          </Typography>
                          <Typography variant="caption" color="primary.main" sx={{ fontWeight: 700 }}>
                            Share: {item.percentage}%
                          </Typography>
                        </Box>
                      );
                    }
                    return null;
                  }}
                />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke={isDark ? '#111827' : '#ffffff'} strokeWidth={2} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Absolute Label */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1 }}>
                {kpiStats.totalEmployees}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                Headcount
              </Typography>
            </Box>
          </Box>
        )}

        {/* Legend item badges */}
        <Box sx={{ mt: 'auto', pt: 1.5 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1,
            }}
          >
            {data.map((item) => (
              <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography variant="caption" noWrap sx={{ display: 'block', fontWeight: 600 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                    {item.percentage}% ({item.count})
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
