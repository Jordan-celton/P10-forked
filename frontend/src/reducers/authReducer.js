import { LOGIN_SUCCESS, LOGOUT, UPDATE_USERNAME } from "../actions/authActions";

const initialState = {
  isLoggedIn: false,
  username: "",
  token: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        token: "",
      };
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload.username,
      };
    default:
      return state;
  }
};

export default authReducer;
