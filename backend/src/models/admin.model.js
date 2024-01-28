import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
  username: String,
  password: String, // Hashed password
}, {timestamps: true});



export const Admin = mongoose.model("Admin", adminSchema);
