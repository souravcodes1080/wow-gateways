import { Homestay } from "../models/homestay.model.js";
import { upload } from "../utils/cloudinary.js";
// const multerUpload = upload.array('images', 20);
const multerUpload = upload.fields([
  { name: "images", maxCount: 20 },
  { name: "balconyImage", maxCount: 10 },
]);

const add = async (req, res) => {
  try {
    // Handle file upload first
    multerUpload(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "File upload error", error: err });
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

      const images = req.files['images'].map((file) => file.path);
      const balconyImage = req.files['balconyImage'].map(file => file.path); 

      const newHomestay = new Homestay({
        homestayName,
        phoneNumber,
        email,
        price,
        address,
        noOfrooms,
        noOfcars,
        images, 
        balconyImage,
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
