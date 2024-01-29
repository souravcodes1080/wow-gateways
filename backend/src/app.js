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

//routes declaration
app.use("/home", bookingRouter);
app.use("/admin", adminRouter);
app.use("/homestay", homestayRouter);
export { app };
