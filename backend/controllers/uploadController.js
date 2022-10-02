const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: "AKIA4SUTOYRGORRYWUFA",
    secretAccessKey: "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",
  });
const fs = require('fs');

/**
 * API: /upload
 * Type: POST,
 * 
 * Upload any file with given file directory settings and return URL
 * 
 * Data: {
 *   fileKey: string,
 *   contentType: string
 * }
 * 
 * Error Codes: Error_EmptyFile
 */
 module.exports = {
    upload: async (req, res) => {
        const file = req.files.file;
        let fileKey = new Date().getTime().toString();
        const contentType = req.body.contentType;
      
        if (file) {
          const fileBlob = fs.readFileSync(file.path);
          const uploadedFile = await s3.upload({
            Bucket: "scannget-v2",
            Key: fileKey,
            Body: fileBlob,
            ContentType: contentType ? contentType : 'auto'
          }).promise();
      
          const url = uploadedFile.Location;
      
          res.json({
            status: true,
            data: url
          });
        }
        else {
          res.json({
            status: false,
            errorCode: "Error_EmptyFile"
          });
        }
    }
 };