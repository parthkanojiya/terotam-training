const initialState = {
  transactions: [],
  categories: [],
  selectedCategory: "",
};

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};

export default transactionsReducer;
