import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import incomeReducer from "./incomeReducer";
import expensesReducer from "./expensesReducer";
import transactionsReducer from "./transactionsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  income: incomeReducer,
  expenses: expensesReducer,
  transactions: transactionsReducer,
});

export default rootReducer;
