import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import AccountManagement from './AccountManagement';
import PasswordChange from './PasswordChange';

const defaultTheme = createTheme();

const Settings = () => {
      const [selectedSection, setSelectedSection] = useState('account-management');
      const [mobileOpen, setMobileOpen] = useState(false);

      const theme = useTheme();
      const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

      const handleDrawerToggle = () => {
            setMobileOpen(!mobileOpen);
      };

      const drawer = (
            <div>
                  <List>
                        <ListItem
                              button
                              onClick={() => setSelectedSection('account-management')}
                              selected={selectedSection === 'account-management'}
                              sx={{
                                    '&.Mui-selected': {
                                          backgroundColor: theme.palette.action.selected,
                                    },
                              }}
                        >
                              <ListItemText primary="Account Management" />
                        </ListItem>
                        <ListItem
                              button
                              onClick={() => setSelectedSection('password-change')}
                              selected={selectedSection === 'password-change'}
                              sx={{
                                    '&.Mui-selected': {
                                          backgroundColor: theme.palette.action.selected,
                                    },
                              }}
                        >
                              <ListItemText primary="Password Change" />
                        </ListItem>
                  </List>
            </div>
      );

      return (
            <ThemeProvider theme={defaultTheme}>
                  <CssBaseline />
                  <Box sx={{ display: 'flex' }}>
                        <Box
                              component="nav"
                              sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
                              aria-label="mailbox folders"
                        >
                              <Drawer
                                    variant="temporary"
                                    open={mobileOpen}
                                    onClose={handleDrawerToggle}
                                    ModalProps={{
                                          keepMounted: true, // Better open performance on mobile.
                                    }}
                                    sx={{
                                          display: { xs: 'block', sm: 'none' },
                                          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, marginTop: '64px' },
                                    }}
                              >
                                    {drawer}
                              </Drawer>
                              <Drawer
                                    variant="permanent"
                                    sx={{
                                          display: { xs: 'none', sm: 'block' },
                                          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, marginTop: '64px' },
                                    }}
                                    open
                              >
                                    {drawer}
                              </Drawer>
                        </Box>
                        <Box
                              component="main"
                              sx={{
                                    flexGrow: 1,
                                    p: 3,
                                    width: { sm: `calc(100% - 240px)` },
                                    marginTop: '64px',
                              }}
                        >
                              {isMobile && (
                                    <IconButton
                                          color="inherit"
                                          aria-label="open drawer"
                                          edge="start"
                                          onClick={handleDrawerToggle}
                                          sx={{ mr: 2, display: { sm: 'none' } }}
                                    >
                                          <MenuIcon />
                                    </IconButton>
                              )}
                              {selectedSection === 'account-management' && <AccountManagement />}
                              {selectedSection === 'password-change' && <PasswordChange />}
                        </Box>
                  </Box>
            </ThemeProvider>
      );
};

export default Settings;