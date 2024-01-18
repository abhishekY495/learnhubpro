import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { userRoutes } from "./src/routes/userRoutes.js";
import { errorHandler } from "./src/middlewares/errorMiddleware.js";
import { connectDB } from "./src/config/db.js";
import { courseRoutes } from "./src/routes/courseRoutes.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

connectDB();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "PROD"
        ? process.env.CORS_ORIGIN
        : process.env.LOCAL_HOST,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/course", courseRoutes);
app.use("/hello", (req, res) => res.json({ hello: "world" }));

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
