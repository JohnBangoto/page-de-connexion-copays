import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../backend/Services/authService";
import "./LoginPage.css"; // On réutilise le même style

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tokenVerified, setTokenVerified] = useState(false);
  const navigate = useNavigate();

  // Vérifier que l'utilisateur est arrivé par le lien de réinitialisation
  useEffect(() => {
    const checkResetSession = async () => {
      try {
        // Vérifie si une session de réinitialisation existe
        const { data } = await authService.getSession();
        if (data?.session) {
          setTokenVerified(true);
        } else {
          setMessage("Lien de réinitialisation invalide ou expiré. Veuillez demander un nouveau lien.");
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token:", error);
        setMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    };

    checkResetSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérification que les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    // Vérification de la force du mot de passe
    if (newPassword.length < 6) {
      setMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await authService.resetPassword(newPassword);
      
      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Votre mot de passe a été réinitialisé avec succès!");
        // Redirection après quelques secondes
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
      console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      {/* Une seule grosse étoile du drapeau du Sénégal */}
      <div className="senegal-star senegal-star-main">★</div>
      
      <div className="login-card">
        <h1 className="login-title">Réinitialiser le mot de passe</h1>
        
        {!tokenVerified ? (
          <div className="message-container">
            <p style={{ color: "red" }}>{message}</p>
            <button 
              className="login-button"
              onClick={() => navigate("/forgot-password")}
            >
              Demander un nouveau lien
            </button>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                className="form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            {message && (
              <p 
                className="message" 
                style={{ 
                  color: message.includes("succès") ? "green" : "red",
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
              {isSubmitting ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}