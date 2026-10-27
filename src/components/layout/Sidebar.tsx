import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import HistoryIcon from '@mui/icons-material/History';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HubIcon from '@mui/icons-material/Hub';
import { CURRENT_USER } from '../../data/mockData';

export const DRAWER_WIDTH = 260;

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  activeItem?: string;
  onSelectItem?: (item: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: <DashboardIcon />, badge: 'Live' },
  { id: 'workforce', label: 'Workforce Directory', icon: <PeopleAltIcon /> },
  { id: 'attendance', label: 'Attendance & Shifts', icon: <DateRangeIcon /> },
  { id: 'leaves', label: 'Leave Tracking', icon: <EventAvailableIcon /> },
  { id: 'departments', label: 'Department Analytics', icon: <CorporateFareIcon /> },
  { id: 'activity', label: 'Real-time Activity', icon: <HistoryIcon /> },
  { id: 'reports', label: 'Executive Reports', icon: <AssessmentIcon /> },
  { id: 'settings', label: 'Platform Settings', icon: <SettingsIcon /> },
];

export const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  onMobileClose,
  activeItem = 'dashboard',
  onSelectItem,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#ffffff',
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Brand Header */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
          }}
        >
          <HubIcon sx={{ fontSize: 26 }} />
        </Box>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Stackly
            </Typography>
            <Chip
              label="v2.4"
              size="small"
              sx={{
                height: 18,
                fontSize: '0.65rem',
                fontWeight: 700,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(79,70,229,0.2)' : 'rgba(79,70,229,0.1)',
                color: theme.palette.primary.main,
              }}
            />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 500 }}>
            Workforce Analytics
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 0.5 }} />

      {/* Nav List */}
      <Box sx={{ flexGrow: 1, px: 1.5, py: 1.5, overflowY: 'auto' }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ px: 1.5, mb: 1, display: 'block', fontWeight: 700, letterSpacing: '0.06em' }}
        >
          OVERVIEW & METRICS
        </Typography>
        <List disablePadding>
          {menuItems.map((item) => {
            const isSelected = activeItem === item.id;
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => {
                    onSelectItem?.(item.id);
                    if (isMobile) onMobileClose();
                  }}
                  sx={{
                    borderRadius: 2,
                    py: 1,
                    px: 1.5,
                    color: isSelected
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    backgroundColor: isSelected
                      ? theme.palette.mode === 'dark'
                        ? 'rgba(79, 70, 229, 0.15)'
                        : 'rgba(79, 70, 229, 0.08)'
                      : 'transparent',
                    '&.Mui-selected': {
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? 'rgba(79, 70, 229, 0.18)'
                          : 'rgba(79, 70, 229, 0.1)',
                      '&:hover': {
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? 'rgba(79, 70, 229, 0.25)'
                            : 'rgba(79, 70, 229, 0.14)',
                      },
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                      color: theme.palette.text.primary,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isSelected ? theme.palette.primary.main : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: isSelected ? 700 : 500 }}>
                        {item.label}
                      </Typography>
                    }
                  />
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      color="primary"
                      sx={{
                        height: 20,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        borderRadius: 1,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Tagline snippet */}
      <Box sx={{ px: 2, py: 1.5, mx: 1.5, mb: 1.5, borderRadius: 2, backgroundColor: 'action.hover' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontStyle: 'italic', fontSize: '0.72rem' }}>
          “{CURRENT_USER.tagline}”
        </Typography>
      </Box>

      <Divider />

      {/* User Profile Card */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          backgroundColor: theme.palette.mode === 'dark' ? '#0b0f19' : '#f8fafc',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={CURRENT_USER.avatar}
            alt={CURRENT_USER.name}
            sx={{ width: 40, height: 40, border: `2px solid ${theme.palette.primary.main}` }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: theme.palette.success.main,
              border: `2px solid ${theme.palette.background.paper}`,
            }}
          />
        </Box>
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700 }}>
            {CURRENT_USER.fullName}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
            {CURRENT_USER.role}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};
