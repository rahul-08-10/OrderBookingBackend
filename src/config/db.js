const mongoose =  requrie("mongoose");
require("dotenv").config();
const database  =  async(req , res)=>{
    try{
        await mongoose.connect(process.env.URL);
        console.log("Database is connected");
    }
    catch(error){
        console.log("Data base is not connected " , error)
    }
}
module.exports =  database;