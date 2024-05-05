import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { navbarStyles } from '../layouts/navbarStyles';
import { AuthContext } from '../contexts/AuthContextProvider';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [openNav, setopenNav] = useState(false);
  const anchorRef = useRef(null);
  const styles = navbarStyles();

  const handleLogout = async () => {
    logoutUser();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton
            aria-label="logo"
            size="large"
            edge="start"
            color="inherit"
            ref={anchorRef}
          >
            <LocalLibraryIcon />
          </IconButton>
        </Link>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
        >
          Lectermo
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" sx={styles.buttonStyle}>
            Members
          </Button>
          <Button color="inherit" sx={styles.buttonStyle}>
            Courses
          </Button>
          {user ? (
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={styles.register}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                onClick={() => navigate('/login')}
                color="inherit"
                sx={styles.buttonStyle}
              >
                Log In
              </Button>
              <Button
                onClick={() => navigate('/register')}
                color="inherit"
                sx={styles.register}
              >
                Register
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
          {openNav ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={() => setopenNav(false)} // Close the dropdown
              ref={anchorRef}
            >
              <CloseIcon /> {/* Show CloseIcon when dropdown is open */}
            </IconButton>
          ) : (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={() => setopenNav(true)} // Open the dropdown
              ref={anchorRef}
            >
              <MenuIcon /> {/* Show MenuIcon when dropdown is closed */}
            </IconButton>
          )}
          <Menu
            open={openNav}
            onClose={() => setopenNav(false)}
            anchorEl={anchorRef.current}
            PaperProps={{
              elevation: 0,
              sx: {
                borderRadius: 3,
                width: 150,
              },
            }}
          >
            <MenuList>
              <MenuItem sx={styles.menuItemStyles}>Members</MenuItem>
              <MenuItem sx={styles.menuItemStyles}>Courses</MenuItem>
              {user ? (
                <MenuItem
                  onClick={() => handleLogout()}
                  sx={styles.menuItemStyles}
                >
                  Logout
                </MenuItem>
              ) : (
                <div>
                  <MenuItem
                    onClick={() => navigate('/login')}
                    sx={styles.menuItemStyles}
                  >
                    Log In
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate('/register')}
                    sx={styles.menuItemStyles}
                  >
                    Register
                  </MenuItem>
                </div>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
