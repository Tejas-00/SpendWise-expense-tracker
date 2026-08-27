const express = require("express")
const { 
    addExpense, 
    getAllExpense, 
    deleteExpense, 
    downloadExpenseExcel,
    updateExpense } = require("../controller/expenseController.js")

const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpense);
router.get('/downloadexcel', protect, downloadExpenseExcel);
router.put('/:id', protect, updateExpense)
router.delete("/:id", protect, deleteExpense)

module.exports = router;