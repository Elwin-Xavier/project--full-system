import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
dotenv.config();

// Configure AWS S3 (v3)
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export const uploadToS3 = async (fileName, fileContent) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `tickets/${fileName}.pdf`,
      Body: fileContent,
      ContentType: 'application/pdf',
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/tickets/${fileName}.pdf`;
    return fileUrl; 
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload PDF to S3');
  }
};
