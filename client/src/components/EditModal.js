import React, { useState, useEffect } from 'react'
import { Box, Button, TextField, Modal, Typography, IconButton, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { getToken, removeToken } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

const EditModal = ({ open, onClose, documentId, onEditSuccess }) => {
      const base_url = 'http://localhost:5000/api'
      const navigate = useNavigate()

      const [newFileName, setNewFileName] = useState('')
      const [error, setError] = useState(false)
      const [message, setMessage] = useState('')
      const [variant, setVariant] = useState('success')
      const [show, setShow] = useState(false)

      const token = getToken()

      useEffect(() => {
            if (documentId) {
                  setNewFileName('')
                  setError(false)
                  setShow(false)
            }
      }, [documentId])

      const handleEdit = async () => {
            if (!newFileName) {
                  setError(true)
                  return
            }

            try {
                  const response = await fetch(
                        base_url + '/documents/edit',
                        {
                              method: 'PUT',
                              headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                              },
                              body: JSON.stringify({ id: documentId, newFileName })
                        }
                  )

                  const data = await response.json()

                  console.log(data)

                  if (data.error) {
                        if (data.error === 'Token expired') {
                              removeToken()
                              navigate('/signin')
                        } else {
                              console.log(data.error)
                              setMessage(data.error)
                              setVariant('error')
                              setShow(true)
                        }
                  } else {
                        setNewFileName('')

                        onEditSuccess(data.data)
                        onClose()
                  }
            } catch (error) {
                  console.error('Failed to update document name', error)
                  setMessage('Failed to update document name')
                  setVariant('error')
                  setShow(true)
            }
      }

      return (
            <Modal open={open} onClose={onClose}>
                  <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4
                  }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant="h6">Edit File Name</Typography>
                              <IconButton onClick={onClose}><CloseIcon /></IconButton>
                        </Box>
                        {show && (
                              <Alert severity={variant} sx={{ mt: 2 }}>
                                    {message}
                              </Alert>
                        )}
                        <TextField
                              fullWidth
                              label="New File Name"
                              value={newFileName}
                              onChange={(e) => setNewFileName(e.target.value)}
                              required
                              error={error && !newFileName}
                              helperText={error && !newFileName ? 'New file name is required' : ''}
                        />
                        <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                              sx={{ mt: 2 }}
                              onClick={handleEdit}
                        >
                              Edit
                        </Button>

                  </Box>
            </Modal>
      )
}

export default EditModal
