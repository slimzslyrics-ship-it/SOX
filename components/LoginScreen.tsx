
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface LoginScreenProps {
  onLogin: (user: UserProfile) => void;
  onGoRegister: () => void;
  onGoAdmin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onGoRegister, onGoAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('sox_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      // Fix: Ensure all UserProfile properties are included to match the expected type
      onLogin({ 
        uid: user.uid, 
        name: user.name, 
        email: user.email,
        referralCode: user.referralCode,
        referralPurchasesCount: user.referralPurchasesCount || 0,
        referralsCount: user.referralsCount || 0,
        phone: user.phone
      });
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8 bg-white justify-center">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-black text-[#E10600] tracking-tighter">SOX</h1>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Conectar à sua conta</p>
      </div>

      <form onSubmit={handleLoginSubmit} className="space-y-5">
        <div>
          <input 
            type="email" 
            placeholder="E-mail"
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-800 focus:border-[#E10600] outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Senha"
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-800 focus:border-[#E10600] outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-[#E10600] text-xs font-bold text-center">{error}</p>}

        <button className="w-full bg-[#E10600] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-red-100 active:scale-95 transition-all">
          Entrar
        </button>
      </form>

      <div className="mt-8 text-center space-y-4">
        <button onClick={onGoRegister} className="text-gray-500 text-xs font-bold uppercase tracking-widest">
          Não tem conta? <span className="text-[#E10600]">Cadastre-se</span>
        </button>
        <div className="pt-8 border-t border-gray-50">
          <button onClick={onGoAdmin} className="text-gray-300 text-[10px] font-black uppercase tracking-widest hover:text-gray-400">
            Acesso Administrativo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;