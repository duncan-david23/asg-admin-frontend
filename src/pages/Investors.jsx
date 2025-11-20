import React, { useState } from 'react';

const Investors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpData, setTopUpData] = useState({
    reference: '',
    amount: '',
    investorDetails: null
  });

  // Sample investors data
  const investors = [
    {
      id: 1,
      name: 'John Smith',
      reference: 'ACC-JD45566H4',
      avatar: 'JS',
      accountBalance: 56.00,
      withdrawableCommission: 3200,
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      reference: 'ACC-JD455656Y',
      avatar: 'SJ',
      accountBalance: 8500,
      withdrawableCommission: 1800,
      joinDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      reference: 'ACC-JD4556FGH',
      avatar: 'MW',
      accountBalance: 21000,
      withdrawableCommission: 5200,
      joinDate: '2024-01-08'
    },
    {
      id: 4,
      name: 'Emily Davis',
      reference: 'ACC-JD4556HJO',
      avatar: 'ED',
      accountBalance: 7500,
      withdrawableCommission: 1500,
      joinDate: '2024-01-05'
    },
    {
      id: 5,
      name: 'Alex Brown',
      reference: 'ACC-JD67866H4',
      avatar: 'AB',
      accountBalance: 16800,
      withdrawableCommission: 4200,
      joinDate: '2024-01-03'
    },
    {
      id: 6,
      name: 'David Miller',
      reference: 'ACC-JD4556YT7',
      avatar: 'DM',
      accountBalance: 9200,
      withdrawableCommission: 2300,
      joinDate: '2024-01-01'
    },
    {
      id: 7,
      name: 'Alex Brown',
      reference: 'ACC-JD4556789',
      avatar: 'AB',
      accountBalance: 16800,
      withdrawableCommission: 4200,
      joinDate: '2024-01-03'
    },
    {
      id: 8,
      name: 'David Miller',
      reference: 'ACC-JD455678H',
      avatar: 'DM',
      accountBalance: 9200,
      withdrawableCommission: 2300,
      joinDate: '2024-01-01'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter investors based on search
  const filteredInvestors = investors.filter(investor =>
    investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle top up form changes
  const handleTopUpChange = (e) => {
    const { name, value } = e.target;
    setTopUpData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-search investor when reference is entered
    if (name === 'reference' && value.length >= 3) {
      const foundInvestor = investors.find(inv => 
        inv.reference.toLowerCase() === value.toLowerCase()
      );
      setTopUpData(prev => ({
        ...prev,
        investorDetails: foundInvestor || null
      }));
    }
  };

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    // Handle top up logic here
    console.log('Top up data:', topUpData);
    setShowTopUpModal(false);
    setTopUpData({ reference: '', amount: '', investorDetails: null });
    // Add your API call here
  };

  const handleSearchInvestor = () => {
    if (topUpData.reference.length >= 3) {
      const foundInvestor = investors.find(inv => 
        inv.reference.toLowerCase() === topUpData.reference.toLowerCase()
      );
      setTopUpData(prev => ({
        ...prev,
        investorDetails: foundInvestor || null
      }));
    }
  };

  return (
    <div className="h-screen bg-gray-50 p-4 sm:p-6 pt-20 w-full md:overflow-x-scroll">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Investor Management</h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
          Manage investor accounts and wallet balances
        </p>
      </div>

      {/* Top Up Wallet Button */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => setShowTopUpModal(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Top Up Wallet</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by name or reference number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Investors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredInvestors.map((investor) => (
          <div key={investor.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            {/* Header with Avatar and Name */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {investor.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{investor.name}</h3>
                  <p className="text-gray-500 text-sm">{investor.reference}</p>
                </div>
              </div>
            </div>

            {/* Account Balance */}
            <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-900">Account Balance</span>
                <span className="text-lg font-bold text-blue-600">
                  {formatCurrency(investor.accountBalance)}
                </span>
              </div>
            </div>

            {/* Withdrawable Commission */}
            <div className="mb-4 p-3 bg-green-50 rounded-xl border border-green-100">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-900">Withdrawable Commission</span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(investor.withdrawableCommission)}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="text-xs text-gray-500">
                Joined {formatDate(investor.joinDate)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredInvestors.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No investors found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'No investors in the system yet'}
          </p>
        </div>
      )}

      {/* Top Up Wallet Modal */}
      {showTopUpModal && (
        <div className="fixed inset-1 bg-gray-600 opacity-98 flex items-center justify-center z-1 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Top Up Investor Wallet</h2>
              <button
                onClick={() => setShowTopUpModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleTopUpSubmit}>
              {/* Reference Input with Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investor Reference Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="reference"
                    value={topUpData.reference}
                    onChange={handleTopUpChange}
                    placeholder="Enter reference number (e.g., INV-001)"
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSearchInvestor}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Investor Details */}
              {topUpData.investorDetails && (
                <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {topUpData.investorDetails.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{topUpData.investorDetails.name}</h4>
                      <p className="text-sm text-gray-600">Current Balance: {formatCurrency(topUpData.investorDetails.accountBalance)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Add (GHS)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    GHS
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={topUpData.amount}
                    onChange={handleTopUpChange}
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowTopUpModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg"
                >
                  Top Up Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investors;