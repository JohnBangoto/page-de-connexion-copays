import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../backend/supabaseClient";
import { FaGoogle, FaGithub } from "react-icons/fa";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      console.log("Connexion réussie :", data);
      navigate("/dashboard");
    }
  };

  const handleOAuthLogin = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "http://localhost:5173/dashboard",
      },
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      console.log(`Redirection pour ${provider}`, data);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Bienvenue</h1>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Adresse email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Mot de passe"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>

        <div className="oauth-section">
          <button
            type="button"
            className="oauth-button google"
            onClick={() => handleOAuthLogin("google")}
          >
            <FaGoogle className="oauth-icon" />
            Continuer avec Google
          </button>
          <button
            type="button"
            className="oauth-button github"
            onClick={() => handleOAuthLogin("github")}
          >
            <FaGithub className="oauth-icon" />
            Continuer avec GitHub
          </button>
        </div>

        <div className="form-footer">
          <a href="#" className="forgot-password">
            Mot de passe oublié?
          </a>
          <p className="signup-prompt">
            Pas encore de compte?{" "}
            <a href="/signup" className="signup-link">
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

