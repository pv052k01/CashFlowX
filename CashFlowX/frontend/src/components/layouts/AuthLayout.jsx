import React from "react";
import CARD_2 from "../../assets/images/CARD2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: 'var(--bg-app)' }}>
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px]" style={{ background: 'var(--primary-600)' }}></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px]" style={{ background: 'var(--secondary-500)' }}></div>
      </div>

      {/* Left Section - Auth Forms */}
      <div className="w-full md:w-[60vw] px-6 md:px-12 pt-8 pb-12 z-10 flex flex-col relative">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/20">
             <LuTrendingUpDown className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>Finance Flow</h2>
        </div>
        
        <div className="flex-1 flex flex-col justify-center items-center">
            <div className="w-full max-w-md animate-fade-in">
                {children}
            </div>
        </div>
      </div>

      {/* Right Section - Decorative Elements */}
      <div className="hidden md:flex w-[40vw] h-screen relative flex-col justify-center items-center p-12 z-10" 
           style={{ 
             background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.8))',
             backdropFilter: 'blur(10px)',
             borderLeft: '1px solid var(--border-subtle)'
           }}>
        
        <div className="relative z-10 space-y-8 max-w-sm">
          <div className="card-gradient p-6 backdrop-blur-md">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-teal-500/20 text-teal-400">
                    <LuTrendingUpDown size={24} />
                </div>
                <div>
                   <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Total Savings</p>
                   <p className="text-2xl font-bold text-white">₹4,30,000</p>
                </div>
             </div>
             <p className="text-sm opacity-80" style={{ color: 'var(--text-muted)' }}>
                Track your income and expenses effortlessly with AI-powered insights.
             </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img
                src={CARD_2}
                alt="Finance Card"
                className="w-full rounded-xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-1/4 right-10 w-24 h-24 bg-purple-500/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-teal-500/20 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>
    </div>
  );
};

export default AuthLayout;