const mongoose = require("mongoose");

const QuickieSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    icon: { type: String },
    category: { type: String, required: true, trim: true }
}, { timestamps: true }
)

module.exports = mongoose.model("Quickie", QuickieSchema);