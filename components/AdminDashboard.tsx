
import React, { useState, useEffect } from 'react';
import { Order, OrderStatus, UserProfile } from '../types';

interface AdminDashboardProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, onUpdateStatus, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'PEDIDOS' | 'RANKING'>('PEDIDOS');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('sox_users') || '[]');
    setUsers(savedUsers);
  }, [activeTab, orders]); // Atualiza quando trocar de aba ou quando ordens mudarem

  const showToast = (message: string, type: 'success' | 'info' | 'reward') => {
    setToast({ message, type: type === 'reward' ? 'success' : type, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 5000);
  };

  const handleUpdate = (id: string, status: OrderStatus) => {
    onUpdateStatus(id, status);
    
    // Se o pedido for marcado como entregue, processamos a indicação
    if (status === OrderStatus.DELIVERED) {
      const order = orders.find(o => o.id === id);
      if (order) {
        const allUsers = JSON.parse(localStorage.getItem('sox_users') || '[]');
        const buyer = allUsers.find((u: any) => u.uid === order.userId);
        
        // Verifica se o comprador foi indicado por alguém
        if (buyer && buyer.referredBy) {
          const godfather = allUsers.find((u: any) => u.referralCode === buyer.referredBy);
          if (godfather) {
            // Incrementa o contador de compras geradas por este padrinho
            godfather.referralPurchasesCount = (godfather.referralPurchasesCount || 0) + 1;
            
            // Notifica o admin se atingiu a meta de 15 compras
            if (godfather.referralPurchasesCount % 15 === 0) {
              showToast(`🎁 META BATIDA! ${godfather.name} (${godfather.referralCode}) completou 15 vendas e ganhou 5GB!`, 'success');
            } else {
              showToast(`Venda vinculada ao código ${godfather.referralCode}`, 'success');
            }
            
            localStorage.setItem('sox_users', JSON.stringify(allUsers));
            setUsers(allUsers);
          }
        }
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 relative h-screen overflow-hidden">
      {/* Toast de Notificação */}
      <div className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 transform ${toast.visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
        <div className="bg-white p-4 rounded-2xl shadow-2xl border-2 border-green-500 flex items-center gap-3">
          <div className="bg-green-500 p-2 rounded-full text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-[11px] font-black uppercase text-gray-800 leading-tight">{toast.message}</p>
        </div>
      </div>

      <div className="bg-white p-5 border-b border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-black text-gray-900">Painel Administrativo</h2>
          <button onClick={onLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-black text-xs uppercase">Sair</button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('PEDIDOS')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'PEDIDOS' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
            Pedidos ({orders.filter(o => o.status === OrderStatus.PENDING).length})
          </button>
          <button onClick={() => setActiveTab('RANKING')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'RANKING' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
            🎁 Indicações
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar pb-10">
        {activeTab === 'PEDIDOS' ? (
          orders.length === 0 ? <p className="text-center text-gray-400 font-bold py-10 uppercase text-[10px]">Sem pedidos no momento</p> :
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[8px] font-black uppercase tracking-tighter bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">{order.operator}</span>
                  <h3 className="text-lg font-black text-gray-900 leading-tight">{order.packageName}</h3>
                </div>
                <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase ${order.status === OrderStatus.PENDING ? 'bg-orange-100 text-orange-600' : order.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{order.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div>
                  <p className="text-[8px] text-gray-400 font-black uppercase">Número Destino</p>
                  <p className="text-sm font-bold text-gray-900">{order.targetNumber}</p>
                </div>
                <div>
                  <p className="text-[8px] text-gray-400 font-black uppercase">M-Pesa ID</p>
                  <p className="text-sm font-bold text-[#E10600] uppercase">{order.transactionId}</p>
                </div>
              </div>
              {order.status === OrderStatus.PENDING && (
                <div className="flex gap-2 pt-2">
                  <button onClick={() => handleUpdate(order.id, OrderStatus.DELIVERED)} className="flex-1 bg-green-600 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-green-100">Marcar Entregue</button>
                  <button onClick={() => handleUpdate(order.id, OrderStatus.CANCELLED)} className="px-5 bg-gray-100 text-gray-400 py-4 rounded-xl font-black text-[10px] uppercase">X</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="space-y-4">
            <div className="bg-[#E10600] p-6 rounded-[2rem] text-white shadow-xl shadow-red-100 mb-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-1">Resumo de Marketing</h3>
              <p className="text-3xl font-black tracking-tighter">{users.reduce((acc, curr) => acc + (curr.referralPurchasesCount || 0), 0)}</p>
              <p className="text-[10px] font-bold uppercase opacity-80">Vendas totais geradas por convites</p>
            </div>

            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2 mb-2">Promotores Ativos (Ranking)</h3>
            
            {users.filter(u => (u.referralsCount > 0 || u.referralPurchasesCount > 0)).sort((a,b) => (b.referralPurchasesCount || 0) - (a.referralPurchasesCount || 0)).map((user, idx) => (
              <div key={user.uid} className="bg-white rounded-3xl p-5 border border-gray-100 flex items-center gap-4 hover:border-red-100 transition-colors">
                <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-black text-xs">#{idx+1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-black text-gray-900 text-sm">{user.name}</h4>
                    <span className="bg-red-50 text-[#E10600] text-[9px] font-black px-1.5 py-0.5 rounded border border-red-100">{user.referralCode}</span>
                  </div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                    {user.referralsCount || 0} Amigos convidados
                  </p>
                </div>
                <div className="bg-green-50 border border-green-100 p-3 rounded-2xl text-center min-w-[80px]">
                  <div className="text-lg font-black text-green-700 leading-none">{user.referralPurchasesCount || 0}</div>
                  <div className="text-[7px] text-green-600 font-black uppercase tracking-tighter">Vendas Totais</div>
                </div>
              </div>
            ))}

            {users.filter(u => u.referralsCount > 0).length === 0 && (
              <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
                <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest">Nenhum convite utilizado ainda</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
