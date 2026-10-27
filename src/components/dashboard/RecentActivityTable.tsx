import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  TablePagination,
  Skeleton,
  useTheme,
  Chip,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { StatusBadge } from '../common/StatusBadge';
import { useFilters } from '../../context/FilterContext';

export const RecentActivityTable: React.FC = () => {
  const theme = useTheme();
  const { filteredActivities, isLoading } = useFilters();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedActivities = filteredActivities.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getActionChipColor = (action: string) => {
    switch (action) {
      case 'Checked In':
        return 'success';
      case 'WFH Approved':
        return 'info';
      case 'Leave Approved':
        return 'warning';
      case 'Leave Requested':
        return 'default';
      default:
        return 'primary';
    }
  };

  return (
    <Card sx={{ mt: 3.5 }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
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
                backgroundColor:
                  theme.palette.mode === 'dark' ? 'rgba(79, 70, 229, 0.18)' : 'rgba(79, 70, 229, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.primary.main,
              }}
            >
              <HistoryIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                Live Employee Telemetry & Activity Feed
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Audit log of check-ins, remote authorizations, and leave status updates
              </Typography>
            </Box>
          </Box>

          <Chip
            label={`${filteredActivities.length} Events Logged`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        {/* Table or Skeletons */}
        {isLoading ? (
          <Box sx={{ py: 2 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Skeleton variant="circular" width={36} height={36} />
                <Skeleton variant="text" width="25%" height={24} />
                <Skeleton variant="text" width="20%" height={24} />
                <Skeleton variant="rectangular" width="15%" height={24} sx={{ borderRadius: 1 }} />
                <Skeleton variant="text" width="25%" height={24} />
              </Box>
            ))}
          </Box>
        ) : filteredActivities.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No recent activity logs match your current filter parameters.
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Context / Location</TableCell>
                    <TableCell align="right">Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedActivities.map((row) => (
                    <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      {/* Employee details */}
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar
                            src={row.avatar}
                            alt={row.employeeName}
                            sx={{ width: 34, height: 34, fontSize: '0.85rem' }}
                          >
                            {row.employeeName.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {row.employeeName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {row.employeeId}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* Department */}
                      <TableCell>
                        <Typography variant="body2" color="text.primary">
                          {row.department}
                        </Typography>
                      </TableCell>

                      {/* Action */}
                      <TableCell>
                        <Chip
                          label={row.action}
                          size="small"
                          color={getActionChipColor(row.action)}
                          variant="outlined"
                          sx={{ fontWeight: 600, fontSize: '0.72rem' }}
                        />
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>

                      {/* Note / Context */}
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {row.note || '—'}
                        </Typography>
                      </TableCell>

                      {/* Timestamp */}
                      <TableCell align="right">
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {row.timestamp}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredActivities.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};
