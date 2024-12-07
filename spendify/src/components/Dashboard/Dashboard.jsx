import React, { Component } from "react";
import "./style.less";
import "../../global.less";
import FinanceChart from "../FinanceChart/FinanceChart";
import PieCharts from "../PieChart/PieCharts";
import { collection, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { Col, Row } from "antd";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: [],
      userId: null,
    };
  }

  componentDidMount() {
    this.authUnsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        this.setState({ userId });

        const transactionsCollection = collection(
          db,
          `users/${userId}/transactions`
        );
        this.unsubscribe = onSnapshot(transactionsCollection, (snapshot) => {
          const transactionsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.setState({ transaction: transactionsData });
        });
      } else {
        console.error("User is not authenticated.");
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
    if (this.authUnsubscribe) this.authUnsubscribe();
  }

  render() {
    const { transaction } = this.state;

    // Total Income Sum
    const filtered = transaction.filter((i) => i.type !== "expense");
    const totalIncome = filtered.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    // Total Expense Sum
    const filteredExpense = transaction.filter((i) => i.type !== "income");
    const totalExpense = filteredExpense.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    const totalTransactionSum = Number(totalIncome) + Number(totalExpense);

    return (
      <section className="dashboard-section">
        <Row style={{ alignItems: "center", padding: "4px 0" }} gutter={[8, 8]}>
          {/* Total Transactions */}
          <Col span={8}>
            <div className="card total-transaction">
              <span className="card-heading">Total Transactions</span>
              <h3 className="amount card-amount">
                ₹{totalTransactionSum.toLocaleString()}
              </h3>
              <div>
                <h3 className="amount"></h3>
                <div className="week flex item-center justify-between">
                  <span></span>
                  <span className="statics"></span>
                </div>
              </div>
            </div>
          </Col>

          {/* Income */}
          <Col span={8}>
            <div className="card income">
              <div className="flex item-center justify-between">
                <span className="card-heading">Income</span>
                <span className="add-btn"></span>
              </div>
              <h3 className="amount card-amount">
                ₹{totalIncome.toLocaleString()}
              </h3>
              {/* <h3 className="amountx">{totalExpense}</h3> */}
              <div>
                <span className="statics"></span>
                <div className="flex item-center justify-between">
                  {/* <span>This week’s Income</span> */}
                  <span></span>
                  <span className="statics"></span>
                  {/* <span className="statics">+ 12.23%</span> */}
                </div>
              </div>
            </div>
          </Col>

          {/* Expenses */}
          <Col span={8}>
            <div className="card expense">
              <div className="flex item-center justify-between">
                <span className="card-heading">Expenses</span>
                <span className="add-btn"></span>
              </div>
              <h3 className="amount card-amount">
                ₹{totalExpense.toLocaleString()}
              </h3>
              {/* <h3 className="amountx">{totalExpense}</h3> */}
              <div>
                <span className="statics"></span>
                <div className="week flex item-center justify-between">
                  {/* <span>This week’s Income</span> */}
                  <span></span>
                  <span className="statics"></span>
                  {/* <span className="statics">+ 12.23%</span> */}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* 2nd Row Start */}
        <Row style={{ alignItems: "center", padding: "4px 0" }} gutter={[8, 8]}>
          {/* Chart */}
          <Col span={16}>
            <div className="card" style={{ height: "350px" }}>
              <FinanceChart />
            </div>
          </Col>

          {/* All Expenses */}
          <Col span={8}>
            <div className="card all-expenses" style={{ height: "350px" }}>
              <div className="expense-head">
                <h3 className="card-heading">All Expenses</h3>
              </div>
              <PieCharts />
              <div className="pie-category flex item-center justify-between width-full gap-4">
                {[
                  ...new Set(
                    transaction
                      .filter((item) => item.type !== "income")
                      .map((item) => item.category)
                  ),
                ]
                  .slice(0, 4)
                  .map((category, index) => (
                    <ul className="flex flex-column gap-4" key={index}>
                      <li className="food">{category}</li>
                    </ul>
                  ))}
              </div>
            </div>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Dashboard;
