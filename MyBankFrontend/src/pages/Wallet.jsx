import { useEffect ,useState} from "react";
import api from "../assets/api";

function Wallet() {
  const[deposit,setDeposit]= useState("");
  const[withdraw,setWithdraw]= useState("");
  const [message, setMessage] = useState("");
const [isError, setIsError] = useState(false);
const showMessage = (text, error = false) => {
  setMessage(text);
  setIsError(error);

  setTimeout(() => {
    setMessage("");
  }, 3000); 
};



const handledeposit = (e) => {
  e.preventDefault();
    api.post(`/bank/deposit?amount=${deposit}`
      ,null,
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`         
        }
      }
    )
    .then(()=> {
      showMessage("Deposit successfull") 
      setDeposit("")
    })
    .catch( ()=> {
      showMessage("deposit failed", true);
    });}

    //WITHDRAW
     const handleWithdraw = (e) => {
      e.preventDefault();
      api.post(`/bank/withdraw?amount=${withdraw}`
        ,null,
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(()=> {
        showMessage("withdraw successfull");
        setWithdraw("");
      })
      .catch (() => {
      showMessage("deposit failed", true);
      });
  
};
 return (
  <div className="wallet-container">
    <div className="wallet-card">
      <h2>Wallet</h2>

      {message && (
        <p className={`wallet-message ${isError ? "error" : "success"}`}>
          {message}
        </p>
      )}

      <form className="wallet-form" onSubmit={handledeposit}>
        <input
          type="number"
          placeholder="Deposit amount"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          required
        />
        <button type="submit">Deposit</button>
      </form>

      <form className="wallet-form" onSubmit={handleWithdraw}>
        <input
          type="number"
          placeholder="Withdraw amount"
          value={withdraw}
          onChange={(e) => setWithdraw(e.target.value)}
          required
        />
        <button className="withdraw-btn" type="submit">
          Withdraw
        </button>
      </form>
    </div>
  </div>
)};


export default Wallet