
import React, { useState } from 'react';
import { PROMOS, FLAVORS, SHIPPING_ZONES, UNIT_MIN } from '../constants';
import { Order, OrderItem, SandwichType } from '../types';
import { Plus, Trash2, CheckCircle, ChevronRight, User, Truck } from 'lucide-react';

interface OrderFormProps {
  onAddOrder: (order: Order) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onAddOrder }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerType, setCustomerType] = useState<'B2C' | 'B2B'>('B2C');
  const [shippingZone, setShippingZone] = useState(SHIPPING_ZONES[0]);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [step, setStep] = useState(1);

  const addPromo = (promo: typeof PROMOS[0]) => {
    const newItem: OrderItem = {
      id: Math.random().toString(36).substr(2, 9),
      promoId: promo.id,
      flavors: [], // To be filled in step 2
      totalSandwiches: promo.classics + promo.specials,
      price: promo.price
    };
    setItems([...items, newItem]);
  };

  const calculateTotal = () => {
    const subtotal = items.reduce((acc, item) => acc + item.price, 0);
    const shipping = shippingZone.cost;
    const discount = customerType === 'B2B' ? subtotal * 0.15 : 0; // 15% B2B Discount
    return subtotal + shipping - discount;
  };

  const handleSubmit = () => {
    if (!customerName || items.length === 0) return alert('Datos incompletos');
    
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      customerName,
      customerType,
      items,
      shippingZone: shippingZone.name,
      shippingCost: shippingZone.cost,
      discount: customerType === 'B2B' ? 0.15 : 0,
      total: calculateTotal(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    onAddOrder(newOrder);
    // Reset form
    setCustomerName('');
    setItems([]);
    setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border shadow-xl overflow-hidden">
      {/* Progress Stepper */}
      <div className="bg-gray-50 p-4 flex justify-between border-b px-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${
              step >= s ? 'bg-[#D62828] text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {s}
            </div>
            <span className={`font-semibold hidden sm:inline ${step >= s ? 'text-[#D62828]' : 'text-gray-400'}`}>
              {s === 1 ? 'Cliente' : s === 2 ? 'Pedido' : 'Resumen'}
            </span>
            {s < 3 && <ChevronRight className="text-gray-300" />}
          </div>
        ))}
      </div>

      <div className="p-8">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nombre del Cliente / Empresa</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#D62828] outline-none"
                  placeholder="Ej: Familia Martinez o Kiosco Don Juan"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setCustomerType('B2C')}
                className={`p-4 rounded-xl border-2 transition-all text-left ${customerType === 'B2C' ? 'border-[#D62828] bg-red-50' : 'border-gray-100 hover:bg-gray-50'}`}
              >
                <p className="font-bold text-gray-800">Familia / Minorista</p>
                <p className="text-xs text-gray-500">Precio de lista estándar</p>
              </button>
              <button 
                onClick={() => setCustomerType('B2B')}
                className={`p-4 rounded-xl border-2 transition-all text-left ${customerType === 'B2B' ? 'border-[#D62828] bg-red-50' : 'border-gray-100 hover:bg-gray-50'}`}
              >
                <p className="font-bold text-gray-800">Distribución B2B</p>
                <p className="text-xs text-gray-500">15% Descuento automático</p>
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Zona de Envío</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SHIPPING_ZONES.map((zone) => (
                  <button 
                    key={zone.name}
                    onClick={() => setShippingZone(zone)}
                    className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                      shippingZone.name === zone.name ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {zone.name} (${zone.cost})
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full bg-[#D62828] text-white py-4 rounded-xl font-bold shadow-lg mt-4"
            >
              Continuar al Pedido
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Seleccionar Promos Imbatibles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROMOS.map((promo) => (
                <button 
                  key={promo.id}
                  onClick={() => addPromo(promo)}
                  className="flex items-center justify-between p-4 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#D62828] hover:bg-red-50 transition-all group"
                >
                  <div className="text-left">
                    <p className="font-bold text-[#D62828] group-hover:scale-105 transition-transform">{promo.name}</p>
                    <p className="text-xs text-gray-500">{promo.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">${promo.price.toLocaleString()}</p>
                    <Plus className="ml-auto text-gray-400 group-hover:text-[#D62828]" size={18} />
                  </div>
                </button>
              ))}
            </div>

            {items.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h4 className="font-bold text-gray-700 mb-4">Carrito del Pedido</h4>
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <span className="font-bold text-gray-800">
                          {PROMOS.find(p => p.id === item.promoId)?.name}
                        </span>
                        <span className="ml-3 text-sm text-gray-500">{item.totalSandwiches} unidades</span>
                      </div>
                      <button 
                        onClick={() => setItems(items.filter(i => i.id !== item.id))}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 bg-gray-200 py-4 rounded-xl font-bold">Volver</button>
              <button 
                onClick={() => setStep(3)} 
                disabled={items.length === 0}
                className={`flex-1 py-4 rounded-xl font-bold shadow-lg ${items.length > 0 ? 'bg-[#D62828] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Revisar Totales
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="bg-gray-50 p-6 rounded-2xl border">
              <div className="flex justify-between mb-4">
                <span className="text-gray-500">Subtotal de Productos</span>
                <span className="font-bold">${items.reduce((a, b) => a + b.price, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-500">Costo de Envío ({shippingZone.name})</span>
                <span className="font-bold text-green-600">+ ${shippingZone.cost.toLocaleString()}</span>
              </div>
              {customerType === 'B2B' && (
                <div className="flex justify-between mb-4 text-red-600 font-bold">
                  <span>Descuento Distribuidor (15%)</span>
                  <span>- ${(items.reduce((a, b) => a + b.price, 0) * 0.15).toLocaleString()}</span>
                </div>
              )}
              <div className="border-t pt-4 flex justify-between">
                <span className="text-xl font-bold text-gray-800">Total a Pagar</span>
                <span className="text-3xl font-extrabold text-[#D62828]">${calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 bg-gray-200 py-4 rounded-xl font-bold">Modificar</button>
              <button 
                onClick={handleSubmit}
                className="flex-3 bg-green-500 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                Confirmar y Finalizar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
