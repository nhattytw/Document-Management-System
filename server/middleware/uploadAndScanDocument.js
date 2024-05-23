require('dotenv').config()
const VirusTotalApi = require('virustotal-api')

const apiKey = process.env.VIRUSTOTAL_API_KEY
// const virusTotalApi = new VirusTotalApi(apiKey)
const virusTotalApi = new VirusTotalApi(
      apiKey,
      { baseUrl: 'https://www.virustotal.com/api/v3/files' }
)

const uploadAndScanDocument = async (req, res, next) => {
      try {
            // Assuming the uploaded file is accessible through req.file
            const fileBuffer = req.file.buffer
            const fileName = req.file.originalname

            // Submit the file to VirusTotal for scanning using the correct function
            const scanResponse = await virusTotalApi.fileScan(fileName, fileBuffer)

            // Improved error handling to check for the existence of the data object and id property
            if (scanResponse && scanResponse.data && scanResponse.data.id) {
                  console.log(`Scan ID: ${scanResponse.data.id}`)
                  // Optionally, retrieve the scan report after some time
                  // Note: You might need to poll the VirusTotal API periodically to get the final report

                  res.json({ message: 'File uploaded and submitted for scanning', scanId: scanResponse.data.id })
            } else {
                  // Handle cases where the response is not as expected
                  console.error('Unexpected response from VirusTotal:', scanResponse)
                  // Decide on the appropriate action, e.g., retry, notify the user, etc.
                  res.status(500).json({ error: 'Failed to submit file to VirusTotal for scanning.' })
            }
      } catch (error) {
            console.error('Error submitting file to VirusTotal:', error)
            // Forward the error to your errorHandler
            next(error)
      }
}

module.exports = uploadAndScanDocument