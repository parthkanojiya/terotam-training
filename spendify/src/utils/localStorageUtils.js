export const saveState = (state) => {
  try {
    const persist = JSON.stringify(state.category);
    localStorage.setItem("categoryState", persist);
  } catch (error) {
    console.error("Could not save categoryState", error);
  }
};

export const loadCategoryState = () => {
  try {
    const persisted = localStorage.getItem("categoryState");

    if (!persisted) {
      console.log("No persisted category state found.");
      return { category: [] };
    }
    const parsedData = JSON.parse(persisted);

    if (Array.isArray(parsedData)) {
      return { category: parsedData };
    } else {
      console.error("Persisted category state is not an array.");
      return { category: [] };
    }
  } catch (error) {
    console.error("Could not load categoryState", error);
    return { category: [] };
  }
};
