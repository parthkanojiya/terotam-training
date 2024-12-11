import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../types";

const initialState = {
  isLoggedIn: false,
  userData: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        userData: action.payload,
        error: null,
      };

    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        userData: action.payload,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
