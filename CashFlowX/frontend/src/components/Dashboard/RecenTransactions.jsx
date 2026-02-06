import React from "react";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type == "expense" ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
        {(!transactions || transactions.length === 0) && (
            <div className="text-center py-8 text-gray-500 text-sm">No recent transactions found.</div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
