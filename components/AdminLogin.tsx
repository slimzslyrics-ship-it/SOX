
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Credenciais específicas solicitadas
    const ADMIN_EMAIL = 'slimzslyrics@gmail.com';
    const ADMIN_PASS = 'amo te pai12@';

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setError('');
      onLogin();
    } else {
      setError('Credenciais incorretas. Acesso negado.');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-white">
       <button onClick={onBack} className="self-start text-gray-400 mb-10 flex items-center gap-1 font-bold text-xs uppercase tracking-widest hover:text-[#E10600] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Sair do Painel
      </button>

      <div className="mb-8">
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Admin SOX</h2>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Acesso restrito ao fornecedor</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-1">E-mail Administrativo</label>
          <input 
            type="email" 
            placeholder="admin@exemplo.com"
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-800 focus:ring-4 focus:ring-[#E10600]/5 focus:border-[#E10600] outline-none transition-all placeholder:text-gray-200"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
          />
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-1">Senha de Acesso</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-800 focus:ring-4 focus:ring-[#E10600]/5 focus:border-[#E10600] outline-none transition-all placeholder:text-gray-200"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
          />
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex gap-3 animate-shake">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-red-600 font-bold uppercase tracking-tight">{error}</p>
          </div>
        )}

        <button className="w-full bg-[#E10600] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-red-100 active:scale-95 hover:bg-[#F20700] transition-all mt-4">
          Entrar no Painel
        </button>
      </form>

      <div className="mt-auto py-8 text-center">
        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest leading-loose">
          Este painel é exclusivo para gestão de pedidos.<br/>
          Tentativas de acesso não autorizadas são monitoradas.
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
