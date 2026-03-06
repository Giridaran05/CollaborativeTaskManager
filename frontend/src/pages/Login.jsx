import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../index.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If user already logged in redirect to workspace
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/workspace");
    }

  }, [navigate]);

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password
      });

      // store token
      localStorage.setItem("token", res.data.token);

      // redirect to workspace
      navigate("/workspace");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1 className="auth-title">Team Collaboration Platform</h1>

        <p className="auth-subtitle">Sign in to continue</p>

        <form onSubmit={handleLogin} className="auth-form">

          <input
            type="email"
            placeholder="Email address"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="auth-switch">
          Not a user? <Link to="/register">Register now</Link>
        </p>

      </div>

    </div>

  );
}

export default Login;