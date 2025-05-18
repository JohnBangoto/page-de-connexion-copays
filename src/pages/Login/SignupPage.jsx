import { useState } from "react";
import { authService } from "../../../backend/Services/authService";
import "./LoginPage.css"; // on réutilise le même style

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await authService.signUp(email, password);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Inscription réussie ! Vérifie ton email.");
    }
  };

  return (
    <div className="login-container">
      {/* Une seule grosse étoile du drapeau du Sénégal */}
      <div className="senegal-star senegal-star-main">★</div>
      
      <div className="login-card">
        <h1 className="login-title">Créer un compte</h1>
        <form className="login-form" onSubmit={handleSignup}>
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
          {message && <p style={{ color: "green" }}>{message}</p>}
          <button type="submit" className="login-button">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}