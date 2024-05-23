const multer = require('multer')
const sanitize = require('sanitize-filename')

const storage = multer.memoryStorage()

const allowedFileTypes = [
      'image/jpeg', // JPEG images
      'image/gif', // GIF images
      'image/png', // PNG images
      'image/tiff', // TIFF images
      'image/webp', // WebP images
      'image/heif', // HEIF images
      'image/heic', // HEIC images
      'audio/mpeg', // MPEG audio files
      'audio/ogg', // OGG audio files
      'audio/wav', // WAV audio files
      'audio/flac', // FLAC audio files
      'video/mp4', // MP4 videos (including H.264 encoding)
      'video/webm', // WebM videos
      'video/quicktime', // QuickTime videos
      'video/x-msvideo', // AVI videos
      'video/3gpp', // 3GPP videos
      'video/3gpp2', // 3GPP2 videos
      'application/pdf', // PDF files
      'text/plain', // Text files (.txt)
      // Generic document formats (removing Microsoft-specific MIME types)
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word documents (DOCX)
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', // Presentations (PPTX)
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Spreadsheets (XLSX)
]

const fileFilter = (req, file, cb) => {
      const fileSize = parseInt(req.headers['content-length'])
      const maxSize = 25 * 1024 * 1024 // 25 MB

      if (fileSize > maxSize)
            return cb(
                  new multer.MulterError('LIMIT_FILE_SIZE', 'File too big'),
                  false
            )

      if (!allowedFileTypes.includes(file.mimetype)) {
            return cb(
                  new Error('Unsupported file type'),
                  false
            )
      }

      // Accept the file
      cb(null, true)
}

const upload = multer({
      storage: storage,
      fileFilter: fileFilter,
      limits: { fileSize: 25 * 1024 * 1024 },
      filename: (req, file, cb) => {
            const sanitizedFilename = sanitize(file.originalname)
            cb(null, sanitizedFilename)
      }
}).single('file')

module.exports = upload