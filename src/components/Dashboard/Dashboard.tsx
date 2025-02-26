import { useState, useEffect } from 'react';
import { 
  Typography, Grid, Paper, Box, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, InputBase,
  IconButton, Chip, Tooltip, CircularProgress,
  useTheme, useMediaQuery, Menu, MenuItem, Divider
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Inmate, generateInmates, updateInmateData } from '../../services/simulationService';
import RiskBadge from '../Common/RiskBadge';
import DashboardSummary from './DashboardSummary';

// Styled components for modern UI
const GlassTable = styled(Paper)(({ theme }) => ({
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
  overflow: 'hidden',
  position: 'relative',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: alpha(
      theme.palette.background.paper,
      theme.palette.mode === 'dark' ? 0.3 : 0.5
    ),
  },
  '&:hover': {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.mode === 'dark' ? 0.15 : 0.1
    ),
    transition: 'background-color 0.2s ease',
  },
  transition: 'background-color 0.2s ease',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  padding: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(
    theme.palette.background.paper,
    theme.palette.mode === 'dark' ? 0.3 : 0.75
  ),
  '&:hover': {
    backgroundColor: alpha(
      theme.palette.background.paper,
      theme.palette.mode === 'dark' ? 0.4 : 0.85
    ),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.text.primary, 0.6),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '24ch',
      },
    },
  },
}));

// AI Processing indicator
const AIProcessingIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
  borderRadius: 16,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  fontSize: '0.75rem',
  fontWeight: 500,
  zIndex: 5, // Ensure it's above other elements
  '& .MuiCircularProgress-root': {
    marginRight: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    top: 'auto',
    bottom: 10,
    left: 10,
    right: 'auto',
  },
}));

/**
 * Dashboard component showing inmate monitoring overview
 */
const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [inmates, setInmates] = useState<Inmate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [processingAI, setProcessingAI] = useState<boolean>(false);
  const { riskType } = useParams<{ riskType: string }>();
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  
  // Calculate risk counts
  const highRiskCount = inmates.filter(inmate => inmate.riskLevel === 'HIGH').length;
  const mediumRiskCount = inmates.filter(inmate => inmate.riskLevel === 'MEDIUM').length;
  const lowRiskCount = inmates.filter(inmate => inmate.riskLevel === 'LOW').length;
  
  // Filter inmates based on search term and riskType
  const filteredInmates = inmates.filter(inmate => {
    const matchesRiskType = riskType ? inmate.riskLevel.toLowerCase() === riskType : true;
    const matchesSearchTerm = inmate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              inmate.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              inmate.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRiskType && matchesSearchTerm;
  });
  
  useEffect(() => {
    // Generate initial data
    setInmates(generateInmates(15));
    setLoading(false);
    
    // Show AI processing indicator
    setProcessingAI(true);
    
    // Hide AI processing indicator after 2 seconds
    setTimeout(() => {
      setProcessingAI(false);
    }, 2000);
  }, []);
  
  // Update inmate data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setInmates(prevInmates => prevInmates.map(inmate => updateInmateData(inmate)));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          fontWeight="bold"
          sx={{ 
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(90deg, #e2e8f0, #94a3b8)' 
              : 'linear-gradient(90deg, #1e293b, #334155)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          }}
        >
          Inmate Monitoring Dashboard
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: alpha(theme.palette.background.paper, 0.7),
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          px: 2,
          py: 0.5,
          border: `1px solid ${alpha(
            theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
            theme.palette.mode === 'dark' ? 0.1 : 0.05
          )}`,
        }}>
          <Box sx={{ 
            width: 10, 
            height: 10, 
            borderRadius: '50%', 
            bgcolor: 'success.main',
            mr: 1,
            animation: 'pulse 1.5s infinite',
          }} />
          <Typography variant="body2" color="text.secondary">
            Live Data
          </Typography>
        </Box>
      </Box>
      
      <DashboardSummary 
        highRiskCount={highRiskCount}
        mediumRiskCount={mediumRiskCount}
        lowRiskCount={lowRiskCount}
        totalCount={inmates.length}
      />
      
      <GlassTable sx={{ mt: 4 }}>
        {processingAI && (
          <AIProcessingIndicator>
            <CircularProgress size={14} thickness={5} />
            AI Processing Behavioral Patterns
          </AIProcessingIndicator>
        )}
        
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h6" fontWeight="medium">
            Monitored Individuals
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            width: isMobile ? '100%' : 'auto',
            mt: isMobile ? 1 : 0,
            flexWrap: 'nowrap'
          }}>
            <SearchBar sx={{ flexGrow: 1 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search inmates…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
            
            <Tooltip title="Filter list">
              <IconButton 
                size={isMobile ? "small" : "medium"}
                onClick={handleFilterClick}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Refresh data">
              <IconButton 
                onClick={() => setInmates(generateInmates(15))}
                size={isMobile ? "small" : "medium"}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        <TableContainer>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Risk Level</StyledTableCell>
                {!isMobile && <StyledTableCell>Heart Rate</StyledTableCell>}
                <StyledTableCell>Stress Level</StyledTableCell>
                {!isMobile && <StyledTableCell>Location</StyledTableCell>}
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInmates.map((inmate) => (
                <StyledTableRow key={inmate.id}>
                  <StyledTableCell>
                    <Chip 
                      label={inmate.id.split('-')[0]} 
                      size="small" 
                      variant="outlined" 
                      sx={{ fontFamily: 'monospace' }} 
                    />
                  </StyledTableCell>
                  <StyledTableCell>{inmate.name}</StyledTableCell>
                  <StyledTableCell>
                    <RiskBadge level={inmate.riskLevel} />
                  </StyledTableCell>
                  {!isMobile && (
                    <StyledTableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: inmate.heartRate > 100 ? 'error.main' : 'success.main',
                            mr: 1,
                            animation: inmate.heartRate > 100 ? 'pulse 1.5s infinite' : 'pulse 2s infinite',
                            '@keyframes pulse': {
                              '0%': { opacity: 1 },
                              '50%': { opacity: 0.3 },
                              '100%': { opacity: 1 },
                            },
                          }} 
                        />
                        {Math.round(inmate.heartRate)} BPM
                      </Box>
                    </StyledTableCell>
                  )}
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: '100%', 
                        maxWidth: 60,
                        height: 6, 
                        bgcolor: alpha(theme.palette.text.disabled, 0.3),
                        borderRadius: 3,
                        mr: 1,
                      }}>
                        <Box sx={{ 
                          height: '100%', 
                          width: `${inmate.stressLevel}%`,
                          borderRadius: 3,
                          bgcolor: 
                            inmate.stressLevel > 70 ? 'error.main' : 
                            inmate.stressLevel > 50 ? 'warning.main' : 'success.main',
                        }} />
                      </Box>
                      {Math.round(inmate.stressLevel)}%
                    </Box>
                  </StyledTableCell>
                  {!isMobile && (
                    <StyledTableCell>
                      <Chip 
                        label={inmate.location} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="right">
                    <Button 
                      variant="contained" 
                      size="small" 
                      component={Link} 
                      to={`/monitor/${inmate.id}`}
                      sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      {isMobile ? 'View' : 'Monitor'}
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </GlassTable>

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem onClick={() => {
          // Apply filter logic here
          handleFilterClose();
        }}>
          High Risk Only
        </MenuItem>
        <MenuItem onClick={() => {
          // Apply filter logic here
          handleFilterClose();
        }}>
          Medium Risk Only
        </MenuItem>
        <MenuItem onClick={() => {
          // Apply filter logic here
          handleFilterClose();
        }}>
          Low Risk Only
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {
          // Clear filters
          handleFilterClose();
        }}>
          Clear Filters
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Dashboard; 