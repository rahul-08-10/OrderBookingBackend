const userData = require("../models/user");
const bcrypt = require("bcryptjs");
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Provide all the details"
            });
        }
        const user = await userData.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userData.create({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save();
        return res.status(200).json({
            success: true,
            message: "Successfully user created",
            newUser
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in creating user",
            error: error
        })
    }
}


const getAllUser = async (req, res) => {
    try {
        const user = await userData.find();
        return res.status(200).json({
            success: true,
            message: "user data",
            user
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userData.findById(id).select("-password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User is not present"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User found",
            user
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}


const updateUser = async (req, res) => {
    const { id } = req.body;
    const { name, email } = req.body;
    try {
        if (!name && !email) {
            return res.status(400).json({
                success: false,
                message: "Aleast update one detail"
            });
        }
        const updateUser = await userData.findByIdAndUpdate(
            id,
            { name, email },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updateUser) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "user updated successfully",
            updateUser
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}


const DeleteUser = async (req, res) => {
    const {id} =  req.params;
    try {
        const delUser =  await userData.findByIdAndDelete(id);
        if(!delUser){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"User Successfully deleted"
        })
    }
    catch (error) {
         return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

module.exports =  {createUser , getAllUser , getUser , updateUser , DeleteUser}