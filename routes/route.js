const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

//retrieve data get method is the method which only returns to browser display
router.get("/contacts", (req, res, next) => {
    Contact.find(function(err, contacts) {
        res.json(contacts);
    });
});

//add data
router.post("/contact", (req, res, next) => {
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
    });

    newContact.save((err, contact) => {
        if (err) {
            res.json({ msg: "Failed to add contact. Details:" + err + "#0" });
        } else {
            res.json({ msg: "Contact added successfully#1" });
        }
    });
});

// delete data
router.delete("/contact/:id", (req, res, next) => {
    Contact.deleteOne({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json({ msg: "Failed to remove contact. Details:" + err + "#0" });
        } else {
            if (result.deletedCount == 1)
                res.json({ msg: "Contact removed successfully#1" });
            else res.json({ msg: "Invalid contact#0" });
        }
    });
});

module.exports = router;