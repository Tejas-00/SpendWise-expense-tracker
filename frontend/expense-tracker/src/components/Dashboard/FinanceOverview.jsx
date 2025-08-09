import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875cf5", "#22C55E", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ]
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Finance Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  )
}

export default FinanceOverview