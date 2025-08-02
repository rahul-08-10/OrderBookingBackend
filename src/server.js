const express = require("express");
const app = express();
require("dotenv").config();
const database  =  require("./config/db");
const port  = process.env.PORT || 4000
app.use(express.urlencoded());
app.use(express.json());
app.listen(port , ()=>{
    console.log("server is running at port " , port);
});
database();