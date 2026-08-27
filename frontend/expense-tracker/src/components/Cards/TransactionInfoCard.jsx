import React from 'react'
import { LuTrash2, LuTrendingDown, LuTrendingUp, LuUtensils } from 'react-icons/lu'

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete, onEdit }) => {

    const getAmountStyles = () => type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

    return <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/50'>
        <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
            {icon
                ? (<img className='w-6 h-6' src={icon} />)
                : (<LuUtensils />)}
        </div>

        <div className='flex-1 flex items-center justify-between'>
            <div>
                <p className='text-sm text-gray-700 font-medium'>{title}</p>
                <p className='text-xs text-gray-500 mt-1'>{date}</p>
            </div>

            <div className='flex items-center gap-2'>
                {onEdit && (
                    <button
                        className='text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                        onClick={onEdit}
                        title="Edit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                    </button>
                )}
                {!hideDeleteBtn && (
                    <button
                        className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                        onClick={onDelete}
                    >
                        <LuTrash2 size={18} />
                    </button>)
                }
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                    <h6 className='text-xs font-medium'>
                        {type === "income" ? "+" : "-"} ₹ {amount}
                    </h6>
                    {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                </div>
            </div>
        </div>
    </div>
}

export default TransactionInfoCard