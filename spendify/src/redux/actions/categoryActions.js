import {
  SET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  UPDATE_CATEGORY,
} from "../types";

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  payload: category,
});

export const deleteCategory = (id) => ({
  type: DELETE_CATEGORY,
  payload: id,
});

export const editCategory = (category) => ({
  type: EDIT_CATEGORY,
  payload: category,
});

export const updateCategory = (category) => ({
  type: UPDATE_CATEGORY,
  payload: category,
});

export const setCategory = (category) => ({
  type: "SET_CATEGORY",
  payload: category,
});
