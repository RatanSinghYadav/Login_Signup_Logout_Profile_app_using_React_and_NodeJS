const express = require('express');
const app = express();
require('./db/connect')
const cors = require('cors')
const router = require('./routes/router')

 
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(8000,()=>{
    console.log("server is running...")
})