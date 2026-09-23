const express = require("express")
const {
    createQuickie,
    getQuickies,
    updateQuickie,
    deleteQuickie
} = require("../controller/quickieController.js")
const { protect } = require("../middlewares/authMiddleware.js")

const router = express.Router();

router.post('/', protect, createQuickie);
router.get('/', protect, getQuickies);
router.put('/:id', protect, updateQuickie);
router.delete('/:id', protect, deleteQuickie);

module.exports = router;