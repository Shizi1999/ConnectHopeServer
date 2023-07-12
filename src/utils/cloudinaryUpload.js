const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "connecthope", // Set the folder name where you want to store the images
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const cloudinaryUpload = multer({ storage: storage });

module.exports = cloudinaryUpload;
