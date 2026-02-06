import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu, onAddIncome, onAddExpense }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-0)" }}>
      <Navbar activeMenu={activeMenu} onAddIncome={onAddIncome} onAddExpense={onAddExpense} />

      {user && (
        <div className="flex">
          <div className="max-[1200px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5 my-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
