import { useState } from 'react';
import { 
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, Divider, Avatar, Typography, IconButton,
  Collapse, Switch, Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface SidebarProps {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
}

// Styled components for glassmorphism effect
const GlassSidebar = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(30, 41, 59, 0.85)' 
      : 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(10px)',
    borderRight: theme.palette.mode === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(2),
  },
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 1),
  marginBottom: theme.spacing(2),
  borderBottom: theme.palette.mode === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.1)'
    : '1px solid rgba(0, 0, 0, 0.06)',
}));

const NavItem = styled(ListItemButton)<{ active?: number }>(({ theme, active }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  backgroundColor: active 
    ? theme.palette.mode === 'dark'
      ? 'rgba(96, 165, 250, 0.15)'
      : 'rgba(25, 118, 210, 0.08)'
    : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(96, 165, 250, 0.25)'
      : 'rgba(25, 118, 210, 0.12)',
  },
}));

/**
 * Modern sidebar navigation component with glassmorphism effect
 */
const Sidebar = ({ toggleColorMode, mode }: SidebarProps) => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [monitoringOpen, setMonitoringOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMonitoringClick = () => {
    setMonitoringOpen(!monitoringOpen);
  };

  const toggleMobileDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path: string) => location.pathname === path ? 1 : 0;

  const sidebarContent = (
    <>
      <SidebarHeader>
        <MonitorHeartIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          VitaNova Nexus
        </Typography>
        <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
          <IconButton onClick={toggleColorMode} color="inherit" size="small">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </SidebarHeader>

      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          <PersonIcon />
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="medium">
            Officer Johnson
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Senior Monitor
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <List component="nav" sx={{ px: 1 }}>
        <NavItem component={Link} to="/" active={isActive('/')}>
          <ListItemIcon>
            <DashboardIcon color={isActive('/') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </NavItem>

        <ListItem disablePadding>
          <NavItem onClick={handleMonitoringClick} sx={{ width: '100%' }}>
            <ListItemIcon>
              <PeopleIcon color={
                isActive('/high-risk') || isActive('/medium-risk') || isActive('/low-risk') 
                  ? 'primary' 
                  : 'inherit'
              } />
            </ListItemIcon>
            <ListItemText primary="Monitoring" />
            {monitoringOpen ? <ExpandLess /> : <ExpandMore />}
          </NavItem>
        </ListItem>

        <Collapse in={monitoringOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2 }}>
            <NavItem component={Link} to="/high-risk" active={isActive('/high-risk')}>
              <ListItemText primary="High Risk Inmates" />
            </NavItem>
            <NavItem component={Link} to="/medium-risk" active={isActive('/medium-risk')}>
              <ListItemText primary="Medium Risk Inmates" />
            </NavItem>
            <NavItem component={Link} to="/low-risk" active={isActive('/low-risk')}>
              <ListItemText primary="Low Risk Inmates" />
            </NavItem>
          </List>
        </Collapse>

        <NavItem component={Link} to="/reports" active={isActive('/reports')}>
          <ListItemIcon>
            <AssessmentIcon color={isActive('/reports') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </NavItem>

        <NavItem component={Link} to="/notifications" active={isActive('/notifications')}>
          <ListItemIcon>
            <NotificationsIcon color={isActive('/notifications') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </NavItem>

        <NavItem component={Link} to="/settings" active={isActive('/settings')}>
          <ListItemIcon>
            <SettingsIcon color={isActive('/settings') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </NavItem>
      </List>
    </>
  );

  return (
    <>
      {/* Mobile hamburger menu */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleMobileDrawer}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleMobileDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <Box sx={{ width: 280 }}>
          {sidebarContent}
        </Box>
      </Drawer>

      {/* Desktop sidebar */}
      <GlassSidebar
        variant="permanent"
        open={open}
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        {sidebarContent}
      </GlassSidebar>
    </>
  );
};

export default Sidebar; 