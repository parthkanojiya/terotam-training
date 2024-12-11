import { SET_USER_DATA, CLEAR_USER_DATA } from "../types";

export const setUserData = (user) => ({
  type: SET_USER_DATA,
  payload: user,
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});
