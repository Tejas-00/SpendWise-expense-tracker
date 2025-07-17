const User = require("../models/User.js")
const jwt = require("jsonwebtoken");

// Generates JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"})
}

// Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    if ( !fullName || !email || !password ) {return res.status(400).json({ message:"All fields are required" })}

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {return res.status(400).json({message: "email already in use"})}

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({message: "error registering user", error: err.message})
    }
}

// Register User
exports.registerUser = async (req, res) => {
    
}

// Register User
exports.registerUser = async (req, res) => {
    
}