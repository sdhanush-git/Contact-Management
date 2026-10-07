import express from "express";
import {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
  filterContacts,
} from "../controllers/ContactsController.js";

const router = express.Router();

router.route("/contacts").post(createContact).get(getContacts);

router.route("/contacts/:id").put(updateContact).delete(deleteContact);

router.get("/contacts/filter", filterContacts);

export default router;
