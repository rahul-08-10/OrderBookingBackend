const mongoose =  require("mongoose");
const ProductSchema =  new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productType:{
        type:String,
        required:true
    },
    prize:{
        type:String,
        required:true
    },
    stock:{
        type:String,
        required:true
    }
})

module.exports =  mongoose.model("Product" , ProductSchema);
