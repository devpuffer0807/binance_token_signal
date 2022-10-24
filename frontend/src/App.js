import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./config/AuthProvider";

import Header from "./components/layouts/header";

import LoginPage from "./screens/authentication/LoginPage";
import ForgotPage from "./screens/authentication/ForgotPage";
import HomePage from "./screens/HomePage";
import RegisterPage from "./screens/authentication/RegisterPage";
import VerifyPage from "./screens/authentication/VerifyPage";
import ProfilePage from "./screens/ProfilePage";
import MembershipPage from "./screens/MembershipPage";
import UsermanagePage from "./screens/admin/UsermanagePage";

import "./assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-chat-elements/dist/main.css";

function App() {
  const HomeLayout = () => {
    return (
      <div>
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
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    );
  }

  const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/" />;
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
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
