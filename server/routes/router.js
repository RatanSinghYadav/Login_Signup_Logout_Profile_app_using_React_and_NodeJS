const express = require('express');
const router = new express.Router();
const USER = require('../models/userSchema.js');
const bcrypt = require('bcryptjs');


router.post('/signup', async (req, res) => { 
    const { fname, email, phone, pass, code, education, city } = req.body;

    if (!fname || !email || !phone || !pass || !code || !city || !education) {
        res.status(422).json({ error: "filll the all details" });
        console.log("filll the all details");
    };

    try {

        const preuser = await USER.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" });
        } else {

            const finaluser = new USER({
                fname, email, phone, pass, code, education, city
            });

            const storedata = await finaluser.save();
            console.log(storedata + "user successfully added");
            res.status(201).json(storedata);
        }

    } catch (error) {
        console.log("error found" + error.message);
        res.status(422).send(error);
    }
})


// Login user API

router.post("/login", async (req, res) => {
    const { email, pass } = req.body;

    if (!email || !pass) {
        res.status(400).json({ error: "fill the details" });
    }

    try {
        const userlogin = await USER.findOne({ email: email });

        console.log(userlogin)

        if (!userlogin) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const match = await bcrypt.compare(String(pass), String(userlogin.pass));

        console.log(match);

        if (!match) {
            res.status(401).json({ error: "Match Authentication failed" });
        }

        res.status(201).json(userlogin);

    } catch (error) {
        res.status(401).json("Your Session is expired!");
    }
});

module.exports = router;