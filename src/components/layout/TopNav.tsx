import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  ListItemIcon,
  useTheme,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useAppTheme } from '../../context/ThemeContext';
import { useFilters } from '../../context/FilterContext';
import { CURRENT_USER } from '../../data/mockData';
import { DRAWER_WIDTH } from './Sidebar';

interface TopNavProps {
  onDrawerToggle: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onDrawerToggle }) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useAppTheme();
  const { filters, setSearchQuery } = useFilters();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNotif, setAnchorElNotif] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotifMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotif(event.currentTarget);
  };

  const handleCloseNotifMenu = () => {
    setAnchorElNotif(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(11, 15, 25, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar sx={{ minHeight: '68px !important', px: { xs: 2, sm: 3 } }}>
        {/* Mobile toggle */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Global Search Bar */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: '10px',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            border: `1px solid ${theme.palette.divider}`,
            mr: 2,
            width: { xs: '180px', sm: '280px', md: '340px' },
            display: 'flex',
            alignItems: 'center',
            px: 1.5,
            py: 0.5,
            transition: 'border-color 0.2s',
            '&:focus-within': {
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 0 2px ${theme.palette.mode === 'dark' ? 'rgba(79,70,229,0.3)' : 'rgba(79,70,229,0.15)'}`,
            },
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
          <InputBase
            placeholder="Search employees, roles, IDs..."
            value={filters.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              color: 'inherit',
              width: '100%',
              fontSize: '0.875rem',
              '& input::placeholder': {
                color: 'text.secondary',
                opacity: 1,
              },
            }}
          />
        </Box>

        {/* Live sync pill badge (visible on larger screens) */}
        <Chip
          icon={<FiberManualRecordIcon sx={{ fontSize: '10px !important', color: '#10b981 !important' }} />}
          label="Stackly Live Sync: Operational"
          size="small"
          sx={{
            display: { xs: 'none', lg: 'inline-flex' },
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.08)',
            color: '#10b981',
            fontWeight: 600,
            fontSize: '0.75rem',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        {/* Action icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Dark / Light Mode Toggle */}
          <Tooltip title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}>
            <IconButton onClick={toggleTheme} color="inherit" sx={{ width: 40, height: 40 }}>
              {mode === 'dark' ? (
                <LightModeIcon sx={{ color: '#fbbf24', fontSize: 22 }} />
              ) : (
                <DarkModeIcon sx={{ color: '#64748b', fontSize: 22 }} />
              )}
            </IconButton>
          </Tooltip>

          {/* Notifications button */}
          <Tooltip title="Notifications (3 unread)">
            <IconButton color="inherit" onClick={handleOpenNotifMenu} sx={{ width: 40, height: 40 }}>
              <Badge badgeContent={3} color="primary">
                <NotificationsIcon sx={{ fontSize: 22, color: 'text.secondary' }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Notifications Popover */}
          <Menu
            anchorEl={anchorElNotif}
            open={Boolean(anchorElNotif)}
            onClose={handleCloseNotifMenu}
            slotProps={{
              paper: {
                sx: {
                  width: 320,
                  maxHeight: 380,
                  mt: 1.5,
                  borderRadius: 3,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Notifications
              </Typography>
              <Chip label="3 New" size="small" color="primary" sx={{ height: 20, fontSize: '0.7rem' }} />
            </Box>
            <Divider />
            <MenuItem onClick={handleCloseNotifMenu} sx={{ py: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                <CheckCircleOutlinedIcon color="success" sx={{ fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>WFH Request Approved</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ pl: 3.2 }}>
                Priya Sharma approved for remote sprint day 2.
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNotifMenu} sx={{ py: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                <FiberManualRecordIcon color="warning" sx={{ fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Shift Attendance Alert</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ pl: 3.2 }}>
                Bengaluru Center reached 95% threshold.
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNotifMenu} sx={{ py: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                <CheckCircleOutlinedIcon color="info" sx={{ fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Weekly Report Ready</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ pl: 3.2 }}>
                W43 Workforce summary generated.
              </Typography>
            </MenuItem>
          </Menu>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 24, alignSelf: 'center' }} />

          {/* User profile avatar and trigger */}
          <Box
            onClick={handleOpenUserMenu}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              cursor: 'pointer',
              p: 0.5,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Avatar
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              sx={{ width: 36, height: 36, border: `2px solid ${theme.palette.primary.main}` }}
            />
            <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'left' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {CURRENT_USER.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Stackly Lead
              </Typography>
            </Box>
          </Box>

          {/* User Account Menu */}
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            slotProps={{
              paper: {
                sx: {
                  width: 240,
                  mt: 1.5,
                  borderRadius: 3,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {CURRENT_USER.fullName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {CURRENT_USER.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleCloseUserMenu}>
              <ListItemIcon>
                <PersonOutlinedIcon fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <ListItemIcon>
                <SettingsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Preferences
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseUserMenu} sx={{ color: theme.palette.error.main }}>
              <ListItemIcon>
                <LogoutOutlinedIcon fontSize="small" color="error" />
              </ListItemIcon>
              Sign Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
