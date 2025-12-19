import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className = "nav">
        <Link to ="/" className="site-title"> Dashboard</Link>
        <ul className ="nav-links">
            <li> <Link to ="/wallet"> Wallet</Link></li>
             <li> <Link to ="/accounts"> Account</Link>  </li>
           
    
  
        </ul>
    </nav>
 
   
   
  );
}
