import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Wallet from "./pages/Wallet";
import Auth from "./pages/auth";
import ProtectedRoute from "./pages/ProtectedRoute";

import "./css/navbar.css";
import "./css/auth.css";
import "./css/wallet.css";
import "./css/dashboard.css";
import "./css/account.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <>
      {isAuth && <Navbar />}

      <Routes>
        <Route
          path="/auth"
          element={<Auth onLogin={() => setIsAuth(true)} />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
