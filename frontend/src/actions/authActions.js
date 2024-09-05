export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const UPDATE_USERNAME = "UPDATE_USERNAME";

// Action pour la connexion
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
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la connexion");
    }

    const data = await response.json();
    const { token } = data.body;

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

    dispatch(loginSuccess(userName, token));
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return { success: false, message: error.message };
  }
};

// Action pour la connexion réussie
export const loginSuccess = (username, token) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { username, token },
  };
};

// Action pour la déconnexion
export const logout = () => {
  return {
    type: LOGOUT,
  };
};

// Action pour vérifier l'état d'authentification
export const checkAuthStatus = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  if (!token) {
    dispatch(logout());
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const { userName } = data.body;
      dispatch(loginSuccess(userName, token));
    } else {
      dispatch(logout());
    }
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de l'authentification :",
      error
    );
    dispatch(logout());
  }
};

// Action pour la mise à jour du nom d'utilisateur
export const updateUsername = (newUsername) => async (dispatch, getState) => {
  const token = getState().auth.token;
  if (!token) {
    dispatch(logout());
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: newUsername }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du nom d'utilisateur");
    }

    dispatch({
      type: UPDATE_USERNAME,
      payload: { username: newUsername },
    });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du nom d'utilisateur :",
      error
    );
  }
};
