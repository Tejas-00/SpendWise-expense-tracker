import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import toast from "react-hot-toast"
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'
import axios from 'axios'
import { useUserAuth } from '../../hooks/useUserAuth'

const Income = () => {
  useUserAuth()

  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  // Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATH.INCOME.GET_ALL_INCOME}`)

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income

    // Validation
    if (!source.trim()) {
      toast.error("Source is required.")
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.")
    }

    try {
      await axiosInstance.post(API_PATH.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      })

      setOpenAddIncomeModal(false)
      toast.success("Income added successfully")
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error adding Income", error.response?.data?.message || error.message)
    }
  }

  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATH.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({ show: false, data: null })
      toast.success("income details deleted successfully")
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income", error.response?.data?.message || error.message)
    }
  }

  // Handle Download Income Details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.INCOME.DOWNLOAD_INCOME, { responseType: "blob" })

      // Create a URL for Blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url;
      link.setAttribute("download", "income_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading income details", error.message)
      toast.error("failed to download income details")
    }
  }

  useEffect(() => {
    fetchIncomeDetails()

    return () => { }

  }, [])


  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className="flex flex-col gap-6">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
            <IncomeList
              transactions={incomeData}
              onDelete={(id) => {
                setOpenDeleteAlert({ show: true, data: id })
              }}
              onDownload={handleDownloadIncomeDetails}
            />
          </div>
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Income detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income