// utils/s3Delete.js
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function deleteFromS3(fileUrl) {
  try {
    // Extract the key from the URL
    // URL format: https://bucket-name.s3.region.amazonaws.com/folder/filename
    const urlParts = fileUrl.split('.amazonaws.com/');
    if (urlParts.length !== 2) {
      throw new Error('Invalid S3 URL format');
    }
    
    const key = urlParts[1];

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    return true;
  } catch (error) {
    console.error("Error deleting from S3:", error);
    throw error;
  }
}