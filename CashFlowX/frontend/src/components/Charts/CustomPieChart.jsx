import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";

const renderCenterLabel = (props, label, totalAmount, fontSizeLabel, fontSizeAmount) => {
  const { cx, cy } = props; // Center of PieChart

  return (
    <>
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--text-1)"
        fontSize={fontSizeLabel}
      >
        {label}
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--text-0)"
        fontSize={fontSizeAmount}
        fontWeight="600"
      >
        {totalAmount}
      </text>
    </>
  );
};

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  if (!data || data.length === 0) return null;

  const isMobile = window.innerWidth < 640;
  const outerRadius = isMobile ? 80 : 130;
  const innerRadius = isMobile ? 50 : 100;
  const fontSizeLabel = isMobile ? "12px" : "14px";
  const fontSizeAmount = isMobile ? "16px" : "24px";

  return (
    <div className="flex justify-center items-center w-full">
      <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            labelLine={false}
            // ✅ Custom Center Label with Recharts' built-in feature
            label={(props) =>
              showTextAnchor
                ? renderCenterLabel(props, label, totalAmount, fontSizeLabel, fontSizeAmount)
                : null
            }
            labelPosition="center"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>

          <Tooltip content={CustomToolTip} />
          <Legend content={CustomLegend} verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
