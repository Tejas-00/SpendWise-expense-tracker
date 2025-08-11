import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransaction = ({ transactions, onSeeMore }) => {
    return (
        <div className='card'>
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Expense</h5>

                <button className='card-btn cursor-pointer' onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>

            <div className="mt-6">
                {
                    transactions && transactions.length > 0 ? (
                        transactions.slice(0, 4).map((expense) => (
                            <TransactionInfoCard
                                key={expense._id}
                                title={expense.category}
                                icon={expense.icon}
                                date={moment(expense.date).format("Do MMM YYYY")}
                                amount={expense.amount}
                                type={expense.type}
                                hideDeleteBtn
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No recent transactions</p>
                    )}
            </div>
        </div>
    )
}

export default ExpenseTransaction