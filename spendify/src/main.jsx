import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./global.less";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { ThemeProvider } from "./themeContext.jsx";
import Login from "./Pages/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Categories from "./Pages/Categories/Categories.jsx";
import Incomes from "./Pages/Incomes/Incomes.jsx";
import Expenses from "./Pages/Expenses/Expenses.jsx";
import Transactions from "./Pages/Transactions/Transactions.jsx";
import { UserProvider } from "./UserContext.jsx";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "categories", element: <Categories /> },
      { path: "incomes", element: <Incomes /> },
      { path: "expenses", element: <Expenses /> },
      { path: "transactions", element: <Transactions /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <UserProvider>
      <StrictMode>
        <RouterProvider router={appRouter} />
      </StrictMode>
    </UserProvider>
  </ThemeProvider>
);
