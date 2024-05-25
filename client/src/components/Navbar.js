import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { getToken, removeToken } from '../utils/auth';

const Navbar = () => {
      const token = getToken();
      const navigate = useNavigate();
      const [anchorEl, setAnchorEl] = React.useState(null);

      const handleMenu = (event) => {
            setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
            setAnchorEl(null);
      };

      const handleLogout = () => {
            removeToken();
            setAnchorEl(null);
            navigate('/');
      };

      return (
            <AppBar position="static" style={{ backgroundColor: '#ED6F31' }}>
                  <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                              Document Management System
                        </Typography>
                        {token ? (
                              <>
                                    <Button color="inherit" component={Link} to="/documents">Documents</Button>
                                    <IconButton
                                          size="large"
                                          edge="end"
                                          aria-label="account of current user"
                                          aria-controls="menu-appbar"
                                          aria-haspopup="true"
                                          onClick={handleMenu}
                                          color="inherit"
                                    >
                                          <AccountCircle />
                                    </IconButton>
                                    <Menu
                                          id="menu-appbar"
                                          anchorEl={anchorEl}
                                          anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                          }}
                                          keepMounted
                                          transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                          }}
                                          open={Boolean(anchorEl)}
                                          onClose={handleClose}
                                    >
                                          <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
                                          <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>
                              </>
                        ) : (
                              <>
                                    <Button color="inherit" component={Link} to="/login">Login</Button>
                                    <Button color="inherit" component={Link} to="/register">Register</Button>
                              </>
                        )}
                  </Toolbar>
            </AppBar>
      );
};

export default Navbar;
