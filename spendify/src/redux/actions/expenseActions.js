import {
  DELETE_EXPENSE,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  SET_EXPENSES,
  SET_CATEGORIES_DATA,
  SET_TOTAL_ITEMS,
} from "../types";

export const setExpenses = (expenses) => ({
  type: SET_EXPENSES,
  payload: expenses,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (id, updatedExpense) => ({
  type: EDIT_EXPENSE,
  payload: { id, updatedExpense },
});

export const setTotalItems = (totalItems) => ({
  type: SET_TOTAL_ITEMS,
  payload: totalItems,
});

export const setCategories = (categories) => ({
  type: SET_CATEGORIES_DATA,
  payload: categories,
});
