
import React from 'react';
import { LayoutDashboard, ShoppingCart, Utensils, Wallet, Users, Settings } from 'lucide-react';
import { COLORS } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Ventas', icon: ShoppingCart },
    { id: 'production', label: 'Producción', icon: Utensils },
    { id: 'accounting', label: 'Caja / Contable', icon: Wallet },
    { id: 'b2b', label: 'Distribución B2B', icon: Users },
  ];

  return (
    <aside className="w-20 md:w-64 bg-white border-r h-screen flex flex-col no-print">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#D62828] rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
        <span className="hidden md:block font-bold text-xl text-gray-800">Miga Real</span>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-red-50 text-[#D62828]' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <item.icon size={24} />
            <span className="hidden md:block font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-500 hover:bg-gray-100 transition-all">
          <Settings size={24} />
          <span className="hidden md:block font-semibold">Configuración</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
