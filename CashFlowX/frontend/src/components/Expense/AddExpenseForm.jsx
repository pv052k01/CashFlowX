import React, { useState } from "react";
import Input from "../inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });
  const [isScanning, setIsScanning] = useState(false);

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setIsScanning(true);
    const loadingToast = toast.loading("Analyzing receipt with AI...");

    try {
      const response = await axiosInstance.post(API_PATHS.GEMINI.ANALYZE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { amount, date, category, source, type } = response.data;
      
      if (type && type.toLowerCase() === 'income') {
        toast("This looks like an income receipt.", {
             icon: '⚠️',
             id: loadingToast,
        });
      } else {
         toast.success("Receipt scanned successfully!", { id: loadingToast });
      }

      setExpense((prev) => ({
        ...prev,
        amount: amount || prev.amount,
        date: date || prev.date,
        category: category || source || prev.category,
      }));

    } catch (error) {
        console.error("Scan error:", error);
        toast.error("Failed to analyze receipt", { id: loadingToast });
    } finally {
        setIsScanning(false);
        // Reset file input if needed, but not strictly necessary here
        e.target.value = null; 
    }
  };

  return (
    <div className="relative">
      {/* AI Scan Button */}
      <div className="flex justify-end mb-2">
            <label className={`btn btn-sm ${isScanning ? 'btn-disabled' : 'btn-primary'} cursor-pointer flex items-center gap-2`}>
                 {isScanning ? "Scanning..." : "✨ Scan Receipt AI"}
                 <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange} 
                    disabled={isScanning}
                 />
             </label>
      </div>

      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Expense Category"
        placeholder="Food, Transport, etc"
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="btn"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;