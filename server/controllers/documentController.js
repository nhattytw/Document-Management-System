require('dotenv').config()
const { Op } = require('sequelize')
const Document = require('../model/document')
const messageFunction = require('../utils/messageFunction')
// const VirusTotalApi = require('virustotal-api')

// const apiKey = process.env.VIRUSTOTAL_API_KEY
// const virusTotalApi = new VirusTotalApi(apiKey)

// @desc     Upload Document
// @access   Public
const uploadDocument = async (req, res) => {
      try {
            const { id: user_id } = req.user
            const { fileName } = req.body
            const file = req.file

            if (!fileName || !file) {
                  return res
                        .status(400)
                        .json(
                              messageFunction(true, 'File name and file are required')
                        )
            }

            const fileSizeInBytes = file.size
            const fileSizeInMB = fileSizeInBytes / (1024 * 1024)

            if (fileSizeInMB > 25) {
                  return res
                        .status(413)
                        .json(
                              messageFunction(true, "File too big")
                        )
            }

            const fileType = file.mimetype

            const newDocument = await Document.create({
                  user_id,
                  fileName,
                  fileSize: `${fileSizeInMB.toFixed(2)} MB`,
                  fileType,
                  file_content: file.buffer,
            })

            return res
                  .status(201)
                  .json(
                        messageFunction(false, 'File uploaded successfully', newDocument)
                  )
      } catch (error) {
            console.error('Error uploading document:', error)
            return res
                  .status(500)
                  .json(
                        messageFunction(true, `Internal server error - ${error.message}`)
                  )
      }
}

// @desc     Download Document
// @access   Public
const downloadDocument = async (req, res) => {
      const { id } = req.body

      try {
            const document = await Document.findOne({
                  where: {
                        id,
                        user_id: req.user.id
                  }
            })

            if (!document) {
                  return res
                        .status(404)
                        .json(
                              messageFunction(true, 'Document not found')
                        )
            }

            res.set({
                  'Content-Disposition': `attachment; filename="${document.fileName}"`,
                  'Content-Type': document.fileType,
                  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
                  'Access-Control-Expose-Headers': 'Content-Disposition, Content-Type',
            })

            const file_content = Buffer.from(document.file_content, 'base64')

            res.send(file_content)
      } catch (error) {
            console.error('Error downloading document:', error)
            return res
                  .status(500)
                  .json(
                        messageFunction(true, `Internal server error - ${error.message}`)
                  )
      }
}

// @desc     Delete Document
// @access   Public
const deleteDocument = async (req, res) => {
      const { id } = req.body
      try {
            const document = await Document.findOne({
                  where: {
                        id,
                        user_id: req.user.id
                  }
            })

            if (!document) {
                  return res
                        .status(404)
                        .json(
                              messageFunction(true, 'Document not found')
                        )
            }
            await document.destroy()

            return res
                  .status(200)
                  .json(
                        messageFunction(false, 'File deleted successfully')
                  )
      } catch (error) {
            console.error('Error deleting document:', error)
            return res
                  .status(500)
                  .json(
                        messageFunction(true, `Internal server error - ${error.message}`)
                  )
      }
}

// @desc     Get Documents
// @access   Private
const getDocuments = async (req, res) => {
      try {
            const documents = await Document.findAll({
                  where: { user_id: req.user.id },
                  attributes: ['id', 'fileName', 'fileSize', 'fileType', 'upload_date'],
                  order: [
                        ['upload_date', 'DESC']
                  ]
            })

            return res
                  .status(200)
                  .json(
                        messageFunction(false, 'Files Fetched Successfully', documents)
                  )
      } catch (error) {
            console.error('Error fetching documents:', error)
            return res
                  .status(500)
                  .json(
                        messageFunction(true, `Internal server error - ${error.message}`)
                  )
      }
}

// @desc     Search Document(s)
// @access   Private
const searchDocument = async (req, res) => {
      const { searchTerm } = req.body

      const regexPattern = `%${searchTerm}%`

      try {
            const documents = await Document.findAll({
                  where: {
                        user_id: req.user.id,
                        fileName: {
                              [Op.iLike]: regexPattern
                        }
                  },
                  attributes: ['id', 'fileName', 'fileSize', 'fileType', 'upload_date'],
                  order: [
                        ['upload_date', 'DESC']
                  ]
            })

            return res
                  .status(200)
                  .json(
                        messageFunction(false, 'Search Completed Successfully', documents)
                  )
      } catch (error) {
            console.error('Error searching documents:', error)
            return res
                  .status(500)
                  .json(
                        messageFunction(true, `Internal server error - ${error.message}`)
                  )
      }
}

// @desc     Edit Document Name
// @access   Private
const editDocumentName = async (req, res) => {
      const { id, newFileName } = req.body
      try {
            const document = await Document.findOne({
                  where: {
                        id,
                        user_id: req.user.id
                  }
            })

            if (!document) {
                  return res
                        .status(404)
                        .json(
                              messageFunction(true, 'Document not found')
                        )
            }

            if (!newFileName) {
                  return res
                        .status(404)
                        .json(
                              messageFunction(true, 'New file name is required')
                        )
            }

            document.fileName = newFileName
            await document.save()

            return res
                  .status(200)
                  .json(
                        messageFunction(false, 'File name updated successfully', document)
                  )
      } catch (error) {
            console.error('Error uploading document:', error)
            return res
                  .status(500)
                  .json(
                        messageFunction(true, `Internal server error - ${error.message}`)
                  )
      }
}

module.exports = { getDocuments, searchDocument, editDocumentName, uploadDocument, downloadDocument, deleteDocument }