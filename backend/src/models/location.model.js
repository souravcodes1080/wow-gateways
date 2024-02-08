import mongoose from "mongoose";


const locationSchema = new mongoose.Schema({
   locationName:{
    type: String,
    require: true,
   },
   locationAddress:{
    type: String,
    require: true,
   },
   viewpointImages:{
      type: [],
   },
   locationRating:{
    type: Number,
   },
   locationHolder:{
    type: String,
   }
});



export const Location = mongoose.model("Location", locationSchema);
