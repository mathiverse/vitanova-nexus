import { useState } from 'react';
import { 
  Paper, Typography, Box, Button, Grid, 
  Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, MenuItem,
  Snackbar, Alert
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import SecurityIcon from '@mui/icons-material/Security';

interface InterventionPanelProps {
  inmateId: string;
}

/**
 * Component for staff to initiate interventions with inmates
 * @param inmateId - ID of the inmate to intervene with
 */
const InterventionPanel = ({ inmateId }: InterventionPanelProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<string>('');
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Form state
  const [interventionDetails, setInterventionDetails] = useState({
    date: '',
    time: '',
    type: 'counseling',
    message: '',
    urgency: 'normal'
  });

  const handleOpenDialog = (type: string) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInterventionDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // In a real app, this would send data to an API
    console.log(`Submitting ${dialogType} for inmate ${inmateId}:`, interventionDetails);
    
    // Show success message
    setSnackbar({
      open: true,
      message: dialogType === 'alert' 
        ? 'Alert sent successfully' 
        : dialogType === 'schedule' 
          ? 'Intervention scheduled successfully'
          : 'Message sent successfully',
      severity: 'success'
    });
    
    // Reset form and close dialog
    setInterventionDetails({
      date: '',
      time: '',
      type: 'counseling',
      message: '',
      urgency: 'normal'
    });
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Paper sx={{ 
        p: 2, 
        borderRadius: 2, 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        background: 'linear-gradient(to right, #f5f7fa, #e4e8f0)'
      }}>
        <Typography variant="h6" gutterBottom>
          Intervention Options
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              color="error"
              fullWidth
              startIcon={<NotificationsActiveIcon />}
              onClick={() => handleOpenDialog('alert')}
              sx={{ 
                py: 2,
                boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 14px rgba(211, 47, 47, 0.4)',
                }
              }}
            >
              Send Alert
            </Button>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              color="primary"
              fullWidth
              startIcon={<CalendarMonthIcon />}
              onClick={() => handleOpenDialog('schedule')}
              sx={{ 
                py: 2,
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 14px rgba(25, 118, 210, 0.4)',
                }
              }}
            >
              Schedule Check-in
            </Button>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              color="success"
              fullWidth
              startIcon={<ChatIcon />}
              onClick={() => handleOpenDialog('message')}
              sx={{ 
                py: 2,
                boxShadow: '0 4px 12px rgba(56, 142, 60, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 14px rgba(56, 142, 60, 0.4)',
                }
              }}
            >
              Send Message
            </Button>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              color="warning"
              fullWidth
              startIcon={<SecurityIcon />}
              onClick={() => handleOpenDialog('security')}
              sx={{ 
                py: 2,
                boxShadow: '0 4px 12px rgba(245, 124, 0, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 14px rgba(245, 124, 0, 0.4)',
                }
              }}
            >
              Security Check
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Intervention Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'alert' && 'Send Alert'}
          {dialogType === 'schedule' && 'Schedule Intervention'}
          {dialogType === 'message' && 'Send Message'}
          {dialogType === 'security' && 'Request Security Check'}
        </DialogTitle>
        
        <DialogContent>
          {(dialogType === 'schedule') && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date"
                  type="date"
                  name="date"
                  value={interventionDetails.date}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Time"
                  type="time"
                  name="time"
                  value={interventionDetails.time}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Intervention Type"
                  name="type"
                  value={interventionDetails.type}
                  onChange={handleInputChange}
                  fullWidth
                >
                  <MenuItem value="counseling">Counseling Session</MenuItem>
                  <MenuItem value="medical">Medical Check</MenuItem>
                  <MenuItem value="behavioral">Behavioral Assessment</MenuItem>
                  <MenuItem value="educational">Educational Program</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          )}
          
          {(dialogType === 'alert' || dialogType === 'security') && (
            <TextField
              select
              label="Urgency"
              name="urgency"
              value={interventionDetails.urgency}
              onChange={handleInputChange}
              fullWidth
              sx={{ mt: 2 }}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="emergency">Emergency</MenuItem>
            </TextField>
          )}
          
          <TextField
            label="Message"
            name="message"
            value={interventionDetails.message}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            color={
              dialogType === 'alert' ? 'error' : 
              dialogType === 'security' ? 'warning' : 
              dialogType === 'message' ? 'success' : 'primary'
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Success/Error Notification */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default InterventionPanel; 