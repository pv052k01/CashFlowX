import moment from "moment";
import React from "react";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        {(transactions && transactions.length > 0 ? transactions.slice(0, 4) : []).map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
        {(!transactions || transactions.length === 0) && (
          <div className="text-center py-8 text-gray-500 text-sm">No expenses in the last 30 days.</div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
