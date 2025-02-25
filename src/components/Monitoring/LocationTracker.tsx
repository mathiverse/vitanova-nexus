import { Paper, Typography, Box, SxProps, Theme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface LocationTrackerProps {
  location: string;
  sx?: SxProps<Theme>;
}

/**
 * Component to display inmate location information
 * @param location - Current location of the inmate
 * @param sx - Optional MUI styling props
 */
const LocationTracker = ({ location, sx }: LocationTrackerProps) => {
  // In a real app, this would be actual data
  const timeInLocation = `${Math.floor(Math.random() * 120) + 5} minutes`;
  
  // Mock facility map - in a real app this would be an actual map
  const facilityMap = {
    'Block A': { x: 20, y: 30 },
    'Block B': { x: 60, y: 30 },
    'Block C': { x: 80, y: 60 },
    'Cafeteria': { x: 40, y: 70 },
    'Recreation': { x: 20, y: 70 },
    'Library': { x: 60, y: 70 },
    'Workshop': { x: 80, y: 30 },
  };
  
  const currentPosition = facilityMap[location as keyof typeof facilityMap] || { x: 50, y: 50 };
  
  return (
    <Paper sx={{ 
      p: 2, 
      borderRadius: 2, 
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      ...sx 
    }}>
      <Typography variant="h6" gutterBottom>
        Location Tracking
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <LocationOnIcon color="error" sx={{ mr: 1 }} />
        <Typography variant="body1">
          Current Location: <strong>{location}</strong>
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AccessTimeIcon color="action" sx={{ mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Time in location: {timeInLocation}
        </Typography>
      </Box>
      
      {/* Simple facility map visualization */}
      <Box 
        sx={{ 
          width: '100%', 
          height: 200, 
          bgcolor: '#f0f4f8',
          borderRadius: 1,
          position: 'relative',
          border: '1px solid #e0e0e0',
          overflow: 'hidden'
        }}
      >
        {/* Map labels */}
        {Object.entries(facilityMap).map(([name, pos]) => (
          <Typography 
            key={name}
            variant="caption"
            sx={{ 
              position: 'absolute',
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
              color: location === name ? 'primary.main' : 'text.secondary',
              fontWeight: location === name ? 'bold' : 'normal',
            }}
          >
            {name}
          </Typography>
        ))}
        
        {/* Current position indicator */}
        <Box 
          sx={{ 
            position: 'absolute',
            left: `${currentPosition.x}%`,
            top: `${currentPosition.y}%`,
            width: 12,
            height: 12,
            bgcolor: 'error.main',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 0 4px rgba(211, 47, 47, 0.3)',
            animation: 'pulse 1.5s infinite',
            '@keyframes pulse': {
              '0%': {
                boxShadow: '0 0 0 0 rgba(211, 47, 47, 0.7)',
              },
              '70%': {
                boxShadow: '0 0 0 10px rgba(211, 47, 47, 0)',
              },
              '100%': {
                boxShadow: '0 0 0 0 rgba(211, 47, 47, 0)',
              },
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default LocationTracker; 