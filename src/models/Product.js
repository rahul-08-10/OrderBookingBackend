const mongoose =  require("mongoose");
const ProductSchema =  new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        unique:true
    },
    productType:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    stock:{
        type:String,
        required:true
    }
})

module.exports =  mongoose.model("Product" , ProductSchema);
