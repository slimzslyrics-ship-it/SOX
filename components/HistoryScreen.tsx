
import React from 'react';
import { Order, OrderStatus } from '../types';

interface HistoryScreenProps {
  orders: Order[];
  onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ orders, onBack }) => {
  const getStatusStyles = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: 
        return 'text-orange-700 bg-orange-100 border-orange-200';
      case OrderStatus.DELIVERED: 
        return 'text-green-700 bg-green-100 border-green-200';
      case OrderStatus.CANCELLED: 
        return 'text-gray-600 bg-gray-100 border-gray-200';
      default: 
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-MZ', { 
      day: '2-digit', 
      month: 'long', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden">
      {/* Header Fixo */}
      <div className="p-5 flex items-center gap-4 bg-white border-b border-gray-100 shadow-sm z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-[#E10600] active:scale-90 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Meus Pedidos</h2>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Histórico de compras</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-10">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-6">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Sem pedidos por aqui</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">Você ainda não realizou compras. Seus pedidos aparecerão aqui assim que você concluir um pagamento.</p>
            <button 
              onClick={onBack}
              className="px-8 py-3 bg-[#E10600] text-white rounded-2xl font-bold shadow-md shadow-red-100 active:scale-95 transition-all"
            >
              Comprar agora
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <div 
              key={order.id} 
              className={`bg-white border transition-all duration-700 rounded-[2rem] p-5 shadow-sm overflow-hidden relative ${
                order.status === OrderStatus.PENDING 
                  ? 'border-orange-200 ring-2 ring-orange-50 animate-pulse-slow' 
                  : 'border-gray-100 hover:shadow-md'
              }`}
            >
              {/* Barra de progresso discreta para pedidos pendentes */}
              {order.status === OrderStatus.PENDING && (
                <div className="absolute top-0 left-0 w-full h-1 overflow-hidden">
                  <div className="w-full h-full bg-orange-100">
                    <div className="h-full bg-orange-400 animate-loading-bar origin-left"></div>
                  </div>
                </div>
              )}

              {/* Topo do Card */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${order.status === OrderStatus.PENDING ? 'bg-orange-500' : 'bg-[#E10600]'}`}></span>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{order.operator}</p>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 leading-tight">{order.packageName}</h3>
                  <p className="text-[11px] text-gray-400 font-medium">{formatDate(order.timestamp)}</p>
                </div>
                
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-tight shadow-sm transition-colors ${getStatusStyles(order.status)}`}>
                  {order.status === OrderStatus.PENDING && (
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-600"></span>
                    </span>
                  )}
                  {order.status}
                </div>
              </div>
              
              {/* Grid de Detalhes */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-3">
                <div className="space-y-1">
                  <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Enviado para</p>
                  <p className="text-sm font-bold text-gray-800">{order.targetNumber}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Valor Pago</p>
                  <p className="text-base font-black text-[#E10600]">{order.price} MT</p>
                </div>
              </div>
              
              {/* ID da Transação */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[10px] font-mono text-gray-300 truncate">ID: {order.transactionId}</p>
                </div>
                {order.status === OrderStatus.PENDING && (
                   <div className="flex items-center gap-1.5">
                     <span className="text-[9px] font-bold text-orange-400 animate-pulse">Processando...</span>
                   </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Estilos CSS extras para animações personalizadas */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.005); opacity: 0.98; }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s linear infinite;
        }
      `}</style>
      
      {/* Footer Hint */}
      {orders.length > 0 && (
        <div className="p-4 text-center bg-white border-t border-gray-50 shadow-inner">
          <p className="text-[10px] text-gray-400 font-medium">Deslize para ver todo o seu histórico de megas.</p>
        </div>
      )}
    </div>
  );
};

export default HistoryScreen;
