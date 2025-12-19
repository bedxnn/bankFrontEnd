import { useNavigate } from "react-router-dom";


function Account() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <div className="account-container">
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Account;
