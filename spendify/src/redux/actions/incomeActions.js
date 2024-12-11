import {
  DELETE_INCOME,
  ADD_INCOME,
  EDIT_INCOME,
  SET_CATEGORIES_DATA,
  SET_INCOMES,
  SET_TOTAL_ITEMS,
} from "../types";

export const setIncomes = (incomes) => ({
  type: SET_INCOMES,
  payload: incomes,
});

export const addIncome = (income) => ({
  type: ADD_INCOME,
  payload: income,
});

export const deleteIncome = (id) => ({
  type: DELETE_INCOME,
  payload: id,
});

export const editIncome = (id, updatedIncome) => ({
  type: EDIT_INCOME,
  payload: { id, updatedIncome },
});

export const setTotalItems = (totalItems) => ({
  type: SET_TOTAL_ITEMS,
  payload: totalItems,
});

export const setCategories = (categories) => ({
  type: SET_CATEGORIES_DATA,
  payload: categories,
});
