import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '../../utils/helper'
import { LuPlus } from 'react-icons/lu'
import CustomLineChart from '../Charts/CustomLineChart'

const ExpenseOverview = ({ transactions, onExpenseIncome, onQuickies }) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions)
        setChartData(result)

        return () => { }
    }, [transactions])

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-md font-semibold text-gray-700">Expense Overview</h5>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Track your spending trends over time and gain insights into your money.
                    </p>
                </div>

                <div className="flex gap-2">
                    <button className="add-btn" onClick={onQuickies}>
                        <LuPlus className='text-lg' />
                        Add Quickie
                    </button>
                    <button className="add-btn add-btn-fill" onClick={onExpenseIncome}>
                        <LuPlus className='text-lg' />
                        Add Expense
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default ExpenseOverview