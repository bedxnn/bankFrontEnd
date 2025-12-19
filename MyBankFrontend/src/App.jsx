import Navbar from "./pages/Navbar"
import "./css/navbar.css";
import "./css/auth.css";
import { Route,Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Wallet from './pages/Wallet';
import Auth from './pages/auth';

function App() {
  return (
    <>
<Navbar/>
<Routes>
  <Route path="/auth" element={<Auth />} />
  <Route path = "/" element = {<Dashboard/>}/>
    <Route path = "/accounts" element = {<Account/>}/>
     <Route path = "/wallet" element = {<Wallet/>}/>
</Routes>
    </>
  )
}

export default App
