// backend/Services/authService.js
import { supabase } from '../supabaseClient';

/**
 * Service d'authentification qui encapsule toutes les interactions avec Supabase Auth
 */
export const authService = {
  /**
   * Connecte un utilisateur avec email et mot de passe
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe de l'utilisateur
   * @returns {Promise} - Résultat de la connexion
   */
  loginWithEmailPassword: async (email, password) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  /**
   * Connecte un utilisateur avec un fournisseur OAuth
   * @param {string} provider - Fournisseur OAuth (google, github, etc.)
   * @param {string} redirectUrl - URL de redirection après authentification
   * @returns {Promise} - Résultat de la connexion OAuth
   */
  loginWithOAuth: async (provider, redirectUrl) => {
    return await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
      },
    });
  },

  /**
   * Inscrit un nouvel utilisateur
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe de l'utilisateur
   * @returns {Promise} - Résultat de l'inscription
   */
  signUp: async (email, password) => {
    return await supabase.auth.signUp({
      email,
      password,
    });
  },

  /**
   * Déconnecte l'utilisateur actuel
   * @returns {Promise} - Résultat de la déconnexion
   */
  logout: async () => {
    return await supabase.auth.signOut();
  },

  /**
   * Récupère l'utilisateur actuellement connecté
   * @returns {Promise} - Données de l'utilisateur actuel
   */
  getCurrentUser: async () => {
    return await supabase.auth.getUser();
  },
  
  /**
   * Récupère la session active
   * @returns {Promise} - Session active
   */
  getSession: async () => {
    return await supabase.auth.getSession();
  },

  /**
   * Envoie un email de réinitialisation de mot de passe
   * @param {string} email - Email de l'utilisateur
   * @param {string} redirectUrl - URL de redirection après réinitialisation
   * @returns {Promise} - Résultat de la demande de réinitialisation
   */
  sendPasswordResetEmail: async (email, redirectUrl) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl
    });
  },
  
  /**
   * Réinitialise le mot de passe avec le token reçu par email
   * @param {string} newPassword - Nouveau mot de passe
   * @returns {Promise} - Résultat de la réinitialisation
   */
  resetPassword: async (newPassword) => {
    return await supabase.auth.updateUser({
      password: newPassword
    });
  },
  
  /**
   * Met à jour le mot de passe de l'utilisateur
   * @param {string} newPassword - Nouveau mot de passe
   * @returns {Promise} - Résultat de la mise à jour
   */
  updatePassword: async (newPassword) => {
    return await supabase.auth.updateUser({
      password: newPassword
    });
  },
  
  /**
   * Met à jour les données de l'utilisateur
   * @param {Object} userData - Nouvelles données utilisateur
   * @returns {Promise} - Résultat de la mise à jour
   */
  updateUserData: async (userData) => {
    return await supabase.auth.updateUser(userData);
  }
};