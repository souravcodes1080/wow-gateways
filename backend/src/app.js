import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credential: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes
import bookingRouter from "./routes/booking.route.js";
import adminRouter from "./routes/admin.route.js";
import homestayRouter from "./routes/homestay.route.js";
import carRouter from "./routes/car.route.js";
import locationRouter from "./routes/location.route.js";

//routes declaration
app.use("/home", bookingRouter);
app.use("/admin", adminRouter);
app.use("/homestay", homestayRouter);
app.use("/car", carRouter);
app.use("/location", locationRouter);
export { app };
