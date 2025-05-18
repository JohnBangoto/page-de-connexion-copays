import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../../backend/Services/authService";
import { FaGoogle, FaGithub } from "react-icons/fa";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await authService.loginWithEmailPassword(email, password);

    if (error) {
      setErrorMsg(error.message);
    } else {
      console.log("Connexion réussie :", data);
      navigate("/dashboard");
    }
  };

  const handleOAuthLogin = async (provider) => {
    const redirectUrl = "http://localhost:5173/dashboard";
    const { data, error } = await authService.loginWithOAuth(provider, redirectUrl);

    if (error) {
      setErrorMsg(error.message);
    } else {
      console.log(`Redirection pour ${provider}`, data);
    }
  };

  return (
    <div className="login-container">
      {/* Une seule grosse étoile du drapeau du Sénégal */}
      <div className="senegal-star senegal-star-main">★</div>
      
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
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Mot de passe"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMsg && <p className="error-message" style={{ color: "red" }}>{errorMsg}</p>}
          <button type="submit" className="login-button">
            Se connecter
          </button>
           <Link to="/forgot-password" className="forgot-password">
            Mot de passe oublié?
          </Link>
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
          <p className="signup-prompt">
            Pas encore de compte?{" "}
            <Link to="/signup" className="signup-link">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}