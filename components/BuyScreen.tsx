
import React, { useState } from 'react';
import { Package } from '../types';

interface BuyScreenProps {
  pkg: Package;
  onCancel: () => void;
  onConfirm: (number: string) => void;
}

const BuyScreen: React.FC<BuyScreenProps> = ({ pkg, onCancel, onConfirm }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const validateAndConfirm = () => {
    if (phone.length < 9) {
      setError('Insira um número válido (ex: 84xxxxxxx)');
      return;
    }
    onConfirm(phone);
  };

  return (
    <div className="flex-1 flex flex-col p-6">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Finalizar Pedido</h2>
      
      <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100">
        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Resumo do Pacote</p>
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{pkg.name}</h3>
            <p className="text-gray-500">{pkg.operator} • {pkg.validity}</p>
          </div>
          <p className="text-2xl font-black text-[#E10600]">{pkg.price} MT</p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Número de Telefone</label>
          <input 
            type="tel" 
            placeholder="841234567"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, ''));
              setError('');
            }}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#E10600]/20 focus:border-[#E10600] transition-all"
          />
          {error && <p className="text-[#E10600] text-xs mt-1 font-medium">{error}</p>}
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-blue-700 leading-snug">
            Após o pagamento, os megas serão enviados manualmente pelo fornecedor. Certifique-se de que o número está correto.
          </p>
        </div>
      </div>

      <div className="mt-auto space-y-3 pb-4">
        <button 
          onClick={validateAndConfirm}
          className="w-full bg-[#E10600] text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all"
        >
          Confirmar Compra
        </button>
        <button 
          onClick={onCancel}
          className="w-full bg-white text-[#E10600] border-2 border-[#E10600] py-4 rounded-2xl font-bold text-lg active:scale-[0.98] transition-all"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default BuyScreen;
