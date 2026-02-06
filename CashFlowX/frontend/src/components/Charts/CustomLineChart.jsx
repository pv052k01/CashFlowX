import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="shadow-md rounded-lg p-2 border" style={{ background: 'var(--bg-2)', borderColor: 'var(--card-ring)' }}>
          <p className="text-xs font-semibold mb-1" style={{ color: '#c9c3ff' }}>
            {payload[0]?.payload?.category || 'N/A'}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-1)' }}>
            Amount:{" "}
            <span className="text-sm font-medium" style={{ color: 'var(--text-0)' }}>
              ₹{payload[0]?.payload?.amount || 0}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
        {/* <defs>
            <LinearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </LinearGradient>
          </defs> */}
          <CartesianGrid stroke="none" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: "var(--text-1)" }} 
            stroke="none" 
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "var(--text-1)" }} 
            stroke="none" 
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#875cf5"
            strokeWidth={2}
            fill="#875cf5"
            fillOpacity={0.08}
            activeDot={{
              stroke: "#875cf5",
              strokeWidth: 2,
              r: 4,
              fill: "#fff"
            }}
            style={{
              filter: "drop-shadow(0px 4px 4px rgba(135, 92, 245, 0.1))"
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;