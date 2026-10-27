import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  LinearProgress,
  useTheme,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositiveGood?: boolean;
    text?: string;
  };
  icon: React.ReactNode;
  iconBgColor?: string;
  progress?: number; // 0 - 100
  progressColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  loading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  iconBgColor,
  progress,
  progressColor = 'primary',
  loading = false,
}) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Card sx={{ height: '100%', p: 1 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="circular" width={44} height={44} />
          </Box>
          <Skeleton variant="text" width="40%" height={40} />
          <Skeleton variant="text" width="80%" height={20} />
          {progress !== undefined && <Skeleton variant="rectangular" height={6} sx={{ mt: 1.5, borderRadius: 1 }} />}
        </CardContent>
      </Card>
    );
  }

  const isPositive = trend ? trend.value >= 0 : true;
  const isGood = trend?.isPositiveGood !== undefined ? (isPositive ? trend.isPositiveGood : !trend.isPositiveGood) : isPositive;
  const trendColor = isGood ? theme.palette.success.main : theme.palette.error.main;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.75rem', fontWeight: 600 }}
            >
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 700 }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 46,
              height: 46,
              borderRadius: '12px',
              backgroundColor: iconBgColor || theme.palette.action.hover,
              color: theme.palette.primary.main,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {icon}
          </Box>
        </Box>

        {progress !== undefined && (
          <Box sx={{ my: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Capacity / Target
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(progress, 100)}
              color={progressColor}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {trend && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                px: 0.8,
                py: 0.2,
                borderRadius: '6px',
                backgroundColor: isGood ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                color: trendColor,
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              {isPositive ? <TrendingUpIcon sx={{ fontSize: 14 }} /> : <TrendingDownIcon sx={{ fontSize: 14 }} />}
              <span>{Math.abs(trend.value)}%</span>
            </Box>
          )}
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
