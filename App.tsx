
import React, { useState, useEffect } from 'react';
import { Screen, Package, Order, OrderStatus, UserProfile } from './types';
import { PACKAGES } from './constants';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import BuyScreen from './components/BuyScreen';
import PaymentScreen from './components/PaymentScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import HistoryScreen from './components/HistoryScreen';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('SPLASH');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [targetNumber, setTargetNumber] = useState('');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);

  // Recuperar dados iniciais
  useEffect(() => {
    const savedOrders = localStorage.getItem('sox_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));

    const savedUser = localStorage.getItem('sox_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    // Pequeno delay para a splash screen brilhar
    const timer = setTimeout(() => {
      setIsInitializing(false);
      const user = localStorage.getItem('sox_current_user');
      if (user) {
        setCurrentScreen('HOME');
      } else {
        setCurrentScreen('AUTH_LOGIN');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Persistir ordens sempre que mudarem
  useEffect(() => {
    localStorage.setItem('sox_orders', JSON.stringify(orders));
  }, [orders]);

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('sox_current_user', JSON.stringify(user));
    setCurrentScreen('HOME');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sox_current_user');
    setCurrentScreen('AUTH_LOGIN');
  };

  const handleBuy = (pkg: Package) => {
    setSelectedPackage(pkg);
    setCurrentScreen('BUY');
  };

  const handleConfirmOrder = (number: string) => {
    setTargetNumber(number);
    setCurrentScreen('PAYMENT');
  };

  const handleCompletePayment = (transactionId: string) => {
    if (!selectedPackage || !currentUser) return;

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.uid,
      targetNumber,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      operator: selectedPackage.operator,
      price: selectedPackage.price,
      transactionId,
      status: OrderStatus.PENDING,
      timestamp: Date.now(),
    };

    setOrders([newOrder, ...orders]);
    setLastOrder(newOrder);
    setCurrentScreen('CONFIRMATION');
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const userOrders = orders.filter(o => o.userId === currentUser?.uid);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white relative shadow-2xl overflow-hidden flex flex-col">
      {currentScreen === 'SPLASH' && <SplashScreen />}
      
      {!isInitializing && (
        <>
          {currentScreen === 'AUTH_LOGIN' && (
            <LoginScreen 
              onLogin={handleLogin} 
              onGoRegister={() => setCurrentScreen('AUTH_REGISTER')} 
              onGoAdmin={() => setCurrentScreen('ADMIN_LOGIN')}
            />
          )}

          {currentScreen === 'AUTH_REGISTER' && (
            <RegisterScreen 
              onRegister={handleLogin} 
              onGoLogin={() => setCurrentScreen('AUTH_LOGIN')} 
            />
          )}

          {currentScreen === 'HOME' && (
            <HomeScreen 
              user={currentUser}
              onBuy={handleBuy} 
              onLogout={handleLogout}
              onGoHistory={() => setCurrentScreen('HISTORY')}
            />
          )}
          
          {currentScreen === 'BUY' && selectedPackage && (
            <BuyScreen 
              pkg={selectedPackage} 
              onCancel={() => setCurrentScreen('HOME')} 
              onConfirm={handleConfirmOrder}
            />
          )}
          
          {currentScreen === 'PAYMENT' && selectedPackage && (
            <PaymentScreen 
              pkg={selectedPackage} 
              onConfirm={handleCompletePayment}
              onBack={() => setCurrentScreen('BUY')}
            />
          )}
          
          {currentScreen === 'CONFIRMATION' && lastOrder && (
            <ConfirmationScreen 
              order={lastOrder} 
              onDone={() => setCurrentScreen('HOME')} 
            />
          )}

          {currentScreen === 'HISTORY' && (
            <HistoryScreen 
              orders={userOrders} 
              onBack={() => setCurrentScreen('HOME')} 
            />
          )}

          {currentScreen === 'ADMIN_LOGIN' && (
            <AdminLogin 
              onLogin={() => setCurrentScreen('ADMIN_DASHBOARD')} 
              onBack={() => setCurrentScreen('AUTH_LOGIN')} 
            />
          )}

          {currentScreen === 'ADMIN_DASHBOARD' && (
            <AdminDashboard 
              orders={orders} 
              onUpdateStatus={updateOrderStatus}
              onLogout={() => setCurrentScreen('HOME')} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
