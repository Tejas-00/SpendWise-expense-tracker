import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'
import InfoCard from '../../components/Cards/InfoCard'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { IoMdCard } from "react-icons/io"
import RecentTransactions from '../../components/Dashboard/RecentTransactions.jsx'
import { addIndianThousandSeparator } from '../../utils/helper.js'
import FinanceOverview from '../../components/Dashboard/FinanceOverview.jsx'
import ExpenseTransaction from '../../components/Dashboard/ExpenseTransaction.jsx'
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses.jsx'
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart.jsx'
import RecentIncome from '../../components/Dashboard/RecentIncome.jsx'

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

  console.log('Home component - dashboardData:', dashboardData); // Debug log

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addIndianThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addIndianThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addIndianThousandSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />

          <ExpenseTransaction
            transactions={dashboardData?.last30DaysExpenses?.transaction || []}
            onSeeMore={() => { navigate("/expense") }}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transaction}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transaction?.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transaction || []}
            onSeeMore={() => navigate("/income")}
          />

        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home