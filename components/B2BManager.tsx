
import React from 'react';
import { Users, Building2, Tag, Percent } from 'lucide-react';

const B2BManager: React.FC = () => {
  const clients = [
    { name: 'Kiosco El Profe', address: 'Calle 13 e/ 44 y 45', discount: '15%', debt: 0 },
    { name: 'Buffet Universitario', address: 'Facultad de Derecho', discount: '20%', debt: 15400 },
    { name: 'Catering La Plata', address: 'Camino Gral Belgrano', discount: '25%', debt: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Distribución B2B</h2>
        <button className="bg-gray-800 text-white px-6 py-2 rounded-xl font-bold">Nuevo Cliente Distribuidor</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 size={24} />
          </div>
          <p className="text-3xl font-extrabold text-gray-800">12</p>
          <p className="text-sm text-gray-500 font-bold">Puntos de Venta</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm text-center">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Percent size={24} />
          </div>
          <p className="text-3xl font-extrabold text-gray-800">18.5%</p>
          <p className="text-sm text-gray-500 font-bold">Descuento Promedio</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm text-center">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag size={24} />
          </div>
          <p className="text-3xl font-extrabold text-gray-800">450</p>
          <p className="text-sm text-gray-500 font-bold">Unidades/Mes</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-lg font-bold mb-6">Listado de Distribuidores</h3>
        <div className="space-y-4">
          {clients.map((client, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-2xl hover:bg-gray-50 transition-all gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <Users size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{client.name}</p>
                  <p className="text-xs text-gray-500">{client.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase">Descuento</p>
                  <p className="font-bold text-[#D62828]">{client.discount}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase">Saldo Deudor</p>
                  <p className={`font-bold ${client.debt > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    ${client.debt.toLocaleString()}
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-400">
                  <Tag size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default B2BManager;
