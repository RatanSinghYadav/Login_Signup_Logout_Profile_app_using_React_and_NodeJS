const mongoose = require('mongoose');

const DB = "mongodb+srv://ratan:1234@cluster0.bzx2ll5.mongodb.net/user_data?retryWrites=true&w=majority";

mongoose.connect(DB).then(()=>{
    console.log("MongoDB connected")
}).catch((error)=>{
    console.log("error",error.message);
})