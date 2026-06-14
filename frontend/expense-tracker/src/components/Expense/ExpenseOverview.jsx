import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '../../utils/helper'
import { LuPlus } from 'react-icons/lu'
import CustomLineChart from '../Charts/CustomLineChart'

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {

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

                <button className="add-btn" onClick={onExpenseIncome}>
                    <LuPlus className='text-lg' />
                    Add Expense
                </button>
            </div>

            <div className="mt-8">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default ExpenseOverview