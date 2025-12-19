import Navbar from "./pages/Navbar"
import "./css/navbar.css";
import { Route,Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Wallet from './pages/Wallet';

function App() {
  return (
    <>
<Navbar/>
<Routes>
  <Route path = "/" element = {<Dashboard/>}/>
    <Route path = "/accounts" element = {<Account/>}/>
     <Route path = "/wallet" element = {<Wallet/>}/>
</Routes>
    </>
  )
}

export default App
