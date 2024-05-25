import React from 'react'
import { Container, Typography, Box } from '@mui/material'

const Home = () => {
      return (
            <Container component="main" maxWidth="sm">
                  <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography component="h1" variant="h5" gutterBottom>
                              Welcome to the Document Management System
                        </Typography>
                        <Typography paragraph>
                              This app is used to manage your documents.
                        </Typography>
                  </Box>
            </Container>
      )
}

export default Home