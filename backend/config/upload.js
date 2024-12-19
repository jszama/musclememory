const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (fileBuffer, user_id) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: user_id.toString(),
    Body: fileBuffer,
    ContentType: "image/jpeg",
    ACL: "public-read", 
  };

  try {
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  } catch (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }
};

module.exports = { uploadFile };
