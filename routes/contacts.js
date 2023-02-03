const express = require("express");
const router = express.Router();
const contactModel = require("../models/contact");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactModel.find();
    res.render("index", { contactsList: contacts });
  } catch (error) {
    res.render("error", {
      message: error.message,
      error: error,
    });
  }
});

router.post("/addContact", async (req, res, next) => {
  try {
    const { fullName, Phone } = req.body;
    // const checkIfContactExist = await contactModel.find({propriete},{projection});
    const checkIfContactExist = await contactModel.findOne({ fullName });
    // if(checkIfContactExist === null && checkIfContactExist===undefined)
    if (checkIfContactExist) {
      throw new Error("contact already exist");
    }
    const contact = new contactModel({
      fullName: fullName,
      Phone: Phone,
    });
    contact.save();
    res.redirect("http://localhost:5000/contacts/");
  } catch (error) {
    res.render("error", {
      message: error.message,
      error: error,
    });
  }
});

router.get("/updateContact/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactModel.findById(contactId);
    res.render("updateContactForm", { contact: contact });
  } catch (error) {
    res.render("error", {
      message: error.message,
      error: error,
    });
  }
});

router.put("/updateContact/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { fullName, Phone } = req.body;
    const updatedContact = {
      fullName,
      Phone,
    };
    await contactModel.findByIdAndUpdate(contactId, updatedContact);
    res.redirect("http://localhost:5000/contacts/");
  } catch (error) {
    res.render("error", {
      message: error.message,
      error: error,
    });
  }
});

router.get("/deleteContact/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await contactModel.findByIdAndDelete(contactId);
    res.redirect("http://localhost:5000/contacts/");
  } catch (error) {
    res.render("error", {
      message: error.message,
      error: error,
    });
  }
});
router.post("/search", async (req, res, next) => {
  try {
    const { search } = req.body;
    let contactsList = [];
    if (!search) {
      contactsList = await contactModel.find();
    } else {
      contactsList = await contactModel.find({ fullName: search });
    }
    res.render("index", { contactsList });
  } catch (error) {
    res.render("error", {
      message: error.message,
      error: error,
    });
  }
});
module.exports = router;
