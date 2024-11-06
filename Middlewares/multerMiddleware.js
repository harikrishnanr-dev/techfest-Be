const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define the upload path for event posters
const uploadPath = path.join(__dirname, '../uploads/event-posters');

// Check if the folder exists; if not, create it
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Create storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadPath);  // Set the upload path
  },
  
  filename: (req, file, callback) => {
    // Generate a unique file name based on the current timestamp
    const fileName = `image-${Date.now()}-${file.originalname}`;
    callback(null, fileName);  // Set the file name for storage
  }
});

// File filter function to accept only certain file types
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    callback(null, true);  // Accept the file
  } else {
    callback(new Error('Only PNG, JPG, or JPEG files are allowed.'), false);  // Reject the file
  }
};

// Multer configuration with storage, file filter, and limits
const multerConfig = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }  // Limit file size to 5MB
});

module.exports = multerConfig;
