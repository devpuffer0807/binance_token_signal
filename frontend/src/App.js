import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./config/AuthProvider";

import Header from "./components/layouts/header";
import Menu from "./components/layouts/menu";

import LoginPage from "./screens/authentication/LoginPage";
import ForgotPage from "./screens/authentication/ForgotPage";
import HomePage from "./screens/HomePage";
import RegisterPage from "./screens/authentication/RegisterPage";
import VerifyPage from "./screens/authentication/VerifyPage";
import ProfilePage from "./screens/ProfilePage";
import MembershipPage from "./screens/MembershipPage";
import UsermanagePage from "./screens/admin/UsermanagePage";
import MembershipmanagePage from "./screens/admin/MembershipmanagePage";

import SpotSignalComponent from "./components/SpotSignalComponent";
import FutureSignalComponent from "./components/FutureSignalComponent";

import "./assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-chat-elements/dist/main.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const HomeLayout = () => {
    return (
      <div>
        <ToastContainer/>
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    );
  };
  const AdminLayout = () => {
    return (
      <div>
        <ToastContainer/>
        <Header />
        <Menu />
        <div>
          <Outlet />
        </div>
      </div>
    );
  }
  const SignalLayout = () => {
    return (
      <div>
        <ToastContainer/>
        <Header />
        <Menu />
        <div>
          <Outlet />
        </div>
      </div>
    );
  }
  const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership"
                element={
                  <ProtectedRoute>
                    <MembershipPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot" element={<ForgotPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify" element={<VerifyPage />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin/usermanage" element={<UsermanagePage />} />
                <Route path="/admin/membershipmanage" element={<MembershipmanagePage />} />
            </Route>
            <Route path="/signals" element={<SignalLayout />}>
                <Route path="/signals/all-spot-signals" element={<SpotSignalComponent signal={'GETALL'} link={'/signal/spot'} />} />
                <Route path="/signals/btc-spot-signals" element={<SpotSignalComponent signal={'BTC'} link={'/signal/spot'} />} />
                <Route path="/signals/usdt-spot-signals" element={<SpotSignalComponent signal={'USDT'} link={'/signal/spot'} />} />
                <Route path="/signals/busd-spot-signals" element={<SpotSignalComponent signal={'BUSDT'} link={'/signal/spot'} />} />
                <Route path="/signals/all-markets-signals" element={<SpotSignalComponent signal={'ALL_USDT'} link={'/signal/market'} />} />
                <Route path="/signals/all-kucoin-signals" element={<SpotSignalComponent signal={'KUCOIN_USDT'} link={'/signal/kucoin'} />} />
                <Route path="/signals/bitfinex-signals" element={<SpotSignalComponent signal={'BITFIX_USDT'} link={'/signal/bitfinex'} />} />
                <Route path="/signals/fix-signals" element={<SpotSignalComponent signal={'FIX_SIGNAL'} link={'/signals/fix-signals'} />} />
                <Route path="/signals/binance-futures" element={<FutureSignalComponent trade={false} />} />
                <Route path="/signals/binance-bot" element={<FutureSignalComponent trade={true} />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
