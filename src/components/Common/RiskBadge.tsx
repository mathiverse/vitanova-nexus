import { Chip, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

interface RiskBadgeProps {
  level: 'HIGH' | 'MEDIUM' | 'LOW';
}

/**
 * Component to display risk level as a colored badge
 */
const RiskBadge = ({ level }: RiskBadgeProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const getColor = () => {
    switch (level) {
      case 'HIGH':
        return {
          bg: theme.palette.error.main,
          text: theme.palette.mode === 'dark' ? '#000' : '#fff'
        };
      case 'MEDIUM':
        return {
          bg: theme.palette.warning.main,
          text: theme.palette.mode === 'dark' ? '#000' : '#fff'
        };
      case 'LOW':
        return {
          bg: theme.palette.success.main,
          text: theme.palette.mode === 'dark' ? '#000' : '#fff'
        };
      default:
        return {
          bg: theme.palette.grey[500],
          text: '#fff'
        };
    }
  };

  const { bg, text } = getColor();

  return (
    <Chip
      label={level}
      color={
        level === 'HIGH' ? 'error' :
        level === 'MEDIUM' ? 'warning' : 'success'
      }
      size="small"
      sx={{
        backgroundColor: bg,
        color: text,
        fontWeight: 600,
        minWidth: 70,
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
          fontSize: '0.75rem',
          height: '24px',
          '& .MuiChip-label': {
            px: 1
          }
        }
      }}
    />
  );
};

export default RiskBadge; 