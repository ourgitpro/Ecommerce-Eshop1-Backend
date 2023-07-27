const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/userModel");

const router = express.Router();

// Create a storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder where images will be stored
    const uploadDir = path.join(__dirname, "../public/images/users");
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the folder if it doesn't exist
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Set the filename as the current timestamp with the original extension
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const filename = `${timestamp}${extension}`;
    cb(null, filename);
  },
});

// Create the multer middleware with the storage engine
const upload = multer({ storage: storage });

router.post("/register", upload.single("image"), async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Get the file path of the uploaded image
    const imagePath = req.file ? req.file.path : null;

    const userExists = await User.exists({ email: email });
    if (userExists) {
      // If the user already exists, delete the uploaded image
      if (imagePath) {
        fs.unlinkSync(imagePath);
      }
      throw new Error("This user email already exists");
    }

    // Create the user and store the image path in the database
    await User.create({
      name,
      email,
      password,
      phone,
      address,
      image: imagePath,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
