import React, { useState } from 'react';
import { Calendar, FileText, Upload, CreditCard, MessageSquare, Settings, LogOut, Menu, X, Search, Bell, ChevronRight, Clock, TrendingUp, Scale } from 'lucide-react';

const DashboardPanel = () => {
  const [selectedTab, setSelectedTab] = useState('consultations');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'consultations', label: 'Consultations', icon: Calendar, count: 3, color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-50', iconColor: 'text-yellow-600' },
    { id: 'fir', label: 'FIR Requests', icon: FileText, count: 2, color: 'from-gray-700 to-gray-800', bgColor: 'bg-gray-100', iconColor: 'text-gray-700' },
    { id: 'documents', label: 'Documents', icon: Upload, count: 8, color: 'from-yellow-600 to-yellow-700', bgColor: 'bg-yellow-50', iconColor: 'text-yellow-700' },
    { id: 'payments', label: 'Payments', icon: CreditCard, count: 5, color: 'from-gray-800 to-black', bgColor: 'bg-gray-100', iconColor: 'text-gray-800' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: 4, color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-50', iconColor: 'text-yellow-600' },
  ];

  const stats = [
    { label: 'Active Cases', value: '24', trend: '+12%', icon: TrendingUp, color: 'text-yellow-600' },
    { label: 'Pending Reviews', value: '8', trend: '-3%', icon: Clock, color: 'text-gray-700' },
    { label: 'This Month', value: '₹45K', trend: '+18%', icon: CreditCard, color: 'text-yellow-600' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-5 left-5 z-50 p-2.5 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
      >
        {sidebarOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
      </button>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white shadow-xl transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shadow-lg">
                <Scale className="text-yellow-600 w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-serif">
                  Legal<span className="text-yellow-600">Ease</span>
                </h2>
                <p className="text-xs text-gray-400 font-medium">Control Panel</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = selectedTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full group relative flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                      isActive ? 'bg-white/20' : item.bgColor
                    }`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.iconColor}`} />
                    </div>
                    <span className="font-semibold text-sm">{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                      isActive ? 'bg-white/25 text-white' : 'bg-black text-white'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-100 space-y-1.5">
            <button className="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
              <Settings className="w-5 h-5" />
              <span className="font-medium text-sm">Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="p-5 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl lg:text-3xl font-bold font-serif text-gray-800 ml-12 lg:ml-0">
                {menuItems.find(item => item.id === selectedTab)?.label}
              </h1>
              <div className="hidden lg:flex items-center gap-3">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all w-64"
                  />
                </div>
                <button className="relative p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-600 rounded-full"></span>
                </button>
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                  <span className="text-yellow-600 font-bold text-sm">JD</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</span>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                      <span className="text-xs font-semibold text-yellow-700 bg-yellow-50 px-2 py-1 rounded-full">
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-yellow-500 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">2 days ago</span>
                  </div>
                </div>
                <h3 className="font-bold font-serif text-gray-800 mb-2 text-lg group-hover:text-yellow-600 transition-colors">Case Title {item}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">Comprehensive legal documentation and case details for review and processing.</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Status: Active</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardPanel;