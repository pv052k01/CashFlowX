import React, { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IoMdCard } from "react-icons/io";
import { LuWalletMinimal, LuHandCoins, LuPlus } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import SideMenu from "./SideMenu";
import axiosInstance from "../../utils/axiosInstance";

const Navbar = ({ activeMenu, onAddIncome, onAddExpense }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const location = useLocation();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

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
  }, []);

  const stats = [
    {
      icon: <IoMdCard />,
      label: "Balance",
      value: dashboardData?.totalBalance || 0,
      color: "text-primary-500",
      bgColor: "bg-primary-500/10",
    },
    {
      icon: <LuWalletMinimal />,
      label: "Income",
      value: dashboardData?.totalIncome || 0,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: <LuHandCoins />,
      label: "Expense",
      value: dashboardData?.totalExpense || 0,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
  ];

  return (
    <header className="sticky top-0 z-30 px-6 py-4 shadow-sm flex items-center justify-between backdrop-blur-md border-b" 
            style={{ backgroundColor: 'rgba(5, 5, 5, 0.8)', borderColor: 'var(--border-subtle)' }}>
      {/* Left: Menu + Brand */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden transition hover:text-white"
          style={{ color: 'var(--text-muted)' }}
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>
            Finance Flow
          </h2>
        </div>
      </div>

      {/* Right: Stats Summary or Action Buttons */}
      {location.pathname === "/dashboard" ? (
        <div className="flex items-center gap-3">
          <button 
            className="btn-secondary flex items-center gap-2 text-xs md:text-sm py-2 px-3 md:px-4" 
            onClick={onAddIncome}
          >
            <LuPlus className="text-lg" /> 
            <span className="hidden sm:inline">Add Income</span>
          </button>
          <button 
            className="btn-primary flex items-center gap-2 text-xs md:text-sm py-2 px-3 md:px-4" 
            onClick={onAddExpense}
          >
            <LuPlus className="text-lg" /> 
            <span className="hidden sm:inline">Add Expense</span>
          </button>
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-6">
          {stats.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 px-3 py-1.5 rounded-xl transition-colors hover:bg-white/5">
              <div className={`p-2 rounded-lg ${item.bgColor} ${item.color} text-lg`}>
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-white">
                  ₹{item.value.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Side Menu */}
      {openSideMenu && (
        <div className="fixed top-[74px] left-0 w-[75vw] max-w-xs h-[calc(100vh-74px)] shadow-2xl z-50 animate-fade-in backdrop-blur-xl border-r"
             style={{ backgroundColor: 'rgba(5, 5, 5, 0.95)', borderColor: 'var(--border-subtle)' }}>
          <SideMenu activeMenu={activeMenu} mobileClose={() => setOpenSideMenu(false)} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
