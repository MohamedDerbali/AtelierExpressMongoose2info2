const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    fullName: {
        type:String, default: "hello", required: true
    },
    Phone: Number,
}, {timestamps: true});

const Contact = mongoose.model("contact", contactSchema)
module.exports = Contact;