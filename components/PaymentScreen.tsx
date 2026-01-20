
import React, { useState } from 'react';
import { Package } from '../types';
import { ADMIN_PHONE, ADMIN_NAME } from '../constants';

interface PaymentScreenProps {
  pkg: Package;
  onConfirm: (id: string) => void;
  onBack: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ pkg, onConfirm, onBack }) => {
  const [id, setId] = useState('');

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-white">
      <button onClick={onBack} className="self-start p-2 -ml-2 text-gray-400 mb-6 flex items-center gap-1 font-bold hover:text-[#E10600] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        VOLTAR
      </button>

      <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter uppercase">Pagamento</h2>
      <p className="text-gray-400 text-sm mb-8 font-medium">Siga as instruções para receber seus megas.</p>
      
      <div className="space-y-6">
        <div className="flex flex-col items-center p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 text-center shadow-inner">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Enviar exatamente</p>
          <div className="text-4xl font-black text-[#E10600] mb-6 tracking-tight">{pkg.price} MT</div>
          
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Para o número M-Pesa</p>
          <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-3xl border border-gray-200 shadow-sm w-full">
            <span className="text-xl font-black text-gray-800 tracking-wider flex-1">{ADMIN_PHONE}</span>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(ADMIN_PHONE);
                // Feedback visual simples poderia ser adicionado aqui
              }}
              className="p-2 text-[#E10600] bg-red-50 rounded-xl hover:bg-red-100 active:scale-90 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </button>
          </div>
          <p className="mt-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Titular: <span className="text-gray-900">{ADMIN_NAME}</span></p>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 px-1">ID da Transação M-Pesa</label>
          <input 
            placeholder="EX: 8H12345ABC"
            className="w-full bg-white border-2 border-gray-100 rounded-3xl px-4 py-5 text-center font-mono text-xl font-black focus:border-[#E10600] outline-none transition-all uppercase placeholder:text-gray-200"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="p-5 bg-blue-50 border border-blue-100 rounded-3xl">
          <div className="flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[10px] text-blue-800 font-bold uppercase leading-relaxed">
              O envio manual leva de 5 a 15 min. Verifique o ID antes de confirmar.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto pb-4 pt-8">
        <button 
          disabled={!id}
          onClick={() => onConfirm(id)}
          className={`w-full py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl transition-all ${
            id 
              ? 'bg-[#E10600] text-white active:scale-95 shadow-red-200' 
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
        >
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;
