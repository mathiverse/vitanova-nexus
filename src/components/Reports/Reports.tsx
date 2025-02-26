import React, { useState } from 'react';
import { 
  Typography, Box, Paper, Tabs, Tab, Button, 
  Grid, Card, CardContent, Divider, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, IconButton 
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled, alpha } from '@mui/material/styles';
import DateRangeIcon from '@mui/icons-material/DateRange';

const GlassCard = styled(Paper)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  padding: theme.spacing(3),
  border: `1px solid ${alpha(
    theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
    theme.palette.mode === 'dark' ? 0.1 : 0.05
  )}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const Reports = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        flexWrap: 'wrap'
      }}>
        <Typography variant="h4" fontWeight="bold">
          Reports & Analytics
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<DateRangeIcon />}>
            Date Range
          </Button>
          <Button variant="outlined" startIcon={<FilterListIcon />}>
            Filter
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Export
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ 
            mb: 3,
            '& .MuiTab-root': {
              minWidth: 120, 
              fontWeight: 500
            }
          }}
        >
          <Tab label="Summary" />
          <Tab label="Risk Analysis" />
          <Tab label="Behavioral Trends" />
          <Tab label="Activity Log" />
        </Tabs>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <GlassCard>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Inmate Risk Distribution
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Current distribution of risk levels among all inmates
                </Typography>
                <Box sx={{ height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography color="text.secondary">Chart placeholder</Typography>
                </Box>
              </GlassCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <GlassCard>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Weekly Incident Summary
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Incidents reported in the past 7 days
                </Typography>
                <Box sx={{ height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography color="text.secondary">Chart placeholder</Typography>
                </Box>
              </GlassCard>
            </Grid>
            <Grid item xs={12}>
              <GlassCard>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight="medium">
                    Recent Alerts
                  </Typography>
                  <IconButton size="small">
                    <PrintIcon />
                  </IconButton>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Inmate ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Alert Type</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[1, 2, 3, 4, 5].map((row) => (
                        <TableRow key={row}>
                          <TableCell>Today, 9:42 AM</TableCell>
                          <TableCell>INM-{1000 + row}</TableCell>
                          <TableCell>John Smith</TableCell>
                          <TableCell>Elevated Heart Rate</TableCell>
                          <TableCell>Block A</TableCell>
                          <TableCell>Resolved</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </GlassCard>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <Typography>Risk Analysis reports will appear here</Typography>
          </Box>
        )}

        {activeTab === 2 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <Typography>Behavioral Trends reports will appear here</Typography>
          </Box>
        )}

        {activeTab === 3 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <Typography>Activity Log will appear here</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Reports; 