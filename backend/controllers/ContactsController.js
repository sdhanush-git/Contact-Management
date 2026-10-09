import ContactModel from "../Models/ContactModel.js";

export const createContact = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.email || data.email.trim() === "") {
      delete data.email;
    }
    const newContact = await ContactModel.create(data);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const allContacts = await ContactModel.find();
    res.json(allContacts || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updatedContact);
  } catch (error) {
    res.json("Error while updateContact");
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await ContactModel.findByIdAndDelete(id);
    res.json("Deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const filterContacts = async (req, res) => {
  try {
    const { status, search } = req.query;

    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [{ name: regex }, { company: regex }];
    }

    const contacts = await ContactModel.find(filter);

    if (contacts.length === 0) {
      return res.json("No matching contacts found");
    }

    res.json(contacts);
  } catch (error) {
    res.status(500).json("Error in filterContacts");
  }
};
