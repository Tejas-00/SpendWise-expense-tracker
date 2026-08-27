import React, { useState } from 'react'
import Input from '../inputs/Input'
import EmojiPickerPopUp from '../EmojiPickerPopUp'

const AddExpenseForm = ({ onAddExpense, onUpdateExpense, initialData }) => {

    const [income, setIncome] = useState({
        category: initialData?.category || "",
        amount: initialData?.amount || "",
        date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : "",
        icon: initialData?.icon || "",
    })

    const handleChange = (key, value) => setIncome({ ...income, [key]: value })


    return (
        <div>
            <EmojiPickerPopUp
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={income.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Category"
                placeholder="Rent, Groceries, etc."
                type="text"
            />
            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="1200"
                type="number"
            />
            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => {
                        if (initialData && onUpdateExpense) {
                            onUpdateExpense(initialData._id, income)
                        } else {
                            onAddExpense(income)
                        }
                    }}
                >
                    {initialData ? 'Update Expense' : 'Add Expense'}
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm