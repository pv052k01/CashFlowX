import React from "react";
import {
  LuUtensils,
  LuTrash2,
  LuTrendingUp,
  LuTrendingDown,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  return (
    <div className="group relative flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center text-xl rounded-full bg-white/5 text-gray-300">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      {/* Details */}
      <div className="flex-1">
        <p className="text-sm font-medium text-white line-clamp-1">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{date}</p>
      </div>

      {/* Amount and Delete */}
      <div className="flex items-center gap-3">
        {!hideDeleteBtn && onDelete && (
          <button
            onClick={onDelete}
            className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-white/5"
          >
            <LuTrash2 size={16} />
          </button>
        )}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border ${
            type === "income" 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
          }`}
        >
          {type === "income" ? "+" : "-"} ₹{amount}
          {type === "income" ? <LuTrendingUp size={14} /> : <LuTrendingDown size={14} />}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
