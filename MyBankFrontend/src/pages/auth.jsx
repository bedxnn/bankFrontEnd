import { useState } from "react";
import api from "../assets/api";
import { useNavigate } from "react-router-dom";

export default function Auth({ onLogin }) {   // 👈 FIX 1: accept onLogin
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data;
      localStorage.setItem("token", token);

      onLogin();              // 👈 FIX 2: tell App “user is logged in”
      navigate("/");

      alert("Login successfully");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", {
        email,
        password,
      });

      const token = res.data;
      localStorage.setItem("token", token);

      onLogin();             
      navigate("/");

      alert("Signup successful");
    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="box">
      <h2>{isLogin ? "Login" : "Sign up"}</h2>

      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <br />

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Need an account? Sign up"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}
