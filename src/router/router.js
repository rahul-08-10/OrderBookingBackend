const express =  require("express");
const { createUser, getAllUser, getUser, updateUser, DeleteUser } = require("../controller/userController");
const { deleteProduct , createProduct , getAllProduct , getProductById , updateProduct} =  require("../controller/productController");
const {createOrder , getAllOrder , getOrderById , updateOrder , deleteOrder} =  require("../controller/orderController");
const router =  express.Router();
// userRoutes.js
router.post("/users", createUser);          
router.get("/users", getAllUser);          
router.get("/users/:id", getUser);         
router.put("/users/:id", updateUser);      
router.delete("/users/:id", DeleteUser);   

// productRoutes.js 
router.post("/products", createProduct);    
router.get("/products", getAllProduct);    
router.get("/products/:id", getProductById); 
router.put("/products/:id", updateProduct); 
router.delete("/products/:id", deleteProduct);    

// orderRoutes.js
router.post("/orders", createOrder);        
router.get("/orders", getAllOrder);         
router.get("/orders/:id", getOrderById);    
router.put("/orders/:id", updateOrder);     
router.delete("/orders/:id", deleteOrder);  

module.exports =  router;