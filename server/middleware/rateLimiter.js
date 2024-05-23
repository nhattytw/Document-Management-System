const rateLimit = require('express-rate-limit')

const uploadRateLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10, // Limit each IP to 10 requests per windowMs
      // message: 'Too many uploads from this IP, please try again later'
      message: 'Too many uploads from this Computer, Please try again later'
})

module.exports = uploadRateLimiter