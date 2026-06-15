import React, { useState } from 'react'
import { LuHeart, LuLayers, LuPiggyBank, LuShieldCheck } from 'react-icons/lu'
import { addIndianThousandSeparator } from '../../utils/helper'

const LABELS = ["Need", "Desire", "Saving"]
const ICONS = {
  Need: LuShieldCheck,
  Desire: LuHeart,
  Saving: LuPiggyBank,
  Total: LuLayers,
}

const ExpenseFilter = ({ transactions = [] }) => {
  const [checkedCategories, setCheckedCategories] = useState({
    Need: true,
    Desire: true,
    Saving: true,
  })

  const handleCheckboxChange = (label) => {
    setCheckedCategories((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const totals = { Need: 0, Desire: 0, Saving: 0 }

  transactions.forEach((t) => {
    const amount = Number(t.amount) || 0

    // Determine a candidate string to inspect (classification, or category prefix)
    let candidate = ''
    if (t.classification) candidate = String(t.classification)
    else if (t.category && t.category.includes(':')) candidate = t.category.split(':')[0]
    else if (t.category) candidate = t.category

    candidate = String(candidate).toLowerCase().trim()

    // Match tolerant forms (need, needs, NEED, desire, saving, invest etc.)
    if (candidate.includes('need')) {
      totals.Need += amount
    } else if (candidate.includes('desir') || candidate.includes('want') || candidate.includes('wish')) {
      totals.Desire += amount
    } else if (candidate.includes('save') || candidate.includes('saving') || candidate.includes('invest')) {
      totals.Saving += amount
    } else {
      // default to Desire when nothing matches
      totals.Desire += amount
    }
  })

  const totalSum = LABELS.reduce((sum, label) => {
    if (checkedCategories[label]) {
      return sum + totals[label]
    }
    return sum
  }, 0)

  const renderRow = (label) => {
    const value = totals[label] || 0
    const isChecked = checkedCategories[label]
    const percent = isChecked && totalSum > 0 ? ((value / totalSum) * 100).toFixed(2) : '0.00'
    const percentNum = parseFloat(percent)
    const barWidth = isChecked ? `${Math.max(0, Math.min(100, percentNum))}%` : '0%'
    const Icon = ICONS[label] || ICONS.Total

    return (
      <div key={label} className="rounded-2xl bg-slate-50 p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={checkedCategories[label]}
              onChange={() => handleCheckboxChange(label)}
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-800">
              <Icon className="text-base" />
            </div>
            <p className="text-sm text-slate-900 font-semibold">{label}</p>
          </div>
          <div className="text-right min-w-[7rem]">
            <p className="text-base text-slate-900 font-semibold">₹ {addIndianThousandSeparator(value)}</p>
            <p className="text-sm text-slate-500">{percent}%</p>
          </div>
        </div>

        <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full rounded-full bg-indigo-400 transition-all" style={{ width: barWidth }} />
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-md font-semibold text-gray-700">Filters</h5>
      </div>

      <div className="mt-4 space-y-3">
        {LABELS.map((l) => renderRow(l))}

        <div className="rounded-2xl bg-slate-50 p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-800">
                <LuLayers className="text-base" />
              </div>
              <p className="text-sm text-slate-900 font-semibold">Total</p>
            </div>
            <div className="text-right min-w-[7rem]">
              <p className="text-base text-slate-900 font-semibold">₹ {addIndianThousandSeparator(totalSum)}</p>
              <p className="text-sm text-slate-500">100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseFilter
