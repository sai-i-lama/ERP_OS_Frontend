import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyer l'adresse e-mail au backend pour générer et envoyer le lien de réinitialisation
      const response = await axios.post(
        "http://localhost:5001/v1/customer/sendTokenResetPassword",
        { email }
      );

      // Afficher un message de succès
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      // Gérer les erreurs
      setError("Erreur lors de l'envoi du lien de réinitialisation.");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Réinitialiser le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Adresse e-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Envoyer le lien de réinitialisation</button>
      </form>

      {/* Affichage des messages d'erreur ou de succès */}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
