const AWS = require('aws-sdk');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const uploadFile = (fileBuffer, user_id) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: user_id.toString(),
    Body: fileBuffer,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data.Location);
    });
  });
};

module.exports = { uploadFile };
