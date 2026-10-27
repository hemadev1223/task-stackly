import React from 'react';
import { Chip } from '@mui/material';
import type { ChipProps } from '@mui/material';
import type { AttendanceStatus } from '../../types/workforce';

interface StatusBadgeProps {
  status: AttendanceStatus;
  size?: ChipProps['size'];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'small' }) => {
  let color: ChipProps['color'] = 'default';
  let label = status;

  switch (status) {
    case 'Present':
      color = 'success';
      break;
    case 'Work From Home':
      color = 'info';
      break;
    case 'On Leave':
      color = 'warning';
      break;
    case 'Late / Half Day':
      color = 'secondary';
      break;
    case 'Absent':
      color = 'error';
      break;
    default:
      color = 'default';
  }

  return (
    <Chip
      size={size}
      label={label}
      color={color}
      variant="filled"
      sx={{
        fontWeight: 600,
        fontSize: size === 'small' ? '0.72rem' : '0.8rem',
        height: size === 'small' ? 22 : 28,
        borderRadius: '6px',
      }}
    />
  );
};
