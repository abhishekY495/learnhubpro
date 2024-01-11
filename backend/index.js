import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { facts } from "./utils/data.js";
import { allowedOrigins } from "./utils/allowedOrigins.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
  })
);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/facts", (req, res) => {
  res.json(facts);
});
