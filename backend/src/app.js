require('dotenv').config()
require('./db');
const express = require('express')
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.get('/',(req,res)=>res.send("server running"))




module.exports = app