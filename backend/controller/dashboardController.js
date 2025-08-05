const Income = require("../models/Income.js")
const Expense = require("../models/Expense.js")

const { isValidObjectId, Types } = require("mongoose")
 
// Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id
        const userObjectId = new Types.ObjectId(String(userId));

        // fetch total income and expense
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ])

        // The Aggregation Pipeline
        // The Income.aggregate() function processes documents in the Income collection through a series of stages.

        // $match: {userId: userObjectId}

        // This is the filtering stage. 🔎

        // It finds all documents in the Income collection where the userId field exactly matches the value stored in the userObjectId variable. It's similar to a WHERE clause in SQL.

        // $group: {_id: null, total: {$sum: "$amount"}}

        // This is the grouping and calculation stage. ➕

        // _id: null: This groups all the documents that passed the $match stage into a single group. By setting _id to null, you're telling MongoDB to aggregate across all the filtered documents without separating them into smaller groups.

        // total: {$sum: "$amount"}: This creates a new field named total. Its value is calculated by summing ($sum) the values from the amount field of every document in the group.

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ])

        // get income transaction in last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 })

        // get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get expense transaction in last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 })

        // Get total expense for last 30 days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Fetch last 5 transactions income + expense
        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            )
        ].sort((a, b) => b.date - a.date); // sort latest first

        // final response
        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expenseLast30Days,
                transaction: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transaction: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });

    } catch (err) {
        res.status(500).json({message: "Server Error", error: err.message})
    }
}