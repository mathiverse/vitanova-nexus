import React from 'react';
import { Box, Paper, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

interface DashboardSummaryProps {
  totalCount: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
}

const GlassCard = styled(Paper)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  overflow: 'hidden',
  border: `1px solid ${alpha(
    theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
    theme.palette.mode === 'dark' ? 0.1 : 0.05
  )}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StatusIndicator = styled(Box)(({ theme }) => ({
  height: 4,
  width: '100%',
  marginTop: 'auto',
}));

const AnimatedGradientCard = styled(GlassCard)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-50%',
    width: '200%',
    height: '100%',
    background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.05), transparent)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.8s ease',
  },
  '&:hover::before': {
    transform: 'translateX(100%)',
  },
}));

/**
 * Dashboard summary component showing inmate count by risk level
 */
const DashboardSummary = ({
  totalCount,
  highRiskCount,
  mediumRiskCount,
  lowRiskCount
}: DashboardSummaryProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Grid container spacing={isMobile ? 0.5 : 3} sx={{ mb: isMobile ? 1 : 4 }}>
      <Grid item xs={6} sm={6} md={3}>
        <AnimatedGradientCard sx={{ 
          position: 'relative',
          p: isMobile ? 1 : 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'flex-start',
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 0.5,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: 'center',
            width: '100%'
          }}>
            <Box sx={{ 
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
              borderRadius: '50%',
              width: isMobile ? 28 : 56,
              height: isMobile ? 28 : 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: isMobile ? 0 : 2,
              mb: isMobile ? 0.5 : 0
            }}>
              <PeopleIcon 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontSize: isMobile ? 16 : 32,
                }} 
              />
            </Box>
            <Typography 
              color="primary.main" 
              variant={isMobile ? "body2" : "h5"}
              noWrap
              sx={{ 
                fontWeight: 'bold',
                fontSize: isMobile ? '0.65rem' : undefined,
                lineHeight: 1.1,
                width: '100%',
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {isMobile ? 'Total' : 'Total Monitored'}
            </Typography>
          </Box>

          <Typography 
            variant={isMobile ? "h5" : "h2"} 
            component="div" 
            noWrap
            sx={{ 
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              my: isMobile ? 0.2 : 2,
              lineHeight: 1,
              textAlign: 'center',  
              fontSize: isMobile ? '1.25rem' : undefined,
              maxWidth: '100%'
            }}
          >
            {totalCount}
          </Typography>

          {theme.breakpoints.up('md') && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1,
              color: theme.palette.success.main
            }}>
              <TrendingUpIcon sx={{ fontSize: 14, mr: 0.5 }} />
              <Typography variant="caption" fontWeight="medium">
                +12% from last week
              </Typography>
            </Box>
          )}

          <Typography 
            variant="body2" 
            color="text.secondary"
            noWrap
            sx={{ 
              mb: 0.5,
              fontSize: isMobile ? '0.6rem' : '0.75rem',
              textAlign: 'center',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            Active monitoring
          </Typography>

          <StatusIndicator sx={{ bgcolor: theme.palette.primary.main }} />
        </AnimatedGradientCard>
      </Grid>

      <Grid item xs={6} sm={6} md={3}>
        <AnimatedGradientCard sx={{ 
          position: 'relative',
          p: isMobile ? 1.5 : 3, 
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 0.5,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: 'center',
            width: '100%'
          }}>
            <Box sx={{ 
              backgroundColor: alpha(theme.palette.error.main, 0.2),
              borderRadius: '50%',
              width: isMobile ? 32 : 56,
              height: isMobile ? 32 : 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: isMobile ? 0 : 2,
              mb: isMobile ? 1 : 0
            }}>
              <ReportIcon 
                sx={{ 
                  color: theme.palette.error.main,
                  fontSize: isMobile ? 20 : 32,
                }} 
              />
            </Box>
            <Typography 
              color="error.main" 
              variant={isMobile ? "subtitle1" : "h5"}
              sx={{ 
                fontWeight: 'bold',
                fontSize: isMobile ? '0.875rem' : undefined,
                lineHeight: 1.2
              }}
            >
              High Risk
            </Typography>
          </Box>

          <Typography 
            variant={isMobile ? "h4" : "h2"} 
            component="div" 
            sx={{ 
              color: theme.palette.error.main,
              fontWeight: 'bold',
              my: isMobile ? 0.5 : 2,
              lineHeight: 1,
              textAlign: isMobile ? 'center' : 'left',
              fontSize: isMobile ? '2rem' : undefined,
            }}
          >
            {highRiskCount}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 1,
              fontSize: isMobile ? '0.675rem' : '0.75rem',
              textAlign: isMobile ? 'center' : 'left',
              whiteSpace: 'nowrap'
            }}
          >
            Require immediate attention
          </Typography>

          <StatusIndicator sx={{ bgcolor: theme.palette.error.main }} />
        </AnimatedGradientCard>
      </Grid>

      <Grid item xs={6} sm={6} md={3}>
        <AnimatedGradientCard sx={{ 
          position: 'relative',
          p: isMobile ? 1.5 : 3, 
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 0.5,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: 'center',
            width: '100%'
          }}>
            <Box sx={{ 
              backgroundColor: alpha(theme.palette.warning.main, 0.2),
              borderRadius: '50%',
              width: isMobile ? 32 : 56,
              height: isMobile ? 32 : 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: isMobile ? 0 : 2,
              mb: isMobile ? 1 : 0
            }}>
              <PriorityHighIcon 
                sx={{ 
                  color: theme.palette.warning.main,
                  fontSize: isMobile ? 20 : 32,
                }} 
              />
            </Box>
            <Typography 
              color="warning.main" 
              variant={isMobile ? "body2" : "h5"}
              sx={{ 
                fontWeight: 'bold',
                fontSize: isMobile ? '0.75rem' : undefined,
                lineHeight: 1.1
              }}
            >
              {isMobile ? 'Med Risk' : 'Medium Risk'}
            </Typography>
          </Box>

          <Typography 
            variant={isMobile ? "h4" : "h2"} 
            component="div" 
            sx={{ 
              color: theme.palette.warning.main,
              fontWeight: 'bold',
              my: isMobile ? 0.5 : 2,
              lineHeight: 1,
              textAlign: isMobile ? 'center' : 'left',
              fontSize: isMobile ? '2rem' : undefined,
            }}
          >
            {mediumRiskCount}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 1,
              fontSize: isMobile ? '0.675rem' : '0.75rem',
              textAlign: isMobile ? 'center' : 'left',
              whiteSpace: 'nowrap'
            }}
          >
            Require monitoring
          </Typography>

          <StatusIndicator sx={{ bgcolor: theme.palette.warning.main }} />
        </AnimatedGradientCard>
      </Grid>

      <Grid item xs={6} sm={6} md={3}>
        <AnimatedGradientCard sx={{ 
          position: 'relative',
          p: isMobile ? 1.5 : 3, 
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 0.5,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: 'center',
            width: '100%'
          }}>
            <Box sx={{ 
              backgroundColor: alpha(theme.palette.success.main, 0.2),
              borderRadius: '50%',
              width: isMobile ? 32 : 56,
              height: isMobile ? 32 : 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: isMobile ? 0 : 2,
              mb: isMobile ? 1 : 0
            }}>
              <CheckCircleIcon 
                sx={{ 
                  color: theme.palette.success.main,
                  fontSize: isMobile ? 20 : 32, 
                }} 
              />
            </Box>
            <Typography 
              color="success.main" 
              variant={isMobile ? "body2" : "h5"}
              sx={{ 
                fontWeight: 'bold',
                fontSize: isMobile ? '0.75rem' : undefined,
                lineHeight: 1.1
              }}
            >
              Low Risk
            </Typography>
          </Box>

          <Typography 
            variant={isMobile ? "h4" : "h2"} 
            component="div" 
            sx={{ 
              color: theme.palette.success.main,
              fontWeight: 'bold',
              my: isMobile ? 0.5 : 2,
              lineHeight: 1,
              textAlign: isMobile ? 'center' : 'left',
              fontSize: isMobile ? '2rem' : undefined,
            }}
          >
            {lowRiskCount}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 1,
              fontSize: isMobile ? '0.675rem' : '0.75rem',
              textAlign: isMobile ? 'center' : 'left',
              whiteSpace: 'nowrap'
            }}
          >
            Stable condition
          </Typography>

          <StatusIndicator sx={{ bgcolor: theme.palette.success.main }} />
        </AnimatedGradientCard>
      </Grid>
    </Grid>
  );
};

export default DashboardSummary; 