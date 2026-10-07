import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  company: String,
  phone: Number,
  status: {
    type: String,
    enum: ["Interested", "Follow-Up", "Closed"],
    default: "Intrested",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ContactModel", contactSchema);
