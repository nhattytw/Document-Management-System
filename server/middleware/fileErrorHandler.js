const multer = require('multer')
const messageFunction = require('../utils/messageFunction')

const fileErrorHandler = (err, _req, res, next) => {
      if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            if (err.code === 'LIMIT_FILE_SIZE') {
                  return res
                        .status(400)
                        .json(messageFunction(true, 'File too big'))
            }
            return res
                  .status(400)
                  .json({ error: err.message })
      } else if (err) {
            if (err.message === 'Unsupported file type') {
                  return res
                        .status(400)
                        .json(messageFunction(true, 'Unsupported file type'))
            }
            return res
                  .status(500)
                  .json(messageFunction(true, 'Internal server error'))
      }

      // If no errors, pass to the next middleware
      next()
}

module.exports = fileErrorHandler