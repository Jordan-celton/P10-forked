// Définition des types d'actions constants
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"; // Action lorsque la connexion réussit
export const LOGOUT = "LOGOUT"; // Action pour la déconnexion
export const UPDATE_USERNAME = "UPDATE_USERNAME"; // Action pour la mise à jour du nom d'utilisateur

// Action pour la connexion
export const login = (email, password) => async (dispatch) => {
  try {
    // Envoi d'une requête POST pour se connecter
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Envoi des données de connexion
    });

    // Gestion des erreurs de connexion
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la connexion");
    }

    // Récupération des données de réponse
    const data = await response.json();
    const { token } = data.body; // Extraction du token d'authentification

    // Envoi d'une requête pour récupérer le profil utilisateur
    const userProfileResponse = await fetch(
      "http://localhost:3001/api/v1/user/profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Envoi du token pour authentification
        },
      }
    );

    // Gestion des erreurs lors de la récupération du profil
    if (!userProfileResponse.ok) {
      throw new Error("Erreur lors de la récupération du profil utilisateur");
    }

    // Récupération des données de profil
    const userProfileData = await userProfileResponse.json();
    const { userName, firstName, lastName } = userProfileData.body;

    // Dispatch de l'action loginSuccess avec les données de l'utilisateur et le token
    dispatch(loginSuccess(userName, firstName, lastName, token));
    return { success: true };
  } catch (error) {
    // Gestion des erreurs et retour d'un message d'erreur
    console.error("Erreur lors de la connexion :", error);
    return { success: false, message: error.message };
  }
};

// Action pour la connexion réussie
export const loginSuccess = (username, firstName, lastName, token) => {
  return {
    type: LOGIN_SUCCESS, // Type d'action
    payload: { username, firstName, lastName, token }, // Données envoyées avec l'action
  };
};

// Action pour la déconnexion
export const logout = () => {
  return {
    type: LOGOUT, // Type d'action pour la déconnexion
  };
};

// Action pour vérifier l'état d'authentification
export const checkAuthStatus = () => async (dispatch, getState) => {
  const token = getState().auth.token; // Récupération du token depuis l'état actuel
  if (!token) {
    dispatch(logout()); // Déconnexion si pas de token
    return;
  }

  try {
    // Envoi d'une requête POST pour vérifier le profil utilisateur
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Envoi du token pour authentification
      },
    });

    // Vérification de la réponse
    if (response.ok) {
      // Récupération des données de profil
      const data = await response.json();
      const { userName, firstName, lastName } = data.body;
      // Dispatch de l'action loginSuccess avec les données du profil
      dispatch(loginSuccess(userName, firstName, lastName, token));
    } else {
      // Déconnexion si la réponse n'est pas correcte
      dispatch(logout());
    }
  } catch (error) {
    // Gestion des erreurs et déconnexion en cas d'erreur
    console.error(
      "Erreur lors de la vérification de l'authentification :",
      error
    );
    dispatch(logout());
  }
};

// Action pour la mise à jour du nom d'utilisateur
export const updateUsername = (newUsername) => async (dispatch, getState) => {
  const token = getState().auth.token; // Récupération du token depuis l'état actuel
  if (!token) {
    dispatch(logout()); // Déconnexion si pas de token
    return;
  }

  try {
    // Envoi d'une requête PUT pour mettre à jour le nom d'utilisateur
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Envoi du token pour authentification
      },
      body: JSON.stringify({ userName: newUsername }), // Envoi du nouveau nom d'utilisateur
    });

    // Gestion des erreurs lors de la mise à jour
    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du nom d'utilisateur");
    }

    // Dispatch de l'action pour mettre à jour le nom d'utilisateur dans le store
    dispatch({
      type: UPDATE_USERNAME, // Type d'action
      payload: { username: newUsername }, // Données envoyées avec l'action
    });
  } catch (error) {
    // Gestion des erreurs
    console.error(
      "Erreur lors de la mise à jour du nom d'utilisateur :",
      error
    );
  }
};
