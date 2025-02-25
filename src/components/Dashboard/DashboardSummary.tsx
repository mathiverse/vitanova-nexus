import { Grid, Paper, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

interface DashboardSummaryProps {
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  totalCount: number;
}

// Styled components for glassmorphism effect
const GlassCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  minHeight: 160,
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
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 12px 40px rgba(0, 0, 0, 0.4)'
      : '0 12px 40px rgba(0, 0, 0, 0.12)',
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: '50%',
  marginRight: theme.spacing(2),
  flexShrink: 0,
}));

/**
 * Summary component showing risk level distribution with modern glassmorphism design
 */
const DashboardSummary = ({ 
  highRiskCount, 
  mediumRiskCount, 
  lowRiskCount,
  totalCount 
}: DashboardSummaryProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <GlassCard sx={{ 
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(96, 165, 250, 0.05))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(37, 99, 235, 0.05))',
        }}>
          <Box display="flex" alignItems="center" mb={2} flexWrap={isXs ? 'wrap' : 'nowrap'}>
            <IconContainer sx={{ 
              bgcolor: 'primary.light', 
              color: 'primary.contrastText',
              mb: isXs ? 1 : 0,
              mr: isXs ? 0 : 2,
              mx: isXs ? 'auto' : undefined
            }}>
              <PeopleAltIcon />
            </IconContainer>
            <Typography 
              variant="h6" 
              color="primary.main" 
              fontWeight="medium"
              textAlign={isXs ? 'center' : 'left'}
              width={isXs ? '100%' : 'auto'}
            >
              Total Monitored
            </Typography>
          </Box>
          <Typography 
            component="p" 
            variant="h3" 
            color="primary.main" 
            fontWeight="bold"
            textAlign={isXs ? 'center' : 'left'}
            sx={{ wordBreak: 'break-word' }}
          >
            {totalCount}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 1, 
              color: 'text.secondary',
              textAlign: isXs ? 'center' : 'left'
            }}
          >
            Active monitoring
          </Typography>
          <Box sx={{ 
            height: 4, 
            width: '100%', 
            mt: 'auto', 
            borderRadius: 2,
            background: 'linear-gradient(90deg, #3b82f6, #60a5fa)'
          }} />
        </GlassCard>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <GlassCard sx={{ 
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(248, 113, 113, 0.05))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(239, 68, 68, 0.05))',
        }}>
          <Box display="flex" alignItems="center" mb={2} flexWrap={isXs ? 'wrap' : 'nowrap'}>
            <IconContainer sx={{ 
              bgcolor: 'error.light', 
              color: 'error.contrastText',
              mb: isXs ? 1 : 0,
              mr: isXs ? 0 : 2,
              mx: isXs ? 'auto' : undefined
            }}>
              <WarningIcon />
            </IconContainer>
            <Typography 
              variant="h6" 
              color="error.main" 
              fontWeight="medium"
              textAlign={isXs ? 'center' : 'left'}
              width={isXs ? '100%' : 'auto'}
            >
              High Risk
            </Typography>
          </Box>
          <Typography 
            component="p" 
            variant="h3" 
            color="error.main" 
            fontWeight="bold"
            textAlign={isXs ? 'center' : 'left'}
          >
            {highRiskCount}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 1, 
              color: 'text.secondary',
              textAlign: isXs ? 'center' : 'left'
            }}
          >
            Require immediate attention
          </Typography>
          <Box sx={{ 
            height: 4, 
            width: '100%', 
            mt: 'auto', 
            borderRadius: 2,
            background: 'linear-gradient(90deg, #b91c1c, #ef4444)'
          }} />
        </GlassCard>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <GlassCard sx={{ 
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(251, 191, 36, 0.05))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(245, 158, 11, 0.05))',
        }}>
          <Box display="flex" alignItems="center" mb={2} flexWrap={isXs ? 'wrap' : 'nowrap'}>
            <IconContainer sx={{ 
              bgcolor: 'warning.light', 
              color: 'warning.contrastText',
              mb: isXs ? 1 : 0,
              mr: isXs ? 0 : 2,
              mx: isXs ? 'auto' : undefined
            }}>
              <ReportProblemIcon />
            </IconContainer>
            <Typography 
              variant="h6" 
              color="warning.main" 
              fontWeight="medium"
              textAlign={isXs ? 'center' : 'left'}
              width={isXs ? '100%' : 'auto'}
            >
              Medium Risk
            </Typography>
          </Box>
          <Typography 
            component="p" 
            variant="h3" 
            color="warning.main" 
            fontWeight="bold"
            textAlign={isXs ? 'center' : 'left'}
          >
            {mediumRiskCount}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 1, 
              color: 'text.secondary',
              textAlign: isXs ? 'center' : 'left'
            }}
          >
            Require monitoring
          </Typography>
          <Box sx={{ 
            height: 4, 
            width: '100%', 
            mt: 'auto', 
            borderRadius: 2,
            background: 'linear-gradient(90deg, #d97706, #f59e0b)'
          }} />
        </GlassCard>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <GlassCard sx={{ 
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(52, 211, 153, 0.05))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(16, 185, 129, 0.05))',
        }}>
          <Box display="flex" alignItems="center" mb={2} flexWrap={isXs ? 'wrap' : 'nowrap'}>
            <IconContainer sx={{ 
              bgcolor: 'success.light', 
              color: 'success.contrastText',
              mb: isXs ? 1 : 0,
              mr: isXs ? 0 : 2,
              mx: isXs ? 'auto' : undefined
            }}>
              <CheckCircleIcon />
            </IconContainer>
            <Typography 
              variant="h6" 
              color="success.main" 
              fontWeight="medium"
              textAlign={isXs ? 'center' : 'left'}
              width={isXs ? '100%' : 'auto'}
            >
              Low Risk
            </Typography>
          </Box>
          <Typography 
            component="p" 
            variant="h3" 
            color="success.main" 
            fontWeight="bold"
            textAlign={isXs ? 'center' : 'left'}
          >
            {lowRiskCount}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 1, 
              color: 'text.secondary',
              textAlign: isXs ? 'center' : 'left'
            }}
          >
            Stable condition
          </Typography>
          <Box sx={{ 
            height: 4, 
            width: '100%', 
            mt: 'auto', 
            borderRadius: 2,
            background: 'linear-gradient(90deg, #047857, #10b981)'
          }} />
        </GlassCard>
      </Grid>
    </Grid>
  );
};

export default DashboardSummary; 