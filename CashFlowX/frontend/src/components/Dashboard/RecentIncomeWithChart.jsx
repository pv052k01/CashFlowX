import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const safe = Array.isArray(data) ? data : [];
    const dataArr = safe.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  },[data]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex items-center justify-center mb-6">
        <h5 className="text-xl font-medium text-white">Last 60 Days Income</h5>
      </div>

      <div className="w-full flex justify-center">
        {chartData && chartData.length > 0 ? (
          <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`₹${totalIncome}`}
            showTextAnchor
            colors={COLORS}
          />
        ) : (
          <div className="mt-8 text-center text-gray-500 text-sm">No income in the last 60 days.</div>
        )}
      </div>
    </div>
  );
};

export default RecentIncomeWithChart;
