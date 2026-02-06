import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";
import toast from "react-hot-toast";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecenTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import AISummarizer from "../../components/Dashboard/AISummarizer";
import { LuPlus } from "react-icons/lu";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAddIncome, setOpenAddIncome] = useState(false);
  const [openAddExpense, setOpenAddExpense] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get("/api/v1/dashboard/get-data");
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddIncomeFromHome = async (income) => {
    const { source, amount, date, icon } = income || {};
    if (!source || !amount || !date) {
      setOpenAddIncome(false);
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncome(false);
      toast.success("Income added successfully");
      fetchDashboardData();
    } catch {
      setOpenAddIncome(false);
      toast.error("Failed to add income");
    }
  };

  const handleAddExpenseFromHome = async (expense) => {
    const { category, amount, date, icon } = expense || {};
    if (!category || !amount || !date) {
      setOpenAddExpense(false);
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpense(false);
      toast.success("Expense added successfully");
      fetchDashboardData();
    } catch {
      setOpenAddExpense(false);
      toast.error("Failed to add expense");
    }
  };

  return (
    <DashboardLayout 
      activeMenu="Dashboard"
      onAddIncome={() => setOpenAddIncome(true)}
      onAddExpense={() => setOpenAddExpense(true)}
    >
      <div className="mx-auto max-w-7xl animate-fade-in pb-10">
        
        {/* Welcome & Stats */}
        <div className="mb-8">
            <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-main)' }}>Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
                {
                icon: <IoMdCard />,
                label: "Total Balance",
                value: addThousandsSeparator(dashboardData?.totalBalance || 0),
                color: "text-indigo-400 mix-blend-screen",
                },
                {
                icon: <LuWalletMinimal />,
                label: "Total Income",
                value: addThousandsSeparator(dashboardData?.totalIncome || 0),
                color: "text-emerald-400 mix-blend-screen",
                },
                {
                icon: <LuHandCoins />,
                label: "Total Expense",
                value: addThousandsSeparator(dashboardData?.totalExpense || 0),
                color: "text-rose-400 mix-blend-screen",
                },
            ].map((card, index) => (
                <InfoCard
                key={index}
                icon={card.icon}
                label={card.label}
                value={card.value}
                color={card.color}
                />
            ))}
            </div>
        </div>

        {/* AI Financial Summarizer */}
        <div className="mb-8">
          <AISummarizer dashboardData={dashboardData} />
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Recent Transactions</h3>
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
            />
          </div>

          <div className="card p-6">
            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />
          </div>

          <div className="card p-6">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Last 30 Days Expenses</h3>
                <button onClick={() => navigate("/expense")} className="text-sm text-primary-500 hover:text-primary-400">See All</button>
             </div>
            <ExpenseTransactions
              transactions={dashboardData?.last30DaysExpenses?.transactions}
              onSeeMore={() => navigate("/expense")}
            />
          </div>

          <div className="card p-6">
            <Last30DaysExpenses
              data={dashboardData?.last30DaysExpenses?.transactions || []}
            />
          </div>

          <div className="card p-6">
            <RecentIncomeWithChart
              data={
                dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
              }
              totalIncome={dashboardData?.totalIncome || 0}
            />
          </div>

          <div className="card p-6">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Recent Income</h3>
                <button onClick={() => navigate("/income")} className="text-sm text-primary-500 hover:text-primary-400">See All</button>
             </div>
            <RecentIncome
              transactions={dashboardData?.last60DaysIncome?.transactions || []}
              onSeeMore={() => navigate("/income")}
            />
          </div>
        </div>

        {/* Add Income Modal */}
        <Modal isOpen={openAddIncome} onClose={() => setOpenAddIncome(false)} title="Add Income">
          <AddIncomeForm onAddIncome={handleAddIncomeFromHome} />
        </Modal>

        {/* Add Expense Modal */}
        <Modal isOpen={openAddExpense} onClose={() => setOpenAddExpense(false)} title="Add Expense">
          <AddExpenseForm onAddExpense={handleAddExpenseFromHome} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Home;
