import React, { useState } from 'react'
import { LuPencil, LuPlus, LuTrash2, LuX } from 'react-icons/lu'
import EmojiPickerPopUp from '../EmojiPickerPopUp'
import Input from '../inputs/Input'

const QuickieManager = ({ quickies, onAdd, onCreate, onUpdate, onDelete }) => {
    const [amounts, setAmounts] = useState({})
    const [form, setForm] = useState(null)

    const updateForm = (key, value) => setForm({ ...form, [key]: value })

    const submitForm = () => {
        if (!form.category.trim()) return

        if (form.id) {
            onUpdate(form.id, { category: form.category, icon: form.icon })
        } else {
            onCreate({ category: form.category, icon: form.icon })
        }
        setForm(null)
    }

    const addQuickie = (quickie) => {
        onAdd(quickie, amounts[quickie._id])
        setAmounts({ ...amounts, [quickie._id]: "" })
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-gray-500">Save repeated expenses and add them with only an amount.</p>
                <button type="button" className="card-btn" onClick={() => setForm({ category: "", icon: "" })}>
                    <LuPlus className="text-base" />
                    <span className="ml-1 text-sm">New Quickie</span>
                </button>
            </div>

            {form && (
                <div className="border border-gray-200 rounded-lg p-4 mb-5">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold">{form.id ? "Edit Quickie" : "New Quickie"}</h4>
                        <button type="button" onClick={() => setForm(null)} aria-label="Close quickie form">
                            <LuX />
                        </button>
                    </div>
                    <EmojiPickerPopUp icon={form.icon} onSelect={(icon) => updateForm("icon", icon)} />
                    <Input
                        value={form.category}
                        onChange={({ target }) => updateForm("category", target.value)}
                        label="Name"
                        placeholder="Dinner"
                        type="text"
                    />
                    <div className="flex justify-end mt-4">
                        <button type="button" className="add-btn add-btn-fill" onClick={submitForm}>
                            {form.id ? "Save Changes" : "Create Quickie"}
                        </button>
                    </div>
                </div>
            )}

            {quickies.length === 0 && !form && (
                <p className="text-sm text-gray-500 py-6 text-center">No quickies yet. Create one to get started.</p>
            )}

            <div className="space-y-3">
                {quickies.map((quickie) => (
                    <div key={quickie._id} className="flex items-center gap-3 border border-gray-200 rounded-lg p-3">
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-purple-50 rounded-lg">
                            {quickie.icon ? <img src={quickie.icon} alt="" className="w-8 h-8" /> : "💸"}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-medium truncate">{quickie.category}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={amounts[quickie._id] || ""}
                                    onChange={(event) => setAmounts({ ...amounts, [quickie._id]: event.target.value })}
                                    placeholder="Amount"
                                    className="input-box w-full bg-transparent outline-none py-1 px-2"
                                />
                                <button type="button" className="add-btn add-btn-fill whitespace-nowrap" onClick={() => addQuickie(quickie)}>
                                    Add
                                </button>
                            </div>
                        </div>
                        <button type="button" className="text-gray-500 hover:text-primary" onClick={() => setForm({ ...quickie, id: quickie._id })} aria-label={`Edit ${quickie.category}`}>
                            <LuPencil />
                        </button>
                        <button type="button" className="text-gray-500 hover:text-red-500" onClick={() => onDelete(quickie._id)} aria-label={`Delete ${quickie.category}`}>
                            <LuTrash2 />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuickieManager