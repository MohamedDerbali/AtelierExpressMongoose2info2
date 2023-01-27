const express = require("express");
const router = express.Router();
const contactModel = require("../models/contact");
router.get("/", async(req, res, next)=> {
    const contacts = await contactModel.find();
    res.render("index", {contactsList: contacts});
})
router.post("/", async(req, res, next)=>{
    const {fullName, Phone} = req.body;
    console.log(fullName, Phone);
})
module.exports = router;