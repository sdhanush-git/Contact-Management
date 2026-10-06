import express from "express";
import {
  createContact,
  getContacts,
} from "../controllers/ContactsController.js";

const router = express.Router();

router.route("/contacts").post(createContact).get(getContacts);

export default router;
