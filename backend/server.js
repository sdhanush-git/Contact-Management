import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/Db.js";
import router from "./routes/ContactRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/", router);

app.get("/", (req, res) => {
  res.json("Backend server is running...");
});

app.listen(process.env.PORT, () => {
  console.log("Hello");
  connectDB();
});
