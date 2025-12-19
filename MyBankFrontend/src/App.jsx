import Navbar from "./pages/Navbar"
import "./css/navbar.css";
import "./css/auth.css";
import { Route,Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Wallet from './pages/Wallet';
import Auth from './pages/auth';
import ProtectedRoute from "./pages/ProtectedRoute";
import './css/wallet.css';
import './css/dashboard.css';
import './css/account.css';

function App() {
  return (
    <>
<Navbar/>
<Routes>
  <Route path="/auth" element={<Auth />} />

  <Route path = "/" element = {<ProtectedRoute>
    <Dashboard/>
    </ProtectedRoute>}/>

    <Route path = "/accounts" element = {<ProtectedRoute><Account/> </ProtectedRoute>}/>

     <Route path = "/wallet" element = {<ProtectedRoute> <Wallet/></ProtectedRoute>}/>
</Routes>
    </>
  )
}

export default App
