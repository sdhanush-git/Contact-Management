import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    sparse: true,
  },
  company: String,
  phone: String,
  status: {
    type: String,
    enum: ["Interested", "Follow-Up", "Closed"],
    default: "Interested",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ContactModel", contactSchema);
