
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center animate-fade-in bg-white">
      <div className="mb-6">
        <h1 className="text-7xl font-extrabold tracking-tighter text-[#E10600]">SOX</h1>
      </div>
      <p className="text-gray-500 font-medium text-sm">Megas rápidos. Simples. Confiável.</p>
      
      <div className="absolute bottom-10">
        <div className="w-8 h-8 border-4 border-[#E10600]/20 border-t-[#E10600] rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
