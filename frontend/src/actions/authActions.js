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

// Action pour la connexion
export const login = (email, password) => async (dispatch) => {
  try {
    // Requête de connexion
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la connexion");
    }

    const data = await response.json();
    const { token } = data.body;

    // Stockez le token dans le localStorage
    localStorage.setItem("authToken", token);

    // Requête pour obtenir les informations de l'utilisateur
    const userProfileResponse = await fetch(
      "http://localhost:3001/api/v1/user/profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!userProfileResponse.ok) {
      throw new Error("Erreur lors de la récupération du profil utilisateur");
    }

    const userProfileData = await userProfileResponse.json();
    const { userName } = userProfileData.body;

    // Stockez les informations de l'utilisateur dans le localStorage
    localStorage.setItem("username", userName);

    // Dispatch l'action de connexion réussie avec les informations de l'utilisateur
    dispatch(loginSuccess(userName, token));
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    alert(error.message);
  }
};

// Action pour initialiser l'authentification
export const initializeAuth = () => (dispatch) => {
  const token = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  if (token && username) {
    dispatch(loginSuccess(username, token));
  }
};
