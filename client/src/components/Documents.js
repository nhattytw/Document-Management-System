import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button, Alert } from '@mui/material'
import { Edit, Delete, GetApp } from '@mui/icons-material'
import UploadModal from './UploadModal'
import EditModal from './EditModal'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { getToken, removeToken } from '../utils/auth'

const StyledTableHead = styled(TableHead)({
      backgroundColor: 'rgba(237, 111, 49, 0.75)',
      '& th': {
            color: '#ffffff',
            textAlign: 'center',
      },
})

const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(even)': {
            backgroundColor: '#f2f2f2',
      },
      '&:hover': {
            backgroundColor: 'rgba(237, 111, 49, 0.2)',
      },
}))


const Documents = () => {
      const base_url = 'http://localhost:5000/api'

      const navigate = useNavigate()

      const [documents, setDocuments] = useState([])
      const [uploadOpen, setUploadOpen] = useState(false)
      const [editOpen, setEditOpen] = useState(false)
      const [documentId, setDocumentId] = useState(null)

      const [message, setMessage] = useState('')
      const [variant, setVariant] = useState('success')
      const [show, setShow] = useState(false)

      const token = getToken()

      useEffect(() => {
            const fetchDocuments = async () => {
                  try {
                        const response = await fetch(
                              base_url + '/documents',
                              {
                                    headers: {
                                          'Authorization': `Bearer ${token}`
                                    }
                              }
                        )
                        const data = await response.json()

                        setDocuments(data.data)
                  } catch (error) {
                        console.error('Failed to fetch documents', error)
                        setMessage('Failed to fetch documents')
                        setVariant('error')
                        setShow(true)
                  }
            }

            fetchDocuments()
      }, [token])

      const handleUploadOpen = () => setUploadOpen(true)
      const handleUploadClose = () => setUploadOpen(false)

      const handleUploadSuccess = (newDocument) => {
            setDocuments([...documents, newDocument])
      }

      const handleEditOpen = (id) => {
            setDocumentId(id)
            setEditOpen(true)
      }

      const handleEditClose = () => setEditOpen(false)

      const handleEditSuccess = (updatedDocument) => {
            setDocuments(documents.map(doc => doc.id === updatedDocument.id ? updatedDocument : doc))
      }

      const handleDelete = async (id) => {
            try {
                  await fetch(
                        base_url + '/documents/delete',
                        {
                              method: 'DELETE',
                              headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({ id })
                        })
                  setDocuments(documents.filter(doc => doc.id !== id))
            } catch (error) {
                  console.error('Failed to delete document', error)
                  setMessage('Failed to delete document')
                  setVariant('error')
                  setShow(true)
            }
      }

      const handleDownload = async (id) => {
            try {
                  const response = await fetch(
                        base_url + '/documents/download',
                        {
                              method: 'POST',
                              headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                              },
                              body: JSON.stringify({ id })
                        }
                  )

                  if (response.status === 401) {
                        removeToken()
                        navigate('/signin')
                  } else if (response.ok) {
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'document';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a); // Clean up after download
                  } else {
                        console.error('Failed to download document')
                        setMessage('Failed to download document')
                        setVariant('error')
                        setShow(true)
                  }
            } catch (error) {
                  console.error('Failed to download document:', error.message)
                  setMessage('Failed to download document')
                  setVariant('error')
                  setShow(true)

                  setTimeout(() => {
                        setShow(false)
                  }, 3000)
            }
      }

      return (
            <Container component="main">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 8 }}>
                        <Typography component="h1" variant="h5">Documents</Typography>
                        <Button variant="contained" color="primary" onClick={handleUploadOpen}>Upload Document</Button>
                  </Box>
                  {show && (
                        <Alert severity={variant} sx={{ mt: 2, width: '100%' }}>
                              {message}
                        </Alert>
                  )}
                  {
                        documents.length ? (
                              <>
                                    <Table sx={{ mt: 4 }}>
                                          <StyledTableHead>
                                                <TableRow>
                                                      <TableCell>File Name</TableCell>
                                                      <TableCell>File Size</TableCell>
                                                      <TableCell>Upload Date</TableCell>
                                                      <TableCell>Actions</TableCell>
                                                </TableRow>
                                          </StyledTableHead>
                                          <TableBody>
                                                {documents.map((document) => (
                                                      <StyledTableRow key={document.id}>
                                                            <TableCell style={{ textAlign: 'center' }}>{document.fileName}</TableCell>
                                                            <TableCell style={{ textAlign: 'center' }}>{document.fileSize}</TableCell>
                                                            <TableCell style={{ textAlign: 'center' }}>{new Date(document.upload_date).toLocaleDateString()}</TableCell>
                                                            <TableCell style={{ textAlign: 'center' }}>
                                                                  <IconButton onClick={() => handleEditOpen(document.id)} sx={{ color: 'gray' }}>
                                                                        <Edit />
                                                                  </IconButton>
                                                                  <IconButton onClick={() => handleDownload(document.id)} sx={{ color: 'cornflowerblue' }}>
                                                                        <GetApp />
                                                                  </IconButton>
                                                                  <IconButton onClick={() => handleDelete(document.id)} sx={{ color: 'firebrick' }}>
                                                                        <Delete />
                                                                  </IconButton>
                                                            </TableCell>
                                                      </StyledTableRow>
                                                ))}
                                          </TableBody>
                                    </Table>
                              </>
                        ) : (
                              <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                                    No documents found.
                              </Typography>
                        )
                  }

                  <UploadModal open={uploadOpen} onClose={handleUploadClose} onUploadSuccess={handleUploadSuccess} />
                  <EditModal open={editOpen} onClose={handleEditClose} documentId={documentId} onEditSuccess={handleEditSuccess} />

            </Container>
      )
}

export default Documents