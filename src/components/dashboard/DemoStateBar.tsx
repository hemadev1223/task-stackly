import React from 'react';
import { Box, Paper, Typography, Button, ButtonGroup, Chip, useTheme } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import { useFilters } from '../../context/FilterContext';

export const DemoStateBar: React.FC = () => {
  const theme = useTheme();
  const {
    isLoading,
    setIsLoading,
    hasError,
    setHasError,
    resetFilters,
    setSearchQuery,
    filters,
  } = useFilters();

  const handleSimulateEmpty = () => {
    setSearchQuery('XYZ_NON_EXISTENT_QUERY');
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        mb: 3,
        borderRadius: 2.5,
        backgroundColor:
          theme.palette.mode === 'dark' ? 'rgba(79, 70, 229, 0.08)' : 'rgba(79, 70, 229, 0.05)',
        border: `1px dashed ${theme.palette.mode === 'dark' ? 'rgba(79, 70, 229, 0.3)' : 'rgba(79, 70, 229, 0.25)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <BugReportOutlinedIcon color="primary" sx={{ fontSize: 20 }} />
        <Typography variant="caption" color="primary" sx={{ fontWeight: 700 }}>
          QA / EVALUATION CONTROLS (Requirement #10: Loading, Empty & Error States):
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <ButtonGroup size="small" variant="outlined">
          <Button
            onClick={() => setIsLoading(!isLoading)}
            color={isLoading ? 'primary' : 'inherit'}
            variant={isLoading ? 'contained' : 'outlined'}
            startIcon={<HourglassEmptyIcon sx={{ fontSize: 16 }} />}
            sx={{ fontSize: '0.75rem', py: 0.5 }}
          >
            {isLoading ? 'Stop Loading' : 'Simulate Loading'}
          </Button>

          <Button
            onClick={() => setHasError(!hasError)}
            color={hasError ? 'error' : 'inherit'}
            variant={hasError ? 'contained' : 'outlined'}
            startIcon={<ErrorOutlinedIcon sx={{ fontSize: 16 }} />}
            sx={{ fontSize: '0.75rem', py: 0.5 }}
          >
            {hasError ? 'Clear Error' : 'Simulate Error'}
          </Button>

          <Button
            onClick={handleSimulateEmpty}
            color="inherit"
            startIcon={<SearchOffIcon sx={{ fontSize: 16 }} />}
            sx={{ fontSize: '0.75rem', py: 0.5 }}
          >
            Simulate Empty
          </Button>
        </ButtonGroup>

        {(isLoading || hasError || filters.searchQuery || filters.department !== 'All' || filters.location !== 'All' || filters.status !== 'All') && (
          <Chip
            icon={<RestartAltIcon sx={{ fontSize: '14px !important' }} />}
            label="Reset All"
            size="small"
            onClick={resetFilters}
            color="secondary"
            variant="filled"
            sx={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.72rem' }}
          />
        )}
      </Box>
    </Paper>
  );
};
