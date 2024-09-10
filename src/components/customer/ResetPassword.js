import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Récupérer le token depuis l'URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      // Envoyer le nouveau mot de passe avec le token au backend
      const response = await axios.post(
        "http://localhost:5001/v1/customer/createResetPassword",
        {
          token,
          newPassword
        }
      );

      // Afficher un message de succès si la requête a réussi
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      // Gérer les erreurs
      setError("Erreur lors de la réinitialisation du mot de passe.");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Réinitialiser le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nouveau mot de passe:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmer le nouveau mot de passe:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>

      {/* Affichage des messages d'erreur ou de succès */}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
