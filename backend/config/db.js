require("dotenv").config()

const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected")
    } catch (err){
        console.log("error connecting Mongo", err);
        process.exit(1);
    }
}

module.exports = connectDB;