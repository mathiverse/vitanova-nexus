import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Grid, Paper, Box, Button,
  Card, CardContent, Divider, Alert, Chip,
  LinearProgress, useTheme, useMediaQuery,
  Tabs, Tab
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { 
  Inmate, BiometricData, generateInmates, 
  updateInmateData, generateHistoricalData 
} from '../../services/simulationService';
import BiometricChart from './BiometricChart';
import InterventionPanel from './InterventionPanel';
import LocationTracker from './LocationTracker';
import { styled, alpha } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Styled components
const GlassCard = styled(Paper)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  border: `1px solid ${alpha(
    theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
    theme.palette.mode === 'dark' ? 0.1 : 0.05
  )}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
  overflow: 'hidden',
}));

const BiometricValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 'bold',
  lineHeight: 1.2,
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.25rem',
    marginBottom: theme.spacing(1),
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'baseline',
}));

const BiometricLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.875rem',
  },
}));

const BiometricUnit = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.875rem',
  },
  opacity: 0.7,
  marginLeft: theme.spacing(0.5),
}));

/**
 * Detailed monitoring view for a single inmate
 */
const UserMonitor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [inmate, setInmate] = useState<Inmate | null>(null);
  const [historicalData, setHistoricalData] = useState<BiometricData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('HEART_RATE');

  // Fetch inmate data
  useEffect(() => {
    // Simulate API call to get inmate data
    const allInmates = generateInmates(15);
    const foundInmate = allInmates.find(inm => inm.id === id);
    
    if (foundInmate) {
      setInmate(foundInmate);
      setHistoricalData(generateHistoricalData(24));
    }
    
    setLoading(false);
  }, [id]);

  // Simulate real-time updates
  useEffect(() => {
    if (!inmate) return;
    
    const interval = setInterval(() => {
      setInmate(prevInmate => {
        if (!prevInmate) return null;
        return updateInmateData(prevInmate);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [inmate]);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return <Typography>Loading inmate data...</Typography>;
  }

  if (!inmate) {
    return (
      <Container>
        <Alert severity="error">Inmate not found</Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  // Chart data
  const chartData = {
    labels: inmate.biometricHistory.slice(-24).map((_, index) => `${index}h`),
    datasets: [
      {
        label: activeTab === 'HEART_RATE' ? 'Heart Rate (BPM)' : 
               activeTab === 'STRESS' ? 'Stress Level (%)' :
               activeTab === 'MOVEMENT' ? 'Movement Intensity' : 'Voice Stress',
        data: inmate.biometricHistory.slice(-24).map(data => 
          activeTab === 'HEART_RATE' ? data.heartRate : 
          activeTab === 'STRESS' ? data.stressLevel :
          activeTab === 'MOVEMENT' ? data.movementIntensity : data.voiceStressIndicator
        ),
        borderColor: activeTab === 'HEART_RATE' ? theme.palette.error.main : 
                    activeTab === 'STRESS' ? theme.palette.warning.main :
                    activeTab === 'MOVEMENT' ? theme.palette.info.main : theme.palette.secondary.main,
        backgroundColor: alpha(
          activeTab === 'HEART_RATE' ? theme.palette.error.main : 
          activeTab === 'STRESS' ? theme.palette.warning.main :
          activeTab === 'MOVEMENT' ? theme.palette.info.main : theme.palette.secondary.main,
          0.1
        ),
        tension: 0.3,
        fill: true,
      }
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: isMobile ? 6 : 12,
        },
      },
      y: {
        grid: {
          color: alpha(theme.palette.divider, 0.1),
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: { xs: 2, md: 3 } }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/')}
          variant="text"
          sx={{ mb: 1 }}
        >
          Back to Dashboard
        </Button>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1
        }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1" 
            fontWeight="bold"
          >
            Monitoring: {inmate.name}
          </Typography>
          
          <Chip 
            label={`ID: ${id}`} 
            variant="outlined" 
            size={isMobile ? "small" : "medium"}
          />
        </Box>
        
        {inmate.riskLevel === 'HIGH' && (
          <Alert 
            severity="error" 
            variant="filled"
            sx={{ mt: 2, borderRadius: 2 }}
          >
            This inmate is currently classified as HIGH RISK. Immediate attention may be required.
          </Alert>
        )}
      </Box>
      
      <Grid container spacing={3}>
        {/* Inmate Information */}
        <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
          <GlassCard>
            <Typography variant="h6" fontWeight="medium" mb={2}>
              Inmate Information
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography color="text.secondary" variant="body2">
                Name
              </Typography>
              <Typography variant="h6">
                {inmate.name}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography color="text.secondary" variant="body2">
                Age
              </Typography>
              <Typography variant="h6">
                {inmate.age} years
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography color="text.secondary" variant="body2">
                Risk Level
              </Typography>
              <Chip 
                label={inmate.riskLevel} 
                color={
                  inmate.riskLevel === 'HIGH' ? 'error' : 
                  inmate.riskLevel === 'MEDIUM' ? 'warning' : 'success'
                }
                sx={{ mt: 0.5 }}
              />
            </Box>
            
            {inmate.lastIncident && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Last Incident
                </Typography>
                <Typography variant="body1" color="error">
                  {inmate.lastIncident}
                </Typography>
              </Box>
            )}
            
            <Box sx={{ mb: 1 }}>
              <Typography color="text.secondary" variant="body2" mb={1}>
                Rehabilitation Progress
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={inmate.rehabilitationProgress} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                  }
                }}
              />
              <Typography variant="body2" color="text.secondary" mt={0.5} align="right">
                {inmate.rehabilitationProgress}%
              </Typography>
            </Box>
          </GlassCard>
          
          <LocationTracker 
            location={inmate.location}
            sx={{ mt: 3 }}
          />
        </Grid>
        
        {/* Biometric Data */}
        <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
          <GlassCard sx={{ 
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.7))'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(241, 245, 249, 0.7))',
            mb: 3,
          }}>
            <Typography variant="h6" fontWeight="medium" mb={2}>
              Real-time Biometrics
            </Typography>
            
            <Grid container spacing={isMobile ? 1 : 3}>
              <Grid item xs={6} sm={3}>
                <BiometricLabel>Heart Rate</BiometricLabel>
                <BiometricValue 
                  color={inmate.heartRate > 100 ? 'error.main' : 'text.primary'}
                >
                  {Math.round(inmate.heartRate)}
                  <BiometricUnit component="span">
                    BPM
                  </BiometricUnit>
                </BiometricValue>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <BiometricLabel>Stress Level</BiometricLabel>
                <BiometricValue 
                  color={
                    inmate.stressLevel > 70 ? 'error.main' :
                    inmate.stressLevel > 50 ? 'warning.main' : 'text.primary'
                  }
                >
                  {Math.round(inmate.stressLevel)}
                  <BiometricUnit component="span">
                    %
                  </BiometricUnit>
                </BiometricValue>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <BiometricLabel>Behavior</BiometricLabel>
                <BiometricValue 
                  color={
                    inmate.movementIntensity > 70 ? 'error.main' :
                    inmate.movementIntensity > 50 ? 'warning.main' : 'text.primary'
                  }
                >
                  {Math.round(inmate.movementIntensity)}
                  <BiometricUnit component="span">
                    /100
                  </BiometricUnit>
                </BiometricValue>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <BiometricLabel>Current</BiometricLabel>
                <Typography 
                  variant="body1" 
                  fontWeight="medium"
                  sx={{ 
                    fontSize: isMobile ? '0.875rem' : 'inherit',
                    wordBreak: 'break-word'
                  }}
                >
                  {['Resting', 'Vocational Training', 'Exercise', 'Meal', 'Study'][Math.floor(Math.random() * 5)]}
                </Typography>
              </Grid>
            </Grid>
          </GlassCard>
          
          <GlassCard>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" fontWeight="medium">
                Biometric Trends
              </Typography>
              
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab label="Heart Rate" value="HEART_RATE" />
                <Tab label="Stress" value="STRESS" />
                <Tab label="Movement" value="MOVEMENT" />
                <Tab label="Voice Stress" value="VOICE" />
              </Tabs>
            </Box>
            
            <Box sx={{ 
              height: isMobile ? 200 : isTablet ? 250 : 300,
              width: '100%'
            }}>
              <Line data={chartData} options={chartOptions} />
            </Box>
          </GlassCard>
          
          <InterventionPanel inmateId={inmate.id} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserMonitor; 