
import React, { useState } from 'react';
import { CashEntry } from '../types';
import { PlusCircle, MinusCircle, Wallet, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AccountingProps {
  cashFlow: CashEntry[];
  onAddEntry: (entry: CashEntry) => void;
}

const Accounting: React.FC<AccountingProps> = ({ cashFlow, onAddEntry }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');

  const totalIn = cashFlow.filter(e => e.type === 'INCOME').reduce((a, b) => a + b.amount, 0);
  const totalOut = cashFlow.filter(e => e.type === 'EXPENSE').reduce((a, b) => a + b.amount, 0);
  const balance = totalIn - totalOut;

  const handleAdd = () => {
    if (!amount || !description) return;
    const entry: CashEntry = {
      id: `cash-${Date.now()}`,
      type,
      amount: parseFloat(amount),
      description,
      category: type === 'INCOME' ? 'Otros Ingresos' : 'Gasto General',
      timestamp: new Date().toISOString()
    };
    onAddEntry(entry);
    setAmount('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Entradas</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-green-600">${totalIn.toLocaleString()}</p>
                <ArrowUpRight className="text-green-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Salidas</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-red-600">${totalOut.toLocaleString()}</p>
                <ArrowDownRight className="text-red-500" />
              </div>
            </div>
            <div className="bg-[#D62828] p-6 rounded-2xl shadow-lg text-white">
              <p className="text-xs font-bold text-red-200 uppercase mb-2">Saldo Caja</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-extrabold">${balance.toLocaleString()}</p>
                <Wallet className="text-red-300" />
              </div>
            </div>
          </div>

          {/* History */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h3 className="text-lg font-bold mb-6">Movimientos de Caja</h3>
            <div className="space-y-3">
              {cashFlow.map(entry => (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${entry.type === 'INCOME' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {entry.type === 'INCOME' ? <PlusCircle size={20} /> : <MinusCircle size={20} />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{entry.description}</p>
                      <p className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${entry.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                    {entry.type === 'INCOME' ? '+' : '-'} ${entry.amount.toLocaleString()}
                  </p>
                </div>
              ))}
              {cashFlow.length === 0 && <p className="text-center text-gray-400 py-12">No hay movimientos registrados.</p>}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h3 className="text-lg font-bold mb-4">Registrar Movimiento</h3>
            <div className="space-y-4">
              <div className="flex p-1 bg-gray-100 rounded-lg">
                <button 
                  onClick={() => setType('INCOME')}
                  className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${type === 'INCOME' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}
                >
                  Ingreso
                </button>
                <button 
                  onClick={() => setType('EXPENSE')}
                  className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${type === 'EXPENSE' ? 'bg-white shadow text-red-600' : 'text-gray-500'}`}
                >
                  Egreso
                </button>
              </div>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Monto ($)"
                className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#D62828]"
              />
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Concepto / Descripción"
                className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#D62828] min-h-[100px]"
              />
              <button 
                onClick={handleAdd}
                className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all ${type === 'INCOME' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
              >
                Cargar Movimiento
              </button>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-[#F7B733]" />
              <h3 className="font-bold">Cierre de Caja Diario</h3>
            </div>
            <p className="text-sm text-gray-400 mb-6">Finaliza la jornada comparando el dinero físico con el sistema.</p>
            <button className="w-full py-3 bg-[#F7B733] text-gray-900 rounded-xl font-bold hover:bg-yellow-400 transition-all">
              Ejecutar Cierre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounting;
