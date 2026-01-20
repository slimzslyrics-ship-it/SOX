
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface RegisterScreenProps {
  onRegister: (user: UserProfile) => void;
  onGoLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onGoLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referredBy, setReferredBy] = useState('');
  const [error, setError] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('sox_users') || '[]');
    
    if (users.some((u: any) => u.email === email)) {
      setError('Este e-mail já está em uso.');
      return;
    }

    const referralCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    // Processar indicação se houver código
    if (referredBy) {
      const godfather = users.find((u: any) => u.referralCode === referredBy.toUpperCase());
      if (godfather) {
        godfather.referralsCount = (godfather.referralsCount || 0) + 1;
      } else {
        setError('Código de convite inválido.');
        return;
      }
    }

    const newUser = { 
      uid: Math.random().toString(36).substr(2, 9), 
      name, 
      email, 
      password,
      referralCode,
      referredBy: referredBy.toUpperCase() || undefined,
      referralPurchasesCount: 0,
      referralsCount: 0
    };

    users.push(newUser);
    localStorage.setItem('sox_users', JSON.stringify(users));

    onRegister({ 
      uid: newUser.uid, 
      name: newUser.name, 
      email: newUser.email, 
      referralCode: newUser.referralCode,
      referralPurchasesCount: 0,
      referralsCount: 0
    });
  };

  return (
    <div className="flex-1 flex flex-col p-8 bg-white justify-center overflow-y-auto animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-black text-[#E10600] tracking-tighter mb-2">SOX</h1>
        <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Criar Conta</h2>
        <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Megas rápidos em segundos</p>
      </div>

      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Nome Completo"
          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-800 focus:border-[#E10600] outline-none transition-all"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input 
          type="email" 
          placeholder="Seu melhor E-mail"
          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-800 focus:border-[#E10600] outline-none transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Escolha uma Senha"
          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-800 focus:border-[#E10600] outline-none transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="pt-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-1">Código de Convite (Opcional)</label>
          <input 
            type="text" 
            placeholder="EX: ABC123"
            className="w-full bg-red-50/30 border-2 border-dashed border-red-100 rounded-2xl px-5 py-4 font-black text-gray-800 focus:border-[#E10600] outline-none transition-all placeholder:text-red-200 uppercase"
            value={referredBy}
            onChange={(e) => setReferredBy(e.target.value)}
          />
        </div>

        {error && <p className="text-[#E10600] text-xs font-bold text-center">{error}</p>}

        <button className="w-full bg-[#E10600] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-red-100 active:scale-95 transition-all mt-4">
          Criar Conta e Entrar
        </button>
      </form>

      <button onClick={onGoLogin} className="mt-8 text-gray-500 text-xs font-bold uppercase tracking-widest text-center">
        Já tem uma conta? <span className="text-[#E10600]">Entrar</span>
      </button>
    </div>
  );
};

export default RegisterScreen;
