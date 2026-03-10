import React, { useEffect } from 'react'
import Navbar from './components/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';

const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if( isCheckingAuth && !authUser ) return (

    <div className="flex justify-center items-center h-screen gap-4">
      <span className="loading loading-ring loading-xs"></span>
      <span className="loading loading-ring loading-sm"></span>
      <span className="loading loading-ring loading-md"></span>
      <span className="loading loading-ring loading-lg"></span>
      <span className="loading loading-ring loading-xl"></span>
    </div>

  );

  return (
    <div>
      
      <Navbar />

      <Routes>
        <Route path='/' element={ authUser ? <HomePage /> : <Navigate to ="/login" />}  />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to ="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to ="/" />} />
        <Route path='/setting' element={<SettingPage />} />
        <Route path='/profile' element={ authUser ? <ProfilePage /> : <Navigate to ="/login" />} />
      </Routes>

      <Toaster />

    </div>
  )
}

export default App