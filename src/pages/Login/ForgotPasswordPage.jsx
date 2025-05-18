import { useState } from "react";
import { authService } from "../../../backend/Services/authService";
import { Link } from "react-router-dom";
import "./LoginPage.css"; // On réutilise le même style

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // URL de redirection après la réinitialisation du mot de passe
      const redirectUrl = `${window.location.origin}/reset-password`;
      
      const { error } = await authService.sendPasswordResetEmail(email, redirectUrl);
      
      if (error) {
        setMessage(error.message);
      } else {
        setMessage(`Un email de réinitialisation a été envoyé à ${email}. Veuillez vérifier votre boîte de réception.`);
        setEmail("");
      }
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
      console.error("Erreur lors de la demande de réinitialisation :", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      {/* Une seule grosse étoile du drapeau du Sénégal */}
      <div className="senegal-star senegal-star-main">★</div>
      
      <div className="login-card">
        <h1 className="login-title">Mot de passe oublié</h1>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <p className="form-description">
            Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe.
          </p>
          
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
          
          {message && (
            <p 
              className="message" 
              style={{ 
                color: message.includes("erreur") || message.includes("Error") ? "red" : "green",
                marginBottom: "15px"
              }}
            >
              {message}
            </p>
          )}
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer le lien"}
          </button>
        </form>
        
        <div className="form-footer">
          <Link to="/login" className="back-to-login">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}