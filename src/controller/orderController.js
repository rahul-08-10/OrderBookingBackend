const Product = require("../models/Product");
const User = require("../models/user");
const Order = require("../models/order");

const createOrder = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: "Product not found" 
            });
        }

        // Check stock availability
        if (product.stock < quantity) {
            return res.status(400).json({ 
                success: false,
                message: "Insufficient product stock" 
            });
        }

        // Create new order
        const order = new Order({
            user: userId,
            product: productId,
            quantity,
            totalPrice: product.price * quantity,
            status: "pending"
        });

        await order.save();

        // Update product stock
        product.stock -= quantity;
        await product.save();

        res.status(201).json({ 
            success: true,
            message: "Order created successfully", 
            order 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Server error", 
            error: error.message 
        });
    }
};


const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find().populate('user product'); 
        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found"
            });
        }
        return res.status(200).json({
            success: true,
            orders,
            message: "All orders retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('user product');
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            order,
            message: "Order retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, status } = req.body;

        // Find the order
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // If quantity is updated
        if (quantity !== undefined) {
            const product = await Product.findById(order.product);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            const quantityDifference = quantity - order.quantity;

            // Check stock for increased quantity
            if (quantityDifference > 0 && product.stock < quantityDifference) {
                return res.status(400).json({
                    success: false,
                    message: "Insufficient stock for this update"
                });
            }

            // Update product stock
            product.stock -= quantityDifference;
            await product.save();

            // Update order
            order.quantity = quantity;
            order.totalPrice = product.price * quantity;
        }

        // If status is updated
        if (status) {
            order.status = status;
        }

        // Save the updated order
        const updatedOrder = await order.save();

        res.status(200).json({
            success: true,
            order: updatedOrder,
            message: "Order updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// **5. DELETE ORDER**
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Restore product stock (optional, if needed)
        const product = await Product.findById(deletedOrder.product);
        if (product) {
            product.stock += deletedOrder.quantity;
            await product.save();
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    getAllOrder,
    getOrderById,
    updateOrder,
    deleteOrder
};