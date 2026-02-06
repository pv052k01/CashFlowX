import React from 'react';

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="card-gradient p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300 group cursor-default">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors ${color ? color : 'text-primary-500'}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider font-semibold opacity-60 mb-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
        <h4 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>{value}</h4>
      </div>
    </div>
  );
};

export default InfoCard;
