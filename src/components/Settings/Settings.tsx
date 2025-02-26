import React, { useState } from 'react';
import { 
  Typography, Box, Paper, Divider, Switch, 
  FormControlLabel, Slider, TextField, 
  Grid, Button, MenuItem, Select, 
  FormControl, InputLabel, ToggleButtonGroup,
  ToggleButton, Avatar, Badge, IconButton
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LanguageIcon from '@mui/icons-material/Language';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';

const SettingsSection = styled(Paper)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  border: `1px solid ${alpha(
    theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
    theme.palette.mode === 'dark' ? 0.1 : 0.05
  )}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const Settings = () => {
  const [refreshRate, setRefreshRate] = useState<number>(30);
  const [language, setLanguage] = useState<string>('en');
  const [theme, setTheme] = useState<string>('dark');
  
  const handleRefreshRateChange = (event: Event, newValue: number | number[]) => {
    setRefreshRate(newValue as number);
  };
  
  const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
  };
  
  const handleThemeChange = (event: React.MouseEvent<HTMLElement>, newTheme: string) => {
    if (newTheme !== null) {
      setTheme(newTheme);
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        System Settings
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SettingsSection>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <VisibilityIcon />
              </Avatar>
              <Typography variant="h6">User Profile</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <IconButton
                    sx={{ bgcolor: 'primary.main', width: 22, height: 22 }}
                    size="small"
                  >
                    <PhotoCameraIcon fontSize="small" />
                  </IconButton>
                }
              >
                <Avatar
                  sx={{ width: 100, height: 100, mx: 'auto' }}
                  alt="Officer Johnson"
                  src="/static/images/avatar/1.jpg"
                />
              </Badge>
            </Box>
            
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              defaultValue="Officer Johnson"
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              defaultValue="johnson@vitanova.org"
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Role"
              variant="outlined"
              defaultValue="Senior Monitor"
              margin="normal"
              disabled
            />
            
            <Button 
              fullWidth 
              variant="contained" 
              sx={{ mt: 2 }}
              startIcon={<SaveIcon />}
            >
              Save Profile
            </Button>
          </SettingsSection>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <SettingsSection>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <NotificationsIcon />
              </Avatar>
              <Typography variant="h6">Notifications</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="High Risk Alerts"
              sx={{ mb: 2, display: 'block' }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Receive notifications for high risk inmates
            </Typography>
            
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Medium Risk Alerts"
              sx={{ mb: 2, display: 'block' }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Receive notifications for medium risk inmates
            </Typography>
            
            <FormControlLabel
              control={<Switch />}
              label="Low Risk Alerts"
              sx={{ mb: 2, display: 'block' }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Receive notifications for low risk inmates
            </Typography>
            
            <Typography gutterBottom>Refresh Rate (seconds)</Typography>
            <Slider
              value={refreshRate}
              onChange={handleRefreshRateChange}
              aria-labelledby="refresh-rate-slider"
              valueLabelDisplay="auto"
              step={5}
              marks
              min={5}
              max={60}
              sx={{ mb: 4 }}
            />
          </SettingsSection>
          
          <SettingsSection>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <SecurityIcon />
              </Avatar>
              <Typography variant="h6">Security Settings</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Two-Factor Authentication"
              sx={{ mb: 2, display: 'block' }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Require 2FA for all login attempts
            </Typography>
            
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Session Timeout"
              sx={{ mb: 2, display: 'block' }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Automatically log out after 30 minutes of inactivity
            </Typography>
            
            <Button 
              variant="outlined" 
              color="primary"
              sx={{ mb: 2 }}
            >
              Change Password
            </Button>
            
            <Button 
              variant="outlined" 
              color="primary"
              sx={{ ml: 2, mb: 2 }}
            >
              Login History
            </Button>
          </SettingsSection>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings; 