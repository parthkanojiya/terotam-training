import React from "react";
import "./style.less";
import "../../global.less";
import finance from "../../assets/finance.png";
import allExpense from "../../assets/all-expenses.png";
import FinanceChart from "../FinanceChart/FinanceChart";
import PieCharts from "../PieChart/PieCharts";

const AllExpense = () => {
  return (
    <section className="all-expense-section">
      <div className="all-expense-wrapper">
        {/* Balance */}
        <div className="balance flex flex-column justify-between">
          <span>Balance</span>
          <h3 className="amount">$25,000</h3>
          <div>
            <h3 className="amount"></h3>
            <div className="week flex item-center justify-between">
              <span></span>
              <span className="statics"></span>
            </div>
          </div>
        </div>
        {/* Income */}
        <div className="income flex flex-column justify-between">
          <span>Income</span>
          <div>
            <h3 className="amount">$50,000</h3>
            <div className="week flex item-center justify-between">
              <span>This week’s Income</span>
              <span className="statics">+ 12.23%</span>
            </div>
          </div>
        </div>
        {/* Expenses */}
        <div className="expenses flex flex-column justify-between">
          <span>Expenses</span>
          <h3 className="amount">$1500</h3>
          <div>
            <h3 className="amount"></h3>
            <div className="week flex item-center justify-between">
              <span></span>
              <span className="statics"></span>
            </div>
          </div>
        </div>
        {/* Finance Statistic */}
        <div className="finance">
          {/* <img src={finance} alt="" /> */}
          <FinanceChart />
        </div>
        {/* All Expenses */}
        <div className="all-expenses">
          {/* <img src={allExpense} alt="" /> */}
          <div className="expense-head">
            <h3>All Expenses</h3>
          </div>
          <PieCharts />
          <div className="flex item-center justify-between width-full gap-4">
            <ul className="flex flex-column gap-4">
              <li className="food">Food</li>
              <li className="vacation">Vacation</li>
            </ul>
            <ul className="flex flex-column gap-4">
              <li className="movie">Movie</li>
              <li className="entertainments">Entertainments</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllExpense;
