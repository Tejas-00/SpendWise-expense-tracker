import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper'
import CustomBarChart from '../Charts/CustomBarChart'

const Last30DaysExpenses = ({ data }) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareExpenseBarChartData(data)
        setChartData(result)

        return () => { }
    }, [data])


    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expense</h5>
            </div>

            <CustomBarChart data={chartData} dataKey={"category"} />
        </div>
    )
}

export default Last30DaysExpenses