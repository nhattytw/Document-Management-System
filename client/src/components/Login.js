import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Cookies from 'js-cookie'

const defaultTheme = createTheme()

const Login = () => {
      const [username, setUsername] = useState('')
      const [password, setPassword] = useState('')
      const [variant, setVariant] = useState('success')
      const [show, setShow] = useState(false)
      const [message, setMessage] = useState('')
      const navigate = useNavigate()

      const handleLogin = async (e) => {
            e.preventDefault()

            const base_url = 'http://localhost:5000/api'

            try {
                  const response = await fetch(
                        base_url + '/auth/login',
                        {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ username, password })
                        }
                  )

                  const data = await response.json()

                  if (data.message === "You've Logged in.") {
                        Cookies.set(
                              'token',
                              data.data.token,
                              {
                                    secure: true,
                                    sameSite: 'strict'
                              }
                        )

                        setMessage("Login successful!")
                        setVariant("success")
                        setShow(true)

                        setTimeout(() => {
                              navigate('/documents')
                        }, 2000)
                  } else {
                        setMessage(data.message)
                        setVariant("error")
                        setShow(true)
                  }

                  setUsername('')
                  setPassword('')

                  setTimeout(() => {
                        setShow(false)
                  }, 3000)
            } catch (error) {
                  console.error('Login failed', error)
                  setMessage('Login failed')
                  setVariant('error')
                  setShow(true)
                  
                  setTimeout(() => {
                        setShow(false)
                  }, 3000)
            }
      }

      return (
            <ThemeProvider theme={defaultTheme}>
                  <Container component="main" maxWidth="xs">
                        <CssBaseline />

                        <Box
                              sx={{
                                    marginTop: 10,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                              }}
                        >
                              <Typography component="h1" variant="h5">
                                    Sign in
                              </Typography>
                              {show && (
                                    <Alert severity={variant} sx={{ mt: 2, mb: 2, width: '100%' }}>
                                          {message}
                                    </Alert>
                              )}
                              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                                    <TextField
                                          margin="normal"
                                          required
                                          fullWidth
                                          id="username"
                                          label="Username"
                                          name="username"
                                          autoComplete="username"
                                          autoFocus
                                          value={username}
                                          onChange={(e) => setUsername(e.target.value)}
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
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button
                                          type="submit"
                                          fullWidth
                                          variant="contained"
                                          sx={{ mt: 3, mb: 2 }}
                                    >
                                          Sign In
                                    </Button>
                              </Box>
                        </Box>
                  </Container>
            </ThemeProvider>
      )
}

export default Login