
import React from 'react';
import { Order } from '../types';

interface ConfirmationScreenProps {
  order: Order;
  onDone: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ order, onDone }) => {
  return (
    <div className="flex-1 flex flex-col p-6 items-center text-center justify-center animate-fade-in">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-black text-gray-900 mb-2">Pedido Recebido!</h2>
      <p className="text-gray-500 mb-8 max-w-[250px]">O seu pagamento está a ser verificado. Aguarde o envio dos megas.</p>

      <div className="w-full bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-4 mb-10">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <span className="text-gray-400 text-sm font-medium">Status</span>
          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Pendente</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Número</span>
          <span className="text-gray-800 font-bold">{order.targetNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Pacote</span>
          <span className="text-gray-800 font-bold">{order.packageName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">ID</span>
          <span className="text-gray-800 font-mono text-xs">{order.transactionId}</span>
        </div>
      </div>

      <button 
        onClick={onDone}
        className="w-full bg-[#E10600] text-white py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all shadow-md"
      >
        Voltar ao Início
      </button>
    </div>
  );
};

export default ConfirmationScreen;
