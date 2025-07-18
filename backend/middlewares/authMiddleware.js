const jwt = require("jsonwebtoken")
const User = require("../models/User.js")

exports.protect = async(req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {return res.status(401).json({message: "Not authorized, no token"})};

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        res.status(401).json({message: "Not authorized, token failed", error: err.message});
    }
}



// It checks the Authorization header for a Bearer token. If the token exists and is valid (verified against a secret key), it finds the corresponding user in the database, attaches their info to the request object (req.user), and allows the request to proceed. If the token is missing or invalid, it immediately sends a 401 Unauthorized error, blocking access to the route.