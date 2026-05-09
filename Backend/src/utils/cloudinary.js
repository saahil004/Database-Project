import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

console.log('Cloudinary env check:');
console.log('cloud_name:', process.env.CLOUDINARY_CLOUD_NAME || 'MISSING');
console.log('api_key:', process.env.CLOUDINARY_API_KEY ? 'PRESENT' : 'MISSING');
console.log('api_secret:', process.env.CLOUDINARY_API_SECRET ? 'PRESENT' : 'MISSING');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log('Cloudinary config applied');

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;

  } catch (error) {
    console.log("Cloudinary FULL ERROR:", error);
    console.log("Error message:", error.message);
    console.log("Error status:", error.statusCode);

    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };