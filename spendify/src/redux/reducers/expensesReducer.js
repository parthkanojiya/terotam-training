import {
  SET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SET_TOTAL_ITEMS,
  SET_CATEGORIES_DATA,
} from "../types";

const initialState = {
  expenses: [],
  totalItems: 0,
  categories: [],
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPENSES:
      return { ...state, expenses: action.payload };

    case ADD_EXPENSE:
      const isDuplicate = state.expenses.some(
        (expense) =>
          expense.id === action.payload.id ||
          expense.name === action.payload.name
      );
      if (!isDuplicate) {
        return { ...state, expenses: [action.payload, ...state.expenses] };
      }
      return state;

    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };

    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id
            ? { ...expense, ...action.payload.updatedExpense }
            : expense
        ),
      };

    case SET_TOTAL_ITEMS:
      return { ...state, totalItems: action.payload };

    case SET_CATEGORIES_DATA:
      return { ...state, categories: action.payload };

    default:
      return state;
  }
};

export default expensesReducer;
