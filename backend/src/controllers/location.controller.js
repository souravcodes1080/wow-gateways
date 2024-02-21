import mongoose from "mongoose";
import { Location } from "../models/location.model.js";
import { upload } from "../utils/cloudinary.js";

const multerUpload = upload.fields([{ name: "viewpointImages", maxCount: 20 }]);
const addLocation = async (req, res) => {
  try {
    multerUpload(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "File upload error", error: err });
      }

      const { locationName, locationAddress, locationRating, locationHolder } =
        req.body;
      const viewpointImages = req.files["viewpointImages"].map(
        (file) => file.path
      );
      const newLocation = new Location({
        locationName,
        viewpointImages,
        locationAddress,
        locationRating,
        locationHolder,
      });

      await newLocation.save();

      res
        .status(201)
        .json({ success: true, message: "Location added successfully." });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Error adding location." });
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();

    if (!locations || locations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No locations found.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Locations fetched successfully.",
      locations,
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ success: false, message: "Error fetching location list." });
  }
};

const updateLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const updateData = req.body;

    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedLocation) {
      return res.status(404).json({
        success: false,
        message: "Location not found.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Location updated successfully.",
      location: updatedLocation,
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ success: false, message: "Error updating location details." });
  }
};

export { addLocation, getAllLocations, updateLocation };
