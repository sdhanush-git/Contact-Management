import ContactModel from "../Models/ContactModel.js";

export const createContact = async (req, res) => {
  try {
    const data = req.body;
    // const newContact = new ContactModel(data);
    // await newContact.save();

    const newContact = await ContactModel.create(req.body);
    res.json(newContact);
  } catch (error) {
    console.log(error);
  }
};

export const getContacts = async (req, res) => {
  try {
    const allContacts = await ContactModel.find();
    res.json(allContacts);
  } catch (error) {
    res.status(500).json(error);
  }
};
