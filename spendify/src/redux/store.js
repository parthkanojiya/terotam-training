import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { saveState, loadCategoryState } from "../utils/localStorageUtils";

const persistedState = loadCategoryState();

const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
);

store.subscribe(() => {
  loadCategoryState(store.getState());
});

export default store;
