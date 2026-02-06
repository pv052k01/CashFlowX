import React from "react";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        {(Array.isArray(transactions) ? transactions.slice(0, 5) : []).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
        {(!transactions || transactions.length === 0) && (
          <div className="text-center py-8 text-gray-500 text-sm">No income found.</div>
        )}
      </div>
    </div>
  );
};

export default RecentIncome;
