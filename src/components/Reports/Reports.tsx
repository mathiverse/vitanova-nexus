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
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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

  // Data for Risk Distribution Pie Chart
  const riskData = {
    labels: ['High Risk', 'Medium Risk', 'Low Risk'],
    datasets: [
      {
        data: [2, 5, 8],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
        borderColor: ['#b91c1c', '#d97706', '#047857'],
        borderWidth: 1,
      },
    ],
  };

  // Data for Weekly Incidents Bar Chart
  const incidentData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Incidents',
        data: [3, 5, 2, 8, 4, 1, 2],
        backgroundColor: alpha('#3b82f6', 0.7),
        borderColor: '#2563eb',
        borderWidth: 1,
      },
    ],
  };

  // Data for Behavioral Trends Line Chart
  const trendsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'High Risk Count',
        data: [4, 3, 5, 2],
        borderColor: '#ef4444',
        backgroundColor: alpha('#ef4444', 0.1),
        tension: 0.3,
      },
      {
        label: 'Medium Risk Count',
        data: [6, 7, 5, 8],
        borderColor: '#f59e0b',
        backgroundColor: alpha('#f59e0b', 0.1),
        tension: 0.3,
      },
      {
        label: 'Low Risk Count',
        data: [5, 6, 8, 12],
        borderColor: '#10b981',
        backgroundColor: alpha('#10b981', 0.1),
        tension: 0.3,
      },
    ],
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
                  <Pie data={riskData} options={{ maintainAspectRatio: false }} />
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
                  <Bar data={incidentData} options={{ maintainAspectRatio: false }} />
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <GlassCard>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Risk Level Trends
                </Typography>
                <Box sx={{ height: 350 }}>
                  <Line 
                    data={trendsData} 
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }} 
                  />
                </Box>
              </GlassCard>
            </Grid>
          </Grid>
        )}

        {activeTab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <GlassCard>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Behavior Analysis
                </Typography>
                <Box sx={{ height: 350 }}>
                  <Line 
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                      datasets: [
                        {
                          label: 'Compliance Score',
                          data: [65, 72, 68, 75, 82, 88],
                          borderColor: '#3b82f6',
                          backgroundColor: alpha('#3b82f6', 0.1),
                          tension: 0.3,
                        }
                      ],
                    }}
                    options={{ 
                      maintainAspectRatio: false 
                    }} 
                  />
                </Box>
              </GlassCard>
            </Grid>
          </Grid>
        )}

        {activeTab === 3 && (
          <GlassCard>
            <Typography variant="h6" fontWeight="medium" gutterBottom>
              Activity Log
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { time: '2023-10-15 14:32:45', user: 'Officer Johnson', action: 'Login', details: 'System access' },
                    { time: '2023-10-15 14:35:12', user: 'Officer Johnson', action: 'View Profile', details: 'Inmate #1042' },
                    { time: '2023-10-15 15:01:23', user: 'Officer Smith', action: 'Alert Response', details: 'High risk incident' },
                    { time: '2023-10-15 15:12:56', user: 'Admin User', action: 'System Update', details: 'Filter settings changed' },
                    { time: '2023-10-15 15:45:30', user: 'Officer Johnson', action: 'Report Generated', details: 'Weekly summary' },
                  ].map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.time}</TableCell>
                      <TableCell>{entry.user}</TableCell>
                      <TableCell>{entry.action}</TableCell>
                      <TableCell>{entry.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </GlassCard>
        )}
      </Box>
    </Box>
  );
};

export default Reports; 