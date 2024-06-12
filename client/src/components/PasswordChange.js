import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const defaultTheme = createTheme();

const PasswordChange = () => {
      const [formData, setFormData] = useState({
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
      });
      const [variant, setVariant] = useState('success');
      const [show, setShow] = useState(false);
      const [message, setMessage] = useState('');
      const navigate = useNavigate();

      const handleChange = (e) => {
            setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
            });
      };

      const handleRegister = async (e) => {
            e.preventDefault();

            const base_url = 'http://localhost:5000/api';

            try {
                  const response = await fetch(base_url + '/auth/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                  });

                  const data = await response.json();

                  if (data.message === 'User Created') {
                        setMessage('Registration successful! Redirecting to login...');
                        setVariant('success');
                        setShow(true);

                        setTimeout(() => {
                              navigate('/login');
                        }, 2000);
                  } else {
                        setMessage(data.message);
                        setVariant('error');
                        setShow(true);
                  }

                  setFormData({
                        username: '',
                        password: '',
                        firstName: '',
                        lastName: '',
                        email: '',
                  });

                  setTimeout(() => {
                        setShow(false);
                  }, 3000);
            } catch (error) {
                  console.error('Registration failed', error);
                  setMessage('Registration failed');
                  setVariant('error');
                  setShow(true);
                  setTimeout(() => {
                        setShow(false);
                  }, 3000);
            }
      };

      return (
            <ThemeProvider theme={defaultTheme}>
                  <CssBaseline />
                  <Container component="main" maxWidth="xs">

                        <Box
                              sx={{
                                    marginTop: 10,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                              }}
                        >
                              <Typography component="h1" variant="h5">
                                    Change Password
                              </Typography>
                              {show && (
                                    <Alert severity={variant} sx={{ mt: 2, mb: 2, width: '100%' }}>
                                          {message}
                                    </Alert>
                              )}
                              <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
                                    <TextField
                                          margin="normal"
                                          required
                                          fullWidth
                                          id="username"
                                          label="Username"
                                          name="username"
                                          autoComplete="username"
                                          autoFocus
                                          value={formData.username}
                                          onChange={handleChange}
                                    />
                                    <TextField
                                          margin="normal"
                                          required
                                          fullWidth
                                          name="password"
                                          label="Password"
                                          type="password"
                                          id="password"
                                          autoComplete="current-password"
                                          value={formData.password}
                                          onChange={handleChange}
                                    />
                                    <TextField
                                          margin="normal"
                                          required
                                          fullWidth
                                          id="firstName"
                                          label="First Name"
                                          name="firstName"
                                          autoComplete="given-name"
                                          value={formData.firstName}
                                          onChange={handleChange}
                                    />
                                    <TextField
                                          margin="normal"
                                          required
                                          fullWidth
                                          id="lastName"
                                          label="Last Name"
                                          name="lastName"
                                          autoComplete="family-name"
                                          value={formData.lastName}
                                          onChange={handleChange}
                                    />
                                    <TextField
                                          margin="normal"
                                          required
                                          fullWidth
                                          id="email"
                                          label="Email Address"
                                          name="email"
                                          autoComplete="email"
                                          value={formData.email}
                                          onChange={handleChange}
                                    />
                                    <Button
                                          type="submit"
                                          fullWidth
                                          variant="contained"
                                          sx={{ mt: 3, mb: 2 }}
                                    >
                                          Register
                                    </Button>
                              </Box>
                        </Box>
                  </Container>
            </ThemeProvider>
      );
};

export default PasswordChange;