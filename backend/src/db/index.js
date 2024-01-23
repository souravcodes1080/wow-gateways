import mongoose from "mongoose";
import {DB_NAME} from '../constants.js';


const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Connected to MongoDB.\nDB name:",connectionInstance.connection.name, "\nPort name:",connectionInstance.connection.port);
    }catch(error){
        console.error("MongoDB connection error ", error);
        process.exit(1)
    }

}

export default connectDB;