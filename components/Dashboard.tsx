
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Order } from '../types';
import { TrendingUp, Package, Users, DollarSign } from 'lucide-react';

interface DashboardProps {
  orders: Order[];
}

const Dashboard: React.FC<DashboardProps> = ({ orders }) => {
  const totalSales = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrders = orders.length;
  const b2bClients = orders.filter(o => o.customerType === 'B2B').length;
  
  const chartData = orders.slice(0, 7).reverse().map(o => ({
    name: new Date(o.createdAt).toLocaleDateString('es-AR', { weekday: 'short' }),
    ventas: o.total
  }));

  const metrics = [
    { label: 'Ventas Totales', value: `$${totalSales.toLocaleString()}`, icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Pedidos Realizados', value: totalOrders, icon: Package, color: 'bg-blue-100 text-blue-600' },
    { label: 'Clientes B2B', value: b2bClients, icon: Users, color: 'bg-purple-100 text-purple-600' },
    { label: 'Crecimiento', value: '+12%', icon: TrendingUp, color: 'bg-red-100 text-red-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${m.color}`}>
              <m.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{m.label}</p>
              <p className="text-2xl font-bold text-gray-800">{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Rendimiento Semanal</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventas" fill="#D62828" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Últimos Pedidos</h3>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${order.status === 'delivered' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <div>
                    <p className="font-semibold text-gray-800">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <p className="font-bold text-gray-800">${order.total.toLocaleString()}</p>
              </div>
            ))}
            {orders.length === 0 && <p className="text-center text-gray-400 py-8">No hay pedidos registrados.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
