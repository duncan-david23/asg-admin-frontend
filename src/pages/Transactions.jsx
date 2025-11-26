import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {supabase} from '../utils/supabase';
import toast from 'react-hot-toast';



const Transactions = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample withdrawal requests data
  // const withdrawalRequests = [
  //   {
  //     id: 1,
  //     fullName: 'John Smith',
  //     reference: 'ACC-JD45566H4',
  //     paymentMethod: 'mtn',
  //     accountNumber: '0241234567',
  //     amount: 2500,
  //     date: '2024-01-15 14:30',
  //     status: 'pending'
  //   },
  //   {
  //     id: 2,
  //     fullName: 'Sarah Johnson',
  //     reference: 'ACC-JD455656Y',
  //     paymentMethod: 'bank',
  //     accountNumber: '1234567890123',
  //     amount: 1800,
  //     date: '2024-01-15 11:15',
  //     status: 'completed'
  //   },
  //   {
  //     id: 3,
  //     fullName: 'Mike Wilson',
  //     reference: 'ACC-JD4556FGH',
  //     paymentMethod: 'airteltigo',
  //     accountNumber: '0277654321',
  //     amount: 3200,
  //     date: '2024-01-14 16:45',
  //     status: 'pending'
  //   },
  //   {
  //     id: 4,
  //     fullName: 'Emily Davis',
  //     reference: 'ACC-JD4556HJO',
  //     paymentMethod: 'telecel',
  //     accountNumber: '0209876543',
  //     amount: 1500,
  //     date: '2024-01-14 09:20',
  //     status: 'completed'
  //   },
  //   {
  //     id: 5,
  //     fullName: 'Alex Brown',
  //     reference: 'ACC-JD67866H4',
  //     paymentMethod: 'bank',
  //     accountNumber: '9876543210987',
  //     amount: 2750,
  //     date: '2024-01-13 13:10',
  //     status: 'completed'
  //   },
  //   {
  //     id: 6,
  //     fullName: 'David Miller',
  //     reference: 'ACC-JD4556YT7',
  //     paymentMethod: 'mtn',
  //     accountNumber: '0245556677',
  //     amount: 4200,
  //     date: '2024-01-13 10:30',
  //     status: 'pending'
  //   }
  // ];

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodIcon = (method) => {
    const icons = {
      mtn: '🟣',
      telecel: '🔵', 
      airteltigo: '🟡',
      bank: '🏦'
    };
    return icons[method] || '💳';
  };

  const getPaymentMethodLabel = (method) => {
    const labels = {
      mtn: 'MTN MoMo',
      telecel: 'Telecel Cash',
      airteltigo: 'AirtelTigo Money',
      bank: 'Bank Transfer'
    };
    return labels[method] || 'Unknown';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-gradient-to-r from-yellow-400 to-amber-500',
      completed: 'bg-gradient-to-r from-green-400 to-emerald-500'
    };
    return colors[status] || 'bg-gray-400';
  };

  const getStatusText = (status) => {
    return status === 'pending' ? 'Awaiting Approval' : 'Payment Sent';
  };

  // Filter requests based on status and search
  const filteredRequests = withdrawalRequests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesSearch = 
      request.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.user_account_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.account_number.includes(searchTerm);
    
    return matchesStatus && matchesSearch;
  });

  const handleApprove = async(requestId, requestAmount, userId ) => {
    // Add your approval logic here - update status to 'completed'


    
    try {
          const { data: { session } } = await supabase.auth.getSession();
          const accessToken = session?.access_token;
          setLoading(true);

          const response = await axios.put(
      "https://agi-backend.onrender.com/api/users/admin/withdrawals/approve", {withdrawalId: requestId, amount: requestAmount, userId: userId},
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    toast.success("Withdrawal request approved successfully!");



    // Update local state to reflect the change
    setWithdrawalRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: 'completed' } : req
      )
    );

  } catch (error) {
    console.error("Error approving withdrawal requests:", error);
  } finally {
    setLoading(false);
  }


  };

  const totalPending = withdrawalRequests.filter(req => req.status === 'pending').length;
  const totalAmount = filteredRequests.reduce((sum, req) => sum + req.amount, 0);
  const pendingAmount = withdrawalRequests
    .filter(req => req.status === 'pending')
    .reduce((sum, req) => sum + req.amount, 0);






useEffect(() => {
  const fetchWithdrawalRequests = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.access_token;

    try {
        setLoading(true);

          const response = await axios.get(
      "https://agi-backend.onrender.com/api/users/admin/withdrawals",
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    const results = response.data.withdrawals;
    setWithdrawalRequests(results);

  } catch (error) {
    console.error("Error fetching withdrawal requests:", error);
  } finally {
    setLoading(false);
  }
};


  fetchWithdrawalRequests();
}, []);




  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 sm:p-6 pt-20 md:w-full md:overflow-scroll">
      {/* Header with Stats */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Withdrawal Requests
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Process investor commission payments
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 max-w-2xl">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending Requests</p>
                  <p className="text-2xl font-bold text-amber-600">{totalPending}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⏳</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending Amount</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(pendingAmount)}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Displayed</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalAmount)}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Status Filter */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                filterStatus === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All Requests
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                filterStatus === 'pending'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span>⏳</span>
              <span>Pending</span>
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                filterStatus === 'completed'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span>✅</span>
              <span>Completed</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search investors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all  bg-white/50 backdrop-blur-sm"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid gap-6">
        {loading && (<div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Loading requests...</h3>
        </div>)}
        {filteredRequests.map((request) => (
          <div key={request.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-2xl hover:border-blue-200/50 transition-all  transform hover:-translate-y-1">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Section - Investor Info */}
              <div className="flex-1">
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {request.full_name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{request.full_name}</h3>
                        <p className="text-gray-500 font-mono">{request.user_account_number}</p>
                      </div>
                      
                      {/* Amount - Large and prominent */}
                      <div className="text-right">
                        <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                          {formatCurrency(request.amount)}
                        </p>
                        <p className="text-sm text-gray-500">{formatDate(request.created_at)}</p>
                      </div>
                    </div>
                    
                    {/* Payment Method */}
                    <div className="mt-4 flex items-center space-x-4">
                      <div className="flex items-center space-x-2 bg-gray-50 rounded-xl px-3 py-2">
                        <span className="text-lg">{getPaymentMethodIcon(request.payment_method)}</span>
                        <span className="font-semibold text-gray-700">{getPaymentMethodLabel(request.payment_method)}</span>
                      </div>
                      <div className="font-mono text-gray-600 bg-gray-50 rounded-xl px-3 py-2">
                        {request.account_number}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Status and Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4">
                {/* Status Badge */}
                <div className={`px-4 py-2 rounded-xl text-white font-semibold text-sm shadow-lg ${getStatusColor(request.status)}`}>
                  {getStatusText(request.status)}
                </div>
                
                {/* Approve Button - Only show for pending requests */}
                {request.status === 'pending' && (
                  <button
                    onClick={() => handleApprove(request.id, request.amount, request.user_id)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 group/btn"
                  >
                    <span>Approve Payment</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      
      {filteredRequests.length === 0 && (
        <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No withdrawal requests</h3>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            {searchTerm || filterStatus !== 'all' 
              ? 'No requests match your current filters'
              : 'All withdrawal requests have been processed successfully! 🎉'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Transactions;