const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
})

userSchema.pre("save", async function (next) {
    if (this.isModified("pass")) {
        this.pass = await bcrypt.hash(this.pass, 4);
    }
    next();

})

const userData = new mongoose.model("User Data", userSchema);

module.exports = userData; 