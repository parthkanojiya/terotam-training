export const setTransactions = (transactions) => ({
  type: "SET_TRANSACTIONS",
  payload: transactions,
});

export const setCategories = (categories) => ({
  type: "SET_CATEGORIES",
  payload: categories,
});

export const setSelectedCategory = (category) => ({
  type: "SET_SELECTED_CATEGORY",
  payload: category,
});
