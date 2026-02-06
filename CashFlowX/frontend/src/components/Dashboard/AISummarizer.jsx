import React, { useEffect, useState } from 'react';
import { FaLightbulb, FaChartLine, FaExclamationTriangle, FaPiggyBank, FaRobot } from 'react-icons/fa';
import { BsGraphUp, BsGraphDown } from 'react-icons/bs';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const AISummarizer = ({ dashboardData }) => {
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  const [timeRange, setTimeRange] = useState('monthly');
  const [error, setError] = useState(null);

  const fetchAISummary = async () => {
    try {
      setLoading(true);
      setError(null);

      let incomeData = [];
      let expenseData = [];

      if (timeRange === 'monthly') {
        // Use dashboard data for monthly
        incomeData = dashboardData?.last60DaysIncome?.transactions || [];
        expenseData = dashboardData?.last30DaysExpenses?.transactions || [];
      } else {
        // Fetch all transactions for yearly
        try {
          const [incomeResponse, expenseResponse] = await Promise.all([
            axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME),
            axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE)
          ]);
          
          // Backend returns data directly as an array, not wrapped in a data property
          incomeData = Array.isArray(incomeResponse.data) ? incomeResponse.data : (incomeResponse.data?.data || []);
          expenseData = Array.isArray(expenseResponse.data) ? expenseResponse.data : (expenseResponse.data?.data || []);
        } catch (fetchError) {
          console.error('Error fetching yearly data:', fetchError);
          setError('Failed to fetch yearly data. Please try again.');
          setLoading(false);
          return;
        }
      }

      if (incomeData.length === 0 && expenseData.length === 0) {
        setError('No financial data available for analysis');
        setLoading(false);
        return;
      }

      const response = await axiosInstance.post(API_PATHS.GEMINI.SUMMARY, {
        incomeData,
        expenseData,
        timeRange
      });

      setAiSummary(response.data);
    } catch (err) {
      console.error('Error fetching AI summary:', err);
      
      // Handle rate limit errors
      if (err.response?.status === 429) {
        const retryAfter = err.response?.data?.retryAfter || '60s';
        setError(`AI service rate limit exceeded. Please try again in ${retryAfter}. The free tier allows 20 requests per day.`);
      } else {
        setError('Failed to generate AI insights. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dashboardData) {
      fetchAISummary();
    }
  }, [timeRange, dashboardData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="card-gradient p-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <FaRobot className="text-3xl text-primary-500 animate-pulse" />
          <h3 className="text-xl font-semibold text-white">AI Financial Insights</h3>
        </div>
        <div className="animate-pulse space-y-4 opacity-50">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="space-y-2 mt-6">
            <div className="h-20 bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-gradient p-6 border-red-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FaRobot className="text-3xl text-primary-500" />
            <h3 className="text-xl font-semibold text-white">AI Financial Insights</h3>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
          <FaExclamationTriangle className="text-red-400 text-2xl mx-auto mb-2" />
          <p className="text-red-300">{error}</p>
          <button 
            onClick={fetchAISummary}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!aiSummary) {
    return null;
  }

  const metrics = aiSummary.financialMetrics || {};

  return (
    <div className="card-gradient p-6 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[80px] -z-10"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-500/20 rounded-xl text-primary-400">
             <FaRobot className="text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">AI Financial Insights</h3>
          </div>
        </div>
        <div className="flex space-x-2 bg-black/20 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setTimeRange('monthly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              timeRange === 'monthly'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeRange('yearly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              timeRange === 'yearly'
                 ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Financial Overview */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
            <FaChartLine /> Financial Overview
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl hover:bg-emerald-500/10 transition-colors">
              <span className="text-gray-300 flex items-center text-sm">
                <BsGraphUp className="mr-3 text-emerald-400" />
                Total Income
              </span>
              <span className="font-bold text-emerald-400 font-mono">
                {formatCurrency(metrics.totalIncome)}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl hover:bg-rose-500/10 transition-colors">
              <span className="text-gray-300 flex items-center text-sm">
                <BsGraphDown className="mr-3 text-rose-400" />
                Total Expenses
              </span>
              <span className="font-bold text-rose-400 font-mono">
                {formatCurrency(metrics.totalExpense)}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl hover:bg-indigo-500/10 transition-colors">
              <span className="text-gray-300 flex items-center text-sm">
                <FaPiggyBank className="mr-3 text-indigo-400" />
                Net Savings
              </span>
              <span className={`font-bold font-mono ${metrics.savings >= 0 ? 'text-indigo-400' : 'text-rose-400'}`}>
                {formatCurrency(metrics.savings)} <span className="text-xs opacity-70 ml-1">({metrics.savingsRate?.toFixed(1)}%)</span>
              </span>
            </div>
            <div className="pt-4 mt-2">
              <div className="text-xs text-gray-400 mb-2 flex justify-between">
                  <span>Top Spending: <strong className="text-gray-200">{metrics.topExpenseCategory}</strong></span>
                  <span className="font-mono text-gray-300">{formatCurrency(metrics.topExpenseCategoryAmount)}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-orange-500 h-full rounded-full transition-all duration-1000" 
                  style={{ 
                    width: `${Math.min((metrics.topExpenseCategoryAmount / metrics.totalExpense * 100) || 0, 100)}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Health Assessment */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
            <FaRobot /> Health Assessment
          </h4>
          <div className="p-5 bg-gradient-to-br from-primary-900/40 to-indigo-900/40 border border-primary-500/20 rounded-xl h-fit">
            <p className="text-gray-300 text-sm leading-relaxed italic">"{aiSummary.healthAssessment}"</p>
          </div>
          
           {/* Savings Opportunities */}
           {aiSummary.savingsOpportunities && aiSummary.savingsOpportunities.length > 0 && (
            <div className="mt-6">
                 <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                    <FaPiggyBank className="text-emerald-400" /> Savings Opportunity
                </h4>
                <div className="space-y-2">
                    {aiSummary.savingsOpportunities.slice(0, 2).map((opportunity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
                        <p className="text-xs text-gray-300">{opportunity}</p>
                    </div>
                    ))}
                </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Tips Section */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
          <FaLightbulb className="text-amber-400" /> Smart Tips for You
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {aiSummary.tips?.map((tip, index) => (
            <div key={index} className="flex items-start p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 hover:border-amber-500/20 transition-all">
              <FaLightbulb className="text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-gray-300 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Concerns Section */}
      {aiSummary.concerns && aiSummary.concerns.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
            <FaExclamationTriangle className="text-orange-400" /> Attention Needed
          </h4>
          <div className="grid md:grid-cols-1 gap-2">
            {aiSummary.concerns.map((concern, index) => (
              <div key={index} className="flex items-start p-3 bg-orange-500/5 rounded-lg border border-orange-500/10">
                <FaExclamationTriangle className="text-orange-400 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-300">{concern}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISummarizer;
