import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {supabase} from '../utils/supabase';

const Dashboard = () => {
  // Sample data
  const statsData = {
    totalInvestment: 1250000,
    totalPayout: 450000,
    totalInvestors: 2840
  };

  const recentTransactions = [
    { id: 1, type: 'payout', amount: 2500, to: 'John Smith', date: '2024-01-15 14:30', status: 'completed' },
    { id: 2, type: 'topup', amount: 5000, to: 'Sarah Johnson', date: '2024-01-15 11:15', status: 'completed' },
    { id: 3, type: 'payout', amount: 3200, to: 'Mike Wilson', date: '2024-01-14 16:45', status: 'pending' },
    { id: 4, type: 'topup', amount: 10000, to: 'Emily Davis', date: '2024-01-14 09:20', status: 'completed' },
    { id: 5, type: 'payout', amount: 2750, to: 'Alex Brown', date: '2024-01-13 13:10', status: 'completed' },
    { id: 6, type: 'topup', amount: 7500, to: 'David Miller', date: '2024-01-13 10:30', status: 'completed' },
    { id: 7, type: 'payout', amount: 3200, to: 'Mike Wilson', date: '2024-01-14 16:45', status: 'pending' },
    { id: 8, type: 'topup', amount: 10000, to: 'Emily Davis', date: '2024-01-14 09:20', status: 'completed' },
    { id: 9, type: 'payout', amount: 2750, to: 'Alex Brown', date: '2024-01-13 13:10', status: 'completed' },
    { id: 10, type: 'topup', amount: 7500, to: 'David Miller', date: '2024-01-13 10:30', status: 'completed' }
  ];

  const [userProfile, setUserProfile] = useState(null);
  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState(0);
  const [totalInvestors, setTotalInvestors] = useState(0);
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

useEffect(() => {
  const fetchUserProfiles = async () => {

    try {
       const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.access_token;
      setLoading(true);
    const profileResponse = await axios.get(
      "https://agi-backend.onrender.com/api/users/all-profiles",
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    // Extract the array
    const profiles = profileResponse.data;

    if (!Array.isArray(profiles)) {
      console.error("Profiles is not an array:", profiles);
      return;
    }

    // Calculate total wallet (sum)
    const totalInvestment = profiles.reduce(
      (sum, profile) => sum + (profile.wallet || 0),
      0
    );
   
    setTotalInvestmentAmount(totalInvestment);
    setTotalInvestors(profiles.length);
      
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    } finally {
      setLoading(false);
    }
   
  };

  fetchUserProfiles();
}, []);













  const getTransactionIcon = (type) => {
    if (type === 'payout') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
  };

  const getTransactionColor = (type) => {
    return type === 'payout' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600';
  };

  const getTransactionType = (type) => {
    return type === 'payout' ? 'Payout' : 'Top Up';
  };

  const getTransactionDescription = (type) => {
    return type === 'payout' ? 'Commission' : 'Wallet Funding';
  };

  return (
    <div className="h-screen bg-gray-50 p-4 sm:p-6 pt-20 w-full md:overflow-scroll">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Welcome back! Here's your investment overview</p>
      </div>
      {loading && (<div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Admin Data...</h3>
        </div>)}

      {/* Stats Grid - Mobile responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4   sm:gap-6 mb-6 sm:mb-8">
        {/* Total Investment Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full -mr-4 -mt-4 sm:-mr-6 sm:-mt-6"></div>
          
          <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
            <h3 className="text-sm sm:text-lg font-semibold">Total Investment</h3>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <p className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2 relative z-10">{formatCurrency(totalInvestmentAmount) || formatCurrency(0)}</p>
          <p className="text-blue-100 text-xs sm:text-sm">All time investment volume</p>
        </div>

        {/* Total Payout Card */}
        {/* <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full -mr-4 -mt-4 sm:-mr-6 sm:-mt-6"></div>
          
          <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
            <h3 className="text-sm sm:text-lg font-semibold">Total Payout</h3>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          <p className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2 relative z-10">{formatCurrency(statsData.totalPayout)}</p>
          <p className="text-green-100 text-xs sm:text-sm">Total commissions paid out</p>
        </div> */}

        {/* Total Investors Card */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full -mr-4 -mt-4 sm:-mr-6 sm:-mt-6"></div>
          
          <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
            <h3 className="text-sm sm:text-lg font-semibold">Total Investors</h3>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>

          <p className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2 relative z-10">{totalInvestors && totalInvestors}</p>
          <p className="text-purple-100 text-xs sm:text-sm">Active investors</p>
        </div>
      </div>

      {/* Recent Transactions - Mobile Responsive */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Transactions</h2>
           
          </div>
        </div> */}
        
        {/* Mobile View - Cards */}
        {/* <div className="sm:hidden">
          <div className="divide-y divide-gray-200">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTransactionColor(transaction.type)}`}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{getTransactionType(transaction.type)}</div>
                      <div className="text-xs text-gray-500">{getTransactionDescription(transaction.type)}</div>
                    </div>
                  </div>
                  <div className={`text-right ${transaction.type === 'payout' ? 'text-red-600' : 'text-green-600'}`}>
                    <div className="text-sm font-semibold">
                      {transaction.type === 'payout' ? '-' : '+'}{formatCurrency(transaction.amount)}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <div>
                    <span className="font-medium">To:</span> {transaction.to}
                  </div>
                  <div>{formatDate(transaction.date)}</div>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Desktop View - Table */}
        {/* <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Transaction</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">To</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTransactionColor(transaction.type)}`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{getTransactionType(transaction.type)}</div>
                        <div className="text-sm text-gray-500">{getTransactionDescription(transaction.type)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.to}</div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-semibold ${transaction.type === 'payout' ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.type === 'payout' ? '-' : '+'}{formatCurrency(transaction.amount)}
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(transaction.date)}</div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        
        {/* Empty State
        {recentTransactions.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">No transactions yet</h3>
            <p className="text-gray-500 text-sm sm:text-base">Transactions will appear here once processing starts.</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Dashboard;