import React, { useState } from "react";
import Input from "../inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });
  const [isScanning, setIsScanning] = useState(false);

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setIsScanning(true);
    const loadingToast = toast.loading("Analyzing income proof...");

    try {
      const response = await axiosInstance.post(API_PATHS.GEMINI.ANALYZE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { amount, date, source, category, type } = response.data;

      if (type && type.toLowerCase() === 'expense') {
        toast("This looks like an expense receipt.", {
             icon: '⚠️',
             id: loadingToast,
        });
      } else {
         toast.success("Scanned successfully!", { id: loadingToast });
      }

      setIncome((prev) => ({
        ...prev,
        amount: amount || prev.amount,
        date: date || prev.date,
        source: source || category || prev.source,
      }));

    } catch (error) {
        console.error("Scan error:", error);
        toast.error("Failed to analyze image", { id: loadingToast });
    } finally {
        setIsScanning(false);
        e.target.value = null; 
    }
  };

  return (
    <div className="relative">
      {/* AI Scan Button */}
      <div className="flex justify-end mb-2">
            <label className={`btn btn-sm ${isScanning ? 'btn-disabled' : 'btn-primary'} cursor-pointer flex items-center gap-2`}>
                 {isScanning ? "Scanning..." : "✨ Scan Proof (AI)"}
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
       icon={income.icon}
       onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="btn"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
