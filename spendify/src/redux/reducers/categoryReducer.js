import {
  SET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  UPDATE_CATEGORY,
  SET_CATEGORY,
} from "../types";

const initialState = {
  categories: [],
  category: "",
  selectedCategory: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case ADD_CATEGORY:
      const isDuplicateCategory = state.categories.some(
        (category) =>
          category.id === action.payload.id ||
          category.name === action.payload.name
      );

      if (!isDuplicateCategory) {
        return { ...state, categories: [...state.categories, action.payload] };
      }

      return state;

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };

    case EDIT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
      };

    case SET_CATEGORY:
      return { ...state, category: action.payload };

    default:
      return state;
  }
};

export default categoryReducer;
