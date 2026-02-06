import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(Array.isArray(data) ? data : []);
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-4">
        <h5 className="text-xl font-medium text-white">Last 30 Days Expenses</h5>
      </div>
      {chartData && chartData.length > 0 ? (
        <CustomBarChart data={chartData}/>
      ) : (
        <div className="mt-8 text-center text-gray-500 text-sm">No expense data for the last 30 days.</div>
      )}
    </div>
  );
};
export default Last30DaysExpenses;
