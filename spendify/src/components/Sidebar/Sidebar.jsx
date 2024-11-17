import { useState } from "react";
import "./style.less";
import "../../global.less";
import { Link } from "react-router-dom";

import dashboard from "../../assets/dashboard.svg";
import income from "../../assets/income.svg";
import transactions from "../../assets/transactions.svg";
import expense from "../../assets/expense.svg";
import categories from "../../assets/categories.svg";

const Sidebar = () => {
  return (
    <nav className="sidebar sidebar-box-shadow">
      <Link to="/" className="logo flex item-center gap-8 text-decoration-none">
        <span className="logo-icon">S</span>
        <span>Spendify</span>
      </Link>
      <div className="menu">
        <ul className="flex flex-column">
          <Link to="/dashboard" className="text-decoration-none">
            <li className="flex item-center gap-8">
              <img src={dashboard} alt="dashboard" className="sidebar-icons" />
              <h3>Dashboard</h3>
            </li>
          </Link>

          <Link to="categories" className="text-decoration-none">
            <li className="flex item-center gap-8">
              <img
                src={categories}
                alt="Categories"
                style={{ marginLeft: "-2px" }}
              />
              <h3>Categories</h3>
            </li>
          </Link>

          <Link to="incomes" className="text-decoration-none">
            <li className="flex item-center gap-8">
              <img src={income} alt="income" className="sidebar-icons" />
              <h3>Incomes</h3>
            </li>
          </Link>

          <Link to="expenses" className="text-decoration-none">
            <li className="flex item-center gap-8">
              <img src={expense} alt="expense" className="sidebar-icons" />
              <h3>Expenses</h3>
            </li>
          </Link>

          <Link to="transactions" className="text-decoration-none">
            <li className="flex item-center gap-8">
              <img
                src={transactions}
                alt="Transactions"
                className="sidebar-icons"
              />
              <h3>Transactions</h3>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
