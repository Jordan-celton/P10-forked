// Définir les types d'actions
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

// Action pour la connexion réussie
export const loginSuccess = (username, token) => ({
  type: LOGIN_SUCCESS,
  payload: { username, token },
});

// Action pour la déconnexion
export const logout = () => ({
  type: LOGOUT,
});

// Exemple d'action async pour la connexion
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la connexion");
    }

    const data = await response.json();
    const { username, token } = data.body;

    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);

    dispatch(loginSuccess(username, token));
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    // Vous pourriez aussi gérer les erreurs ici
  }
};
