import { LOGIN_SUCCESS, LOGOUT } from "../actions/authActions";

const initialState = {
  isLoggedIn: !!localStorage.getItem("authToken"),
  username: localStorage.getItem("username") || "",
  token: localStorage.getItem("authToken") || "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username || "",
        token: action.payload.token || "",
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        token: "",
      };
    default:
      return state;
  }
};

export default authReducer;
