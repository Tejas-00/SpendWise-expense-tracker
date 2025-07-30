import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'
import InfoCard from '../../components/Cards/InfoCard'
import { addThounsandSeparator } from "../../utils/helper.js"

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
            value={addThounsandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home