import { Homestay } from "../models/homestay.model.js";
import { upload } from "../utils/cloudinary.js";
// const multerUpload = upload.array('images', 20);
const multerUpload = upload.fields([
  { name: "images", maxCount: 20 },
  { name: "balconyImage", maxCount: 10 },
  { name: "viewImage", maxCount: 10 },
  { name: "roomImage", maxCount: 10 },
]);

const addHomestay = async (req, res) => {
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
        b2b,
        address,
        noOfrooms,
        noOfcars,
        googleMapLink,
        features,
        location
      } = req.body;

      const featuresArray = features.split(",").map(feature => feature.trim());
      const images = req.files['images'].map((file) => file.path);
      const balconyImage = req.files['balconyImage'].map(file => file.path); 
      const viewImage = req.files['viewImage'].map(file => file.path); 
      const roomImage = req.files['roomImage'].map(file => file.path); 

      const newHomestay = new Homestay({
        homestayName,
        phoneNumber,
        email,
        price,
        b2b,
        address,
        noOfrooms,
        noOfcars,
        images, 
        balconyImage,
        viewImage,
        roomImage,
        googleMapLink,
        features: featuresArray,
        location
      });

      await newHomestay.save();
      res.status(201).send("Homestay added successfully");
    });
  } catch (error) {
    res.status(500).send("Error adding homestay");
  }
};

const getHomestayByHomestayName = async (req, res, next)=>{
  try{
    const {homestayName} = req.query;
    const homestay = await Homestay.findOne({homestayName})
    res.status(201).json(homestay.rooms)
  }
  catch(err){
    console.log(err)

  }
}

// Get all homestays
const getAllHomestayName = async (req, res) => {
  try {
    const homestays = await Homestay.find({}, 'homestayName price b2b noOfrooms'); 
    res.json(homestays);
  } catch (error) {
    res.status(500).send("Error retrieving homestays");
  }
};

const getAllHomestay = async (req, res) => {
  try {
    const homestays = await Homestay.find();
    res.json(homestays);
  } catch (error) {
    res.status(500).send("Error retrieving homestays");
  }
};

const updateHomestay = async (req, res) => {
  try {
    const { id } = req.params
    const updatedData = req.body; 
    const updatedHomestay = await Homestay.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!updatedHomestay) {
      console.log(updatedHomestay)
      return res.status(404).send('Homestay not found');
    }
    res.json(updatedHomestay);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating homestay');
  }
}


const deleteHomestay = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHomestay = await Homestay.findByIdAndDelete(id);
    if(deletedHomestay){

      res.send('Homestay deleted successfully');
    }else{
      res.send("Couldnt delete.")
    }
  } catch (error) {
    res.status(500).send('Error deleting homestay');
  }
}

export { addHomestay, getAllHomestay, updateHomestay, deleteHomestay, getAllHomestayName, getHomestayByHomestayName };
