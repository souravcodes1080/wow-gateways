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
   locationRating:{
    type: Number,
   },
   locationHolder:{
    type: String,
   }
});



export const Location = mongoose.model("Location", locationSchema);
