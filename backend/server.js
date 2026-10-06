import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/Db.js";
import ContactModel from "./Models/ContactModel.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.json("Hello from backend");
});

app.post("/contacts", async (req, res) => {
  try {
    const data = req.body;
    res.json({ message: "hai", data });
  } catch (error) {
    res.status(500).json("error in post contacts");
  }
});

app.listen(process.env.PORT, () => {
  console.log("Hello");
  connectDB();
});
