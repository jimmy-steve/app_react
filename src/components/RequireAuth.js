import React from "react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
    // Vérifiez si l'utilisateur est connecté en vérifiant le localStorage
    const userIsLoggedIn = localStorage.getItem("userLoggedIn") === "true";

    // Si l'utilisateur est connecté, renvoyez les enfants (le composant de route)
    // Sinon, redirigez l'utilisateur vers la page de connexion
    return userIsLoggedIn ? children : <Navigate to="/login" />;
}

export default RequireAuth;
