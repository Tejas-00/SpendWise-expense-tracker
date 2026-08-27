import React, { useState } from 'react'
import Input from '../inputs/Input'
import EmojiPickerPopUp from '../EmojiPickerPopUp'

const AddIncomeForm = ({ onAddIncome, onUpdateIncome, initialData }) => {

    const [income, setIncome] = useState({
        source: initialData?.source || "",
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
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Freelance, Salary, Bonds, etc."
                type="text"
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="2000"
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
                        if (initialData && onUpdateIncome) {
                            onUpdateIncome(initialData._id, income)
                        } else {
                            onAddIncome(income)
                        }
                    }}
                >
                    {initialData ? 'Update Income' : 'Add Income'}
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm