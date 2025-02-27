import { useState, useEffect } from 'react';
import { 
  Typography, Grid, Paper, Box, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, InputBase,
  IconButton, Chip, Tooltip, CircularProgress,
  useTheme, useMediaQuery, Menu, MenuItem, Divider
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
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
  [theme.breakpoints.down('sm')]: {
    height: '60px', // Increase row height on mobile
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  padding: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2),
    fontSize: '0.875rem', // Slightly smaller font on mobile
    '&:first-of-type': {
      paddingLeft: theme.spacing(1.5)
    },
    '&:last-of-type': {
      paddingRight: theme.spacing(1.5)
    }
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

interface DashboardProps {
  initialRiskLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
}

/**
 * Dashboard component showing inmate monitoring overview
 */
const Dashboard = ({ initialRiskLevel }: DashboardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [inmates, setInmates] = useState<Inmate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [processingAI, setProcessingAI] = useState<boolean>(false);
  const { riskType } = useParams<{ riskType: string }>();
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(initialRiskLevel || null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Calculate risk counts
  const highRiskCount = inmates.filter(inmate => inmate.riskLevel === 'HIGH').length;
  const mediumRiskCount = inmates.filter(inmate => inmate.riskLevel === 'MEDIUM').length;
  const lowRiskCount = inmates.filter(inmate => inmate.riskLevel === 'LOW').length;
  
  // Filter inmates based on search term and riskType
  const filteredInmates = inmates.filter(inmate => {
    // First apply risk level filter if selected
    if (selectedRiskLevel && inmate.riskLevel !== selectedRiskLevel) {
      return false;
    }
    
    // Then apply search filter
    return searchTerm === '' || 
      inmate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inmate.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inmate.location.toLowerCase().includes(searchTerm.toLowerCase());
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

  // Determine initial risk level from URL
  useEffect(() => {
    if (location.pathname === '/high-risk') {
      setSelectedRiskLevel('HIGH');
    } else if (location.pathname === '/medium-risk') {
      setSelectedRiskLevel('MEDIUM');
    } else if (location.pathname === '/low-risk') {
      setSelectedRiskLevel('LOW');
    } else {
      setSelectedRiskLevel(null);
    }
  }, [location.pathname]);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  return (
    <Box sx={{ 
      width: '100%',
      px: { xs: 0, sm: 2 }, // Remove padding on mobile
    }}>
      <Box sx={{
        mb: 3, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        [theme.breakpoints.down('sm')]: {
          mb: 2
        }
      }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          fontWeight="bold"
          sx={{
            [theme.breakpoints.down('sm')]: {
              width: '100%',
              mb: 1
            }
          }}
        >
          Monitored Individuals
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
              justifyContent: 'space-between'
            }
          }}
        >
          <SearchBar>
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
          
          <Box sx={{ display: 'flex' }}>
            <Tooltip title="Filter list">
              <IconButton 
                size="small"
                onClick={handleFilterClick}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Refresh data">
              <IconButton 
                onClick={() => setInmates(generateInmates(15))}
                size="small"
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        {selectedRiskLevel && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              p: 1.5,
              bgcolor: alpha(
                selectedRiskLevel === 'HIGH' 
                  ? theme.palette.error.main 
                  : selectedRiskLevel === 'MEDIUM'
                    ? theme.palette.warning.main
                    : theme.palette.success.main, 
                0.1
              ),
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>
              {selectedRiskLevel === 'HIGH' 
                ? 'Showing High Risk Individuals' 
                : selectedRiskLevel === 'MEDIUM' 
                  ? 'Showing Medium Risk Individuals' 
                  : 'Showing Low Risk Individuals'}
            </Typography>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={() => {
                setSelectedRiskLevel(null);
                navigate('/');
              }}
              sx={{ 
                ml: 'auto', 
                borderRadius: 10,
                fontSize: '0.7rem',
                py: 0.25,
                px: 1,
              }}
            >
              Clear Filter
            </Button>
          </Box>
        )}
      </Box>
      
      <DashboardSummary
        totalCount={inmates.length}
        highRiskCount={highRiskCount}
        mediumRiskCount={mediumRiskCount}
        lowRiskCount={lowRiskCount}
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
        
        <TableContainer sx={{
          [theme.breakpoints.down('sm')]: {
            margin: '-8px', // Negative margin to extend to edges
            width: 'calc(100% + 16px)',
          },
        }}>
          <Table size={isMobile ? "small" : "medium"} sx={{
            [theme.breakpoints.down('sm')]: {
              tableLayout: 'fixed',
            }
          }}>
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
                    <Box sx={{ 
                      width: '100%', 
                      maxWidth: isMobile ? 45 : 60,
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
                        },
                        [theme.breakpoints.down('sm')]: {
                          minWidth: '80px',
                          fontWeight: 500,
                          py: 0.5
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
          setSelectedRiskLevel('HIGH');
          navigate('/high-risk');
          handleFilterClose();
        }}>
          High Risk Only
        </MenuItem>
        <MenuItem onClick={() => {
          setSelectedRiskLevel('MEDIUM');
          navigate('/medium-risk');
          handleFilterClose();
        }}>
          Medium Risk Only
        </MenuItem>
        <MenuItem onClick={() => {
          setSelectedRiskLevel('LOW');
          navigate('/low-risk');
          handleFilterClose();
        }}>
          Low Risk Only
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {
          setSelectedRiskLevel(null);
          navigate('/');
          handleFilterClose();
        }}>
          Clear Filters
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Dashboard; 