import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

/**
 * Navigation bar component for the VitaNova Nexus platform
 */
const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <MonitorHeartIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          VitaNova Nexus
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit">
            Reports
          </Button>
          <Button color="inherit">
            Settings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 