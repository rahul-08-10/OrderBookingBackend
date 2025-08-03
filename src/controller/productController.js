const mongoose = require("mongoose");
const productDetails = require("../models/Product");
const { param } = require("../router/router");
const createProduct = async (req, res) => {
    const { productName, productType, price, stock } = req.body;
    try {
        if (!productName || !productType || !price || !stock) {
            return res.status(400).json({
                success: false,
                message: "Provide all details"
            });
        }
        const existingProduct = await productDetails.find({ productName });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: "Product is already present"
            });
        }
        const newProduct = await productDetails.create({
            productName,
            productType,
            price,
            stock
        });
        await newProduct.save();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

const getAllProduct = async (req, res) => {
    try {
        const products = await productDetails.find();
        if (!products) {
            return res.status(400).json({
                success: false,
                message: "Products not listed"
            });
        }
        return res.status(200).json({
            success: true,
            message: "List of products",
            products
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error not found"
        })
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const productId = await productDetails.findById(id);
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product Not Present"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product Detail",
            productId
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error not found"
        })
    }
}

const updateProduct = async(req , res)=>{
    const {id} =  req.params;
    const {productName , productType , price , stock } =  req.body;
    try{
        if(!productName || !productType || price || stock){
            return res.status(400).json({
                success:false,
                message:"please update the details"
            });
        }
        const updateDetails  =  await productDetails.findByIdAndUpdate(
            id,
            {price , productName , productType , stock},
            {new:true , runValidators:true}
        )
        return res.status(200).json({
            updateDetails,
            success:true,
            message:"product details successfully updated"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error not found"
        })
    }
}
const deleteProduct = async (req, res) => {
    const {id} =  req.params;
    try {
        const delProduct =  await productDetails.findByIdAndDelete(id);
        if(!delProduct){
            return res.status(400).json({
                success:false,
                message:"Product is not present to remove"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Product is removed Successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error not found"
        })
    }
}

module.exports =  { deleteProduct , createProduct , getAllProduct , getProductById , updateProduct}

