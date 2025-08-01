import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'
import InfoCard from '../../components/Cards/InfoCard'
import { addThousandSeparator } from "../../utils/helper.js"

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { IoMdCard } from "react-icons/io"

const Home = () => {
  useUserAuth()

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATH.DASHBOARD.GET_DATA}`)
      console.log(response)
      console.log(response.data)

      if (response.data) {
        setDashboardData(response.data)
      }
    } catch (error) {
      console.log("something went wrong. Please try again ", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();

    return () => { };
  }, [])


  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions = {dashboardData?.recentTransactions}
            oneeMore = {() => navigate("/expense")}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home