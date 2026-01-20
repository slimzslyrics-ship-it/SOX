
import React, { useState, useRef, useEffect } from 'react';
import { Package, UserProfile } from '../types';
import { PACKAGES } from '../constants';

interface HomeScreenProps {
  user: UserProfile | null;
  onBuy: (pkg: Package) => void;
  onLogout: () => void;
  onGoHistory: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ user, onBuy, onLogout, onGoHistory }) => {
  const [activeTab, setActiveTab] = useState<'Diário' | 'Mensal' | 'Diamante' | 'Saldo' | 'Convite'>('Diário');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Efeito para scrollar e centralizar a aba ativa automaticamente
  useEffect(() => {
    const activeBtn = tabsRef.current?.querySelector(`[data-tab="${activeTab}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeTab]);

  const handleSharePackage = async (pkg: Package) => {
    const shareText = `Olha este pacote no SOX: ${pkg.name} por apenas ${pkg.price} MT! Compre agora megas rápidos e confiáveis em Moçambique. 🇲🇿`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Oferta SOX', text: shareText, url: window.location.href });
      } catch (err) { console.log(err); }
    } else {
      navigator.clipboard.writeText(shareText);
      setCopiedId(pkg.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleInviteFriend = async () => {
    const inviteLink = window.location.href;
    const shareText = `Ei! Baixa o app SOX para comprar megas super rápidos em Moçambique! 🚀\n\nUsa o meu código de convite: *${user?.referralCode}*\n\nLink: ${inviteLink}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Convite para o SOX',
          text: shareText,
        });
      } catch (err) { console.log('Erro ao compartilhar convite', err); }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Texto de convite copiado para a área de transferência!');
    }
  };

  const filteredPackages = PACKAGES.filter(pkg => {
    if (activeTab === 'Convite') return false;
    const matchesTab = (() => {
      if (activeTab === 'Diário') return pkg.name.includes('Diário');
      if (activeTab === 'Mensal') return pkg.name.includes('Mensal') && !pkg.name.includes('Diamante');
      if (activeTab === 'Diamante') return pkg.name.includes('Diamante');
      if (activeTab === 'Saldo') return pkg.name.includes('Saldo');
      return true;
    })();
    return matchesTab;
  });

  return (
    <div className="flex-1 flex flex-col bg-white h-screen overflow-hidden">
      <div className="p-5 pb-0 bg-white shadow-sm z-20">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-black text-[#E10600] tracking-tighter leading-none">SOX</h1>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Olá, {user?.name.split(' ')[0] || 'Cliente'}</p>
          </div>
          <div className="flex gap-1">
            <button onClick={onGoHistory} className="p-2.5 bg-gray-50 text-gray-400 rounded-2xl hover:text-[#E10600] active:scale-90 transition-all border border-gray-100 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button onClick={onLogout} className="p-2.5 bg-gray-50 text-gray-400 rounded-2xl hover:text-red-600 active:scale-90 transition-all border border-gray-100 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Barra de Abas com Scroll e Indicador de Continuidade */}
        <div className="relative mb-6">
          <div 
            ref={tabsRef}
            className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2 scroll-smooth snap-x snap-mandatory px-1"
          >
            {(['Diário', 'Mensal', 'Diamante', 'Saldo', 'Convite'] as const).map(tab => (
              <button
                key={tab}
                data-tab={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-none px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-wider transition-all border snap-center whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-[#E10600] text-white border-[#E10600] shadow-md shadow-red-100 scale-105' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200 active:scale-95'
                }`}
              >
                {tab === 'Convite' ? '🎁 Convite' : tab}
              </button>
            ))}
          </div>
          {/* Efeito Gradiente para indicar scroll à direita */}
          <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24 space-y-4 no-scrollbar">
        {activeTab === 'Convite' ? (
          <div className="animate-fade-in space-y-6">
            <div className="bg-red-50 border-2 border-dashed border-red-200 rounded-[2.5rem] p-8 text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Convide Amigos!</h2>
              <p className="text-gray-500 text-xs font-bold uppercase leading-relaxed mb-6 px-4">
                Quando os seus amigos completarem 15 compras, você ganha 5GB de recompensa!
              </p>
              
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-red-100 mb-6 flex flex-col items-center">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Seu Código de Convite</p>
                <div className="text-3xl font-black text-[#E10600] tracking-[0.2em]">{user?.referralCode}</div>
              </div>

              <button 
                onClick={handleInviteFriend}
                className="w-full bg-[#E10600] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-red-100 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Convidar Amigo
              </button>
            </div>

            <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Sua Recompensa</h3>
                <span className="text-[10px] font-black text-[#E10600] bg-red-50 px-2 py-1 rounded-lg">{(user?.referralPurchasesCount || 0)} / 15</span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-green-500 transition-all duration-1000" 
                  style={{ width: `${Math.min(((user?.referralPurchasesCount || 0) / 15) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-[9px] text-gray-400 font-bold uppercase text-center">
                {user?.referralsCount || 0} amigos já entraram pelo seu link
              </p>
            </div>
          </div>
        ) : (
          filteredPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white border rounded-[2rem] p-5 shadow-sm flex items-center justify-between group relative overflow-hidden border-gray-100 animate-slide-up">
              <div className="flex-1 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] uppercase font-black tracking-widest px-2 py-0.5 rounded-lg border bg-red-50 text-[#E10600] border-red-100">{pkg.operator}</span>
                  <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">{pkg.validity}</span>
                </div>
                <h3 className="text-[16px] font-black text-gray-900 leading-[1.2] mb-1">{pkg.name}</h3>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-gray-900 tracking-tighter">{pkg.price} MT</span>
                  <button onClick={() => handleSharePackage(pkg)} className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:text-[#E10600] active:scale-90 transition-all">
                    {copiedId === pkg.id ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <button onClick={() => onBuy(pkg)} className="bg-[#E10600] text-white px-6 py-4 rounded-2xl font-black text-[11px] tracking-widest active:scale-95 shadow-lg shadow-red-100 transition-all">
                COMPRAR
              </button>
            </div>
          ))
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        .animate-slide-up { animation: slideUp 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default HomeScreen;
