import React, { PureComponent } from "react";
import "./style.less";
import "../../global.less";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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
import { Empty } from "antd";

class FinanceChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
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

        this.transactionsUnsubscribe = onSnapshot(
          transactionsCollection,
          (snapshot) => {
            const transactionsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            /* Filtered for Chart data */
            const outputData = transactionsData.reduce((acc, item) => {
              const year = item.date.split("/").pop();

              let yearEntry = acc.find((entry) => entry.name === year);
              if (!yearEntry) {
                yearEntry = { name: year, income: [], expense: [] };
                acc.push(yearEntry);
              }

              if (item.type === "income") {
                yearEntry.income.push(item.amount);
              } else if (item.type === "expense") {
                yearEntry.expense.push(item.amount);
              }

              return acc;
            }, []);

            const formattedOutput = outputData.flatMap((entry) => {
              const results = [];
              const maxLength = Math.max(
                entry.income.length,
                entry.expense.length
              );

              for (let i = 0; i < maxLength; i++) {
                results.push({
                  name: entry.name,
                  income: entry.income[i] || 0,
                  expense: entry.expense[i] || 0,
                });
              }

              return results;
            });

            this.setState({
              transactions: formattedOutput,
            });
          }
        );
      } else {
        console.error("User is not authenticated.");
      }
    });
  }

  componentWillUnmount() {
    if (this.transactionsUnsubscribe) this.transactionsUnsubscribe();
    if (this.authUnsubscribe) this.authUnsubscribe();
  }

  render() {
    return this.state.transactions.length === 0 ? (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Transactions Data not found"
        className="barchart"
      />
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={this.state.transactions}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="income"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            dataKey="expense"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default FinanceChart;
