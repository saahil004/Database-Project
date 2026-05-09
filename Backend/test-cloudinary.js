import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary test - env:');
console.log('cloud_name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('api_key:', process.env.CLOUDINARY_API_KEY ? 'SET' : 'MISSING');
console.log('api_secret:', process.env.CLOUDINARY_API_SECRET ? 'SET' : 'MISSING');

async function testPing() {
  try {
    const ping = await cloudinary.api.ping();
    console.log('Cloudinary ping success:', ping);
  } catch (error) {
    console.log('Ping failed:', error.message);
  }
}

testPing();

