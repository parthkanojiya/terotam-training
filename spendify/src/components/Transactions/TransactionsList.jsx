import React, { Component } from "react";
import "./style.less";
import "../../global.less";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Button, Modal, Select, Space, Table, Tag } from "antd";

class TransactionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      allTransactions: [],
      categories: [],
      selectedCategory: "",
    };
  }

  // componentDidMount() {
  //   const incomesCollection = collection(db, "incomes");
  //   this.incomesUnsubscribe = onSnapshot(incomesCollection, (snapshot) => {
  //     const incomesData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       type: "Income",
  //       ...doc.data(),
  //     }));
  //     this.setState(
  //       (prevState) => ({
  //         transactions: [...prevState.transactions, ...incomesData],
  //         allTransactions: [...prevState.transactions, ...incomesData],
  //       }),
  //       this.updateCategories
  //     );
  //   });

  //   const expensesCollection = collection(db, "expenses");
  //   this.expensesUnsubscribe = onSnapshot(expensesCollection, (snapshot) => {
  //     const expensesData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       type: "Expense",
  //       ...doc.data(),
  //     }));
  //     this.setState(
  //       (prevState) => ({
  //         transactions: [...prevState.transactions, ...expensesData],
  //         allTransactions: [...prevState.transactions, ...expensesData],
  //       }),
  //       this.updateCategories
  //     );
  //   });
  // }

  // componentWillUnmount() {
  //   if (this.incomesUnsubscribe) this.incomesUnsubscribe();
  //   if (this.expensesUnsubscribe) this.expensesUnsubscribe();
  // }

  // updateCategories = () => {
  //   const uniqueCategories = this.state.allTransactions
  //     .map((item) => item.category)
  //     .filter((value, index, self) => self.indexOf(value) === index)
  //     .map((category) => ({ value: category, label: category }));
  //   this.setState({ categories: uniqueCategories });
  // };

  // handleCategoryChange = (value) => {
  //   this.setState({ selectedCategory: value });
  //   if (value) {
  //     const filteredTransactions = this.state.allTransactions.filter(
  //       (item) => item.category === value
  //     );
  //     this.setState({ transactions: filteredTransactions });
  //   } else {
  //     this.setState({ transactions: this.state.allTransactions });
  //   }
  // };

  componentDidMount() {
    const transactionsCollection = collection(db, "transactions");
    this.incomesUnsubscribe = onSnapshot(transactionsCollection, (snapshot) => {
      const transactionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.setState(
        (prevState) => ({
          transactions: [...prevState.transactions, ...transactionsData],
          allTransactions: [...prevState.transactions, ...transactionsData],
        }),
        this.updateCategories
      );
    });

    // const expensesCollection = collection(db, "expenses");
    // this.expensesUnsubscribe = onSnapshot(expensesCollection, (snapshot) => {
    //   const expensesData = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     type: "Expense",
    //     ...doc.data(),
    //   }));
    //   this.setState(
    //     (prevState) => ({
    //       transactions: [...prevState.transactions, ...expensesData],
    //       allTransactions: [...prevState.transactions, ...expensesData],
    //     }),
    //     this.updateCategories
    //   );
    // });
  }

  componentWillUnmount() {
    if (this.incomesUnsubscribe) this.incomesUnsubscribe();
    if (this.expensesUnsubscribe) this.expensesUnsubscribe();
  }

  updateCategories = () => {
    const uniqueCategories = this.state.transactions
      .map((item) => item.category)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((category) => ({ value: category, label: category }));
    this.setState({ categories: uniqueCategories });
  };

  handleCategoryChange = (value) => {
    this.setState({ selectedCategory: value });
    if (value) {
      const filteredTransactions = this.state.allTransactions.filter(
        (item) => item.category === value
      );
      this.setState({ transactions: filteredTransactions });
    } else {
      this.setState({ transactions: this.state.allTransactions });
    }
  };

  render() {
    const { transactions, categories, selectedCategory } = this.state;

    const columns = [
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
      },
      {
        key: "type",
        title: "Type",
        dataIndex: "type",
      },
      {
        key: "category",
        title: "Category",
        dataIndex: "category",
      },
      {
        key: "date",
        title: "Date",
        dataIndex: "date",
      },
      {
        key: "amount",
        title: "Amount",
        dataIndex: "amount",
      },
    ];

    return (
      <section className="transactions-section">
        <div className="transaction-wrapper">
          <div className="transactions-heading flex justify-between item-center">
            <h3>Transactions</h3>
            <ul className="flex justify-between item-center gap-2">
              <li>
                <button disabled>No Sort</button>
              </li>
              <li>
                <button disabled>Sort by Date</button>
              </li>
              <li>
                <button disabled>Sort by Amount</button>
              </li>
              <Space wrap>
                <Select
                  value={selectedCategory || null}
                  onChange={this.handleCategoryChange}
                  allowClear
                  placeholder="Select category"
                  options={categories}
                />
              </Space>
            </ul>
            <div className="flex justify-between item-center gap-4">
              <button className="export-csv" disabled title="Export to CSV">
                Export to CSV
              </button>
              <button className="import-csv" disabled title="Import from CSV">
                Import from CSV
              </button>
            </div>
          </div>

          <div className="table">
            <div className="table_component" role="region" tabIndex="0">
              <Table columns={columns} dataSource={transactions} rowKey="id" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TransactionsList;
