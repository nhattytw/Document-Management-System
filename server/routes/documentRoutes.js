const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../config/multerConfig')
const fileErrorHandler = require('../middleware/fileErrorHandler')
const uploadRateLimiter = require('../middleware/rateLimiter')
// const uploadAndScanDocument = require('../middleware/uploadAndScanDocument')
const {
      getDocuments,
      uploadDocument,
      downloadDocument,
      deleteDocument,
      editDocumentName,
      searchDocument } = require('../controllers/documentController')

router.get(
      '/',
      authMiddleware,
      getDocuments,
      fileErrorHandler
)

router.post(
      '/search',
      authMiddleware,
      searchDocument
)

router.post(
      '/upload',
      authMiddleware,
      upload,
      // uploadAndScanDocument,
      fileErrorHandler,
      uploadRateLimiter,
      uploadDocument,
)

router.put(
      '/edit',
      authMiddleware,
      editDocumentName,
      fileErrorHandler
)

router.post(
      '/download',
      authMiddleware,
      downloadDocument
)

router.delete(
      '/delete',
      authMiddleware,
      deleteDocument
)

module.exports = router