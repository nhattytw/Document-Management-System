import React, { useState, useEffect } from 'react'
import { Box, Button, TextField, Modal, Typography, IconButton, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { getToken, removeToken } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB
const ALLOWED_FILE_TYPES = [
      'image/jpeg', 'image/gif', 'image/png', 'image/tiff', 'image/webp',
      'image/heif', 'image/heic', 'audio/mpeg', 'audio/ogg', 'audio/wav',
      'audio/flac', 'video/mp4', 'video/webm', 'video/quicktime',
      'video/x-msvideo', 'video/3gpp', 'video/3gpp2', 'application/pdf',
      'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

const UploadModal = ({ open, onClose, onUploadSuccess }) => {
      const base_url = 'http://localhost:5000/api'
      const navigate = useNavigate()
      const token = getToken()

      const [fileName, setFileName] = useState('')
      const [file, setFile] = useState(null)
      const [error, setError] = useState({ fileName: false, file: false })
      const [message, setMessage] = useState('')
      const [variant, setVariant] = useState('success')
      const [show, setShow] = useState(false)

      useEffect(() => {
            if (open) {
                  setFileName('')
                  setFile(null)
                  setError({ fileName: false, file: false })
                  setMessage('')
                  setVariant('success')
                  setShow(false)
            }
      }, [open])

      const handleUpload = async () => {
            const hasError = !fileName || !file || file.size > MAX_FILE_SIZE || !ALLOWED_FILE_TYPES.includes(file.type)

            setError({
                  fileName: !fileName,
                  file: !file || file.size > MAX_FILE_SIZE || !ALLOWED_FILE_TYPES.includes(file.type)
            })

            if (hasError) {
                  setMessage('Please provide a valid file and ensure it is less than 25MB')
                  setVariant('error')
                  setShow(true)
                  return
            }

            const formData = new FormData()
            formData.append('fileName', fileName)
            formData.append('file', file)

            try {
                  const response = await fetch(`${base_url}/documents/upload`, {
                        method: 'POST',
                        headers: {
                              'Authorization': `Bearer ${token}`
                        },
                        body: formData
                  })
                  const data = await response.json()

                  if (data.error) {
                        if (data.error === 'Token expired') {
                              removeToken()
                              navigate('/signin')
                        } else {
                              setMessage(data.error)
                              setVariant('error')
                              setShow(true)
                        }
                  } else {
                        onUploadSuccess(data.data)
                        onClose()
                  }
            } catch (error) {
                  console.error('Failed to upload document', error)
                  setMessage('Failed to upload document')
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
                              <Typography variant="h6">Upload Document</Typography>
                              <IconButton onClick={onClose}><CloseIcon /></IconButton>
                        </Box>
                        {show && (
                              <Alert severity={variant} sx={{ mt: 2 }}>
                                    {message}
                              </Alert>
                        )}
                        <TextField
                              fullWidth
                              label="File Name"
                              value={fileName}
                              onChange={(e) => setFileName(e.target.value)}
                              required
                              error={error.fileName && !fileName}
                              helperText={error.fileName && !fileName ? 'File name is required' : ''}
                              sx={{ mb: 2 }}
                        />
                        <input
                              type="file"
                              onChange={(e) => setFile(e.target.files[0])}
                              style={{ marginBottom: '16px' }}
                              required
                        />
                        {error.file && (
                              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                                    {file && file.size > MAX_FILE_SIZE ? 'File size exceeds 25MB' : 'Invalid file type'}
                              </Typography>
                        )}
                        <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={handleUpload}
                        >
                              Upload
                        </Button>
                  </Box>
            </Modal>
      )
}

export default UploadModal
