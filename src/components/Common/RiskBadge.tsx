import { Chip, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

interface RiskBadgeProps {
  level: 'HIGH' | 'MEDIUM' | 'LOW';
}

/**
 * Component to display risk level as a colored badge
 */
const RiskBadge = ({ level }: RiskBadgeProps) => {
  const theme = useTheme();
  
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
      size="small"
      sx={{
        backgroundColor: bg,
        color: text,
        fontWeight: 'bold',
        minWidth: 70,
        justifyContent: 'center'
      }}
    />
  );
};

export default RiskBadge; 