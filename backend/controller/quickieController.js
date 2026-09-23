const Quickie = require("../models/Quickie.js");

exports.createQuickie = async (req, res) => {
    try {
        const { category, icon } = req.body;

        if (!category || !category.trim()) {
            return res.status(400).json({ message: "Category is required" });
        }

        const quickie = await Quickie.create({
            userId: req.user.id,
            category: category.trim(),
            icon
        });

        res.status(201).json(quickie);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getQuickies = async (req, res) => {
    try {
        const quickies = await Quickie.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(quickies);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateQuickie = async (req, res) => {
    try {
        const { category, icon } = req.body;
        const update = {};

        if (category !== undefined) {
            if (!category.trim()) return res.status(400).json({ message: "Category is required" });
            update.category = category.trim();
        }
        if (icon !== undefined) update.icon = icon;

        const quickie = await Quickie.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            update,
            { new: true }
        );

        if (!quickie) return res.status(404).json({ message: "Quickie not found" });
        res.json(quickie);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteQuickie = async (req, res) => {
    try {
        const quickie = await Quickie.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!quickie) return res.status(404).json({ message: "Quickie not found" });
        res.json({ message: "Quickie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};