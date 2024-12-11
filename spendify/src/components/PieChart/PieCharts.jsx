import React, { Component, PureComponent } from "react";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  doc,
  deleteDoc,
  QuerySnapshot,
  writeBatch,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./style.less";
import "../../global.less";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { Empty } from "antd";

class PieCharts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
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
        const expenseQuery = query(
          transactionsCollection,
          where("type", "==", "expense")
        );

        this.unsubscribe = onSnapshot(expenseQuery, (snapshot) => {
          const expensesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            transactionDocId: doc.id,
            ...doc.data(),
          }));

          /* Filtered Data */
          const filtered = [
            ...new Set(
              expensesData.map((item) => ({
                name: item.category,
                value: item.amount,
              }))
            ),
          ].slice(0, 5);

          this.setState({
            expenses: filtered,
          });
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
    return this.state.expenses.length === 0 ? (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Expense Data not found"
      />
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart
          width={400}
          height={400}
          style={{ scale: "1.1", height: "210px" }}
        >
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={this.state.expenses}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default PieCharts;
