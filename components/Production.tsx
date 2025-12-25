
import React from 'react';
import { Order, SandwichType } from '../types';
import { PROMOS } from '../constants';
import { Scale, ShoppingBag, ClipboardList, Info } from 'lucide-react';

interface ProductionProps {
  orders: Order[];
}

const Production: React.FC<ProductionProps> = ({ orders }) => {
  // We assume pending orders need to be produced
  const pendingOrders = orders.filter(o => o.status === 'pending');

  const totalClassics = pendingOrders.reduce((acc, order) => {
    return acc + order.items.reduce((iAcc, item) => {
      const promo = PROMOS.find(p => p.id === item.promoId);
      return iAcc + (promo?.classics || 0);
    }, 0);
  }, 0);

  const totalSpecials = pendingOrders.reduce((acc, order) => {
    return acc + order.items.reduce((iAcc, item) => {
      const promo = PROMOS.find(p => p.id === item.promoId);
      return iAcc + (promo?.specials || 0);
    }, 0);
  }, 0);

  // Conversion: Planchas (A plancha makes 6 sandwiches)
  const planchasClassics = Math.ceil(totalClassics / 6);
  const planchasSpecials = Math.ceil(totalSpecials / 6);

  // Logic for ingredients (rough estimates for MVP)
  const ingredients = [
    { name: 'Pan de Miga', amount: planchasClassics + planchasSpecials, unit: 'Planchas' },
    { name: 'Jamón Cocido', amount: (totalClassics * 25) / 1000, unit: 'kg' }, // 25g per sandwich
    { name: 'Queso Tybo', amount: (totalClassics * 20) / 1000, unit: 'kg' }, // 20g per sandwich
    { name: 'Mayonesa', amount: (totalClassics + totalSpecials) * 10, unit: 'gr' },
    { name: 'Huevos', amount: Math.ceil((totalClassics * 0.5) + (totalSpecials * 0.7)), unit: 'unidades' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Planificación de Producción</h2>
        <div className="flex items-center gap-2 bg-[#F7B733] text-gray-900 px-4 py-2 rounded-full font-bold text-sm">
          <Info size={16} />
          Unidad mínima: 1/2 Docena (6 u.)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Summary of Production */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="text-[#D62828]" />
            <h3 className="text-lg font-bold">Producción Pendiente Hoy</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500 uppercase font-bold mb-1">Clásicos</p>
              <p className="text-3xl font-extrabold text-gray-800">{totalClassics}</p>
              <p className="text-xs text-gray-400 mt-1">({planchasClassics} planchas)</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500 uppercase font-bold mb-1">Especiales</p>
              <p className="text-3xl font-extrabold text-[#D62828]">{totalSpecials}</p>
              <p className="text-xs text-gray-400 mt-1">({planchasSpecials} planchas)</p>
            </div>
          </div>
        </div>

        {/* Right: Shopping List */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="text-[#F7B733]" />
            <h3 className="text-lg font-bold">Lista de Compras de Insumos</h3>
          </div>
          
          <div className="space-y-3">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100">
                <span className="font-semibold text-gray-700">{ing.name}</span>
                <span className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-bold">
                  {ing.amount.toFixed(2)} {ing.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Production Guide per Order */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-lg font-bold mb-6">Detalle por Pedido</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left border-b">
              <tr>
                <th className="pb-3 font-bold text-gray-400 text-sm">CLIENTE</th>
                <th className="pb-3 font-bold text-gray-400 text-sm">CANTIDAD</th>
                <th className="pb-3 font-bold text-gray-400 text-sm">DESCRIPCIÓN</th>
                <th className="pb-3 font-bold text-gray-400 text-sm">ESTADO</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pendingOrders.map(order => (
                <tr key={order.id} className="group">
                  <td className="py-4 font-bold text-gray-800">{order.customerName}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-red-50 text-[#D62828] rounded-lg font-bold text-xs">
                      {order.items.reduce((a, b) => a + b.totalSandwiches, 0)} u.
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-500">
                    {order.items.map(item => PROMOS.find(p => p.id === item.promoId)?.name).join(', ')}
                  </td>
                  <td className="py-4">
                    <button className="bg-gray-100 hover:bg-green-100 hover:text-green-600 px-4 py-1 rounded-full text-xs font-bold transition-colors">
                      Completar
                    </button>
                  </td>
                </tr>
              ))}
              {pendingOrders.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-400">Todo al día. No hay producción pendiente.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Production;
