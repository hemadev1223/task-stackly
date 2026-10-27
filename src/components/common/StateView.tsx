import React from 'react';
import { Box, Typography, Button, Paper, Alert, AlertTitle } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No workforce records match your filters',
  description = 'Try adjusting your department, status, location, or search keywords to view analytics.',
  onReset,
}) => {
  return (
    <Paper
      sx={{
        p: 6,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        my: 3,
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          backgroundColor: 'action.hover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
          mb: 2,
        }}
      >
        <SearchOffIcon sx={{ fontSize: 40 }} />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500, mb: 3 }}>
        {description}
      </Typography>
      {onReset && (
        <Button
          variant="contained"
          startIcon={<FilterAltOffIcon />}
          onClick={onReset}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Reset All Filters
        </Button>
      )}
    </Paper>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to load workforce analytics data',
  message = 'An unexpected network error occurred while communicating with the Stackly workforce telemetry service. Please verify connectivity and try again.',
  onRetry,
}) => {
  return (
    <Box sx={{ my: 3 }}>
      <Alert
        severity="error"
        icon={<ErrorOutlinedIcon fontSize="inherit" />}
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={onRetry}
              sx={{ fontWeight: 700 }}
            >
              Retry
            </Button>
          )
        }
        sx={{
          borderRadius: 2,
          p: 2,
          alignItems: 'center',
          '& .MuiAlert-message': { width: '100%' },
        }}
      >
        <AlertTitle sx={{ fontWeight: 700 }}>{title}</AlertTitle>
        <Typography variant="body2">{message}</Typography>
      </Alert>
    </Box>
  );
};
