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
import { db } from "../../firebase";
import "./style.less";
import "../../global.less";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

class PieCharts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
    };
  }

  componentDidMount() {
    const transactionsCollection = collection(db, "transactions");
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
      const filtered = expensesData.map((item) => ({
        name: item.category,
        value: item.amount,
      }));

      this.setState({
        expenses: filtered,
      });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    const { expenses } = this.state;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart
          width={400}
          height={400}
          style={{ scale: "1.2", height: "210px" }}
        >
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={expenses}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Pie
            dataKey="value"
            data={expenses}
            cx={500}
            cy={200}
            innerRadius={40}
            outerRadius={80}
            fill="#82ca9d"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default PieCharts;
