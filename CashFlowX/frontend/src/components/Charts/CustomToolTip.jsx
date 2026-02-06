import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="shadow-md rounded-lg p-2 border" style={{ background: 'var(--bg-2)', borderColor: 'var(--card-ring)' }}>
        <p className="text-xs font-semibold mb-1" style={{ color: '#c9c3ff' }}>{payload[0].name}</p>
        <p className="text-sm" style={{ color: 'var(--text-1)' }}>
          Amount: <span className="text-sm font-medium" style={{ color: 'var(--text-0)' }}>₹{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};
export default CustomTooltip;
