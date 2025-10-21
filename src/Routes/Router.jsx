import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCookie } from "../utils/cookie";

// import all pages
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  const [token, setToken] = useState(getCookie("token"));
  const navigate = useNavigate();

  // هر بار که توکن تغییر کنه، مسیرها دوباره بررسی میشن
  useEffect(() => {
    if (token) {
      navigate("/products", { replace: true });
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? <Navigate to="/products" replace /> : <RegistrationPage />
        }
      />
      <Route
        path="/login"
        element={
          token ? (
            <Navigate to="/products" replace />
          ) : (
            <LoginPage setToken={setToken} />
          )
        }
      />
      <Route
        path="/products"
        element={token ? <ProductsPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="*"
        element={<Navigate to={token ? "/products" : "/login"} replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
