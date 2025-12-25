
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingCart, Utensils, Wallet, Users, Settings, Printer, MessageCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import OrderForm from './components/OrderForm';
import Production from './components/Production';
import Accounting from './components/Accounting';
import B2BManager from './components/B2BManager';
import Sidebar from './components/Sidebar';
import { Order, CashEntry } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [cashFlow, setCashFlow] = useState<CashEntry[]>([]);
  
  // Real-time sync simulation: In a real Docker env, this would poll the FastAPI backend
  // For this MVP, we use localStorage to persist across refreshes
  useEffect(() => {
    const savedOrders = localStorage.getItem('miga_real_orders');
    const savedCash = localStorage.getItem('miga_real_cash');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedCash) setCashFlow(JSON.parse(savedCash));
  }, []);

  useEffect(() => {
    localStorage.setItem('miga_real_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('miga_real_cash', JSON.stringify(cashFlow));
  }, [cashFlow]);

  const addOrder = (order: Order) => {
    setOrders([order, ...orders]);
    const income: CashEntry = {
      id: `cash-${Date.now()}`,
      type: 'INCOME',
      amount: order.total,
      description: `Venta: ${order.customerName}`,
      category: 'Ventas',
      timestamp: new Date().toISOString()
    };
    setCashFlow([income, ...cashFlow]);
  };

  const renderModule = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard orders={orders} />;
      case 'orders': return <OrderForm onAddOrder={addOrder} />;
      case 'production': return <Production orders={orders} />;
      case 'accounting': return <Accounting cashFlow={cashFlow} onAddEntry={(e) => setCashFlow([e, ...cashFlow])} />;
      case 'b2b': return <B2BManager />;
      default: return <Dashboard orders={orders} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar for navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="flex items-center justify-between mb-8 no-print">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Miga Real</h1>
            <p className="text-gray-500">Sistema de Gestión Integral</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('orders')}
              className="bg-[#D62828] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Nueva Venta
            </button>
          </div>
        </header>

        <div className="animate-in fade-in duration-500">
          {renderModule()}
        </div>
      </main>

      {/* Persistent AI Float Button (Future expandability) */}
      <div className="fixed bottom-6 right-6 no-print">
        <button 
          className="bg-[#F7B733] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform text-gray-900 border-2 border-white"
          title="Asistente Miga Real AI"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default App;
