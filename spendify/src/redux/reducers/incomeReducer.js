import {
  SET_INCOMES,
  ADD_INCOME,
  DELETE_INCOME,
  EDIT_INCOME,
  SET_TOTAL_ITEMS,
  SET_CATEGORIES_DATA,
} from "../types";

const initialState = {
  incomes: [],
  totalItems: 0,
  categories: [],
};

const incomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INCOMES:
      return { ...state, incomes: action.payload };

    case ADD_INCOME:
      const isDuplicate = state.incomes.some(
        (income) =>
          income.id === action.payload.id || income.name === action.payload.name
      );
      if (!isDuplicate) {
        return { ...state, incomes: [action.payload, ...state.incomes] };
      }
      return state;

    case DELETE_INCOME:
      return {
        ...state,
        incomes: state.incomes.filter((income) => income.id !== action.payload),
      };

    case EDIT_INCOME:
      return {
        ...state,
        incomes: state.incomes.map((income) =>
          income.id === action.payload.id
            ? { ...income, ...action.payload.updatedIncome }
            : income
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

export default incomeReducer;
