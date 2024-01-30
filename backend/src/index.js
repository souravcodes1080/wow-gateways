import {app} from "./app.js"
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors"
// Import required modules
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
app.use(cors())
app.use(bodyParser.json());
app.use(fileUpload());

dotenv.config();

connectDB()
  .then(()=>{
    app.listen(process.env.PORT || 8080, ()=>{
        console.log(`Server is running at port ${process.env.PORT}` )
    })
  })
  .catch((err) => {
    console.error("MongoDB connection failed");
  });

  //***changes***