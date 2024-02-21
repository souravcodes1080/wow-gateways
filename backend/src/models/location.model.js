import mongoose from "mongoose";


const locationSchema = new mongoose.Schema({
   locationName:{
    type: String,
   },
   locationAddress:{
    type: String,
   },
   locationRating:{
    type: Number,
   },
   locationHolder:{
    type: String,
   }
});



export const Location = mongoose.model("Location", locationSchema);
