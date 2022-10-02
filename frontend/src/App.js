import "./assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-chat-elements/dist/main.css"
import LoginPage from "./screens/authentication/LoginPage";
import HomePage from "./screens/HomePage";
import RegisterPage from "./screens/authentication/RegisterPage";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Header from "./components/layouts/header";
import { AuthProvider, useAuth } from "./config/AuthProvider";
import ProfilePage from "./screens/ProfilePage";

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

  const ProtectedRoute = ({children}) => {
    const {user} = useAuth();

    if(!user) {
      return <Navigate to="/"/>;
    }
    return children;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
