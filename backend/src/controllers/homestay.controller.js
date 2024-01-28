import { Homestay } from "../models/homestay.model.js";
import {upload} from "../utils/cloudinary.js"
const multerUpload = upload.array('images', 20);

const add = async (req, res) => {
  try {
    // Handle file upload first
    multerUpload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "File upload error", error: err });
      }

      const {
        homestayName,
        phoneNumber,
        email,
        price,
        address,
        noOfrooms,
        noOfcars,
        googleMapLink,
      } = req.body;

      const images = req.files.map(file => file.path); // Extracting image URLs from Cloudinary

      const newHomestay = new Homestay({
        homestayName,
        phoneNumber,
        email,
        price,
        address,
        noOfrooms,
        noOfcars,
        images, // Array of image URLs
        // balconyImage,
        // viewImage,
        // roomImage,
        googleMapLink,
      });

      await newHomestay.save();
      res.status(201).send("Homestay added successfully");
    });
  } catch (error) {
    res.status(500).send("Error adding homestay");
  }
};

// Get all homestays
const getAll = async (req, res) => {
  try {
    const homestays = await Homestay.find();
    res.json(homestays);
  } catch (error) {
    res.status(500).send("Error retrieving homestays");
  }
};


export { add, getAll };
