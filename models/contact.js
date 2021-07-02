const mongoose = require("mongoose");

// create mongo db schema
const ContactSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
});

const Contact = (module.exports = mongoose.model("Contact", ContactSchema));