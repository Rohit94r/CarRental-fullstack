import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config(); // Make sure to load environment variables

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,    // ✅ fixed typo here
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export default imagekit;
