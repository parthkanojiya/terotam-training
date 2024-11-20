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
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
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
        filters: categories.map((cat) => ({
          text: cat.value,
          value: cat.value,
        })),
        onFilter: (value, record) => record.category === value,
      },
      {
        key: "date",
        title: "Date",
        dataIndex: "date",
        sorter: (a, b) => a.date.localeCompare(b.date),
        sortDirections: ["descend", "ascend"],
      },
      {
        key: "amount",
        title: "Amount",
        dataIndex: "amount",
        sorter: (a, b) => a.amount - b.amount,
        sortDirections: ["descend", "ascend"],
      },
    ];

    return (
      <section className="transactions-section">
        <div className="transaction-wrapper">
          <div className="transactions-heading flex justify-between item-center">
            <h3>Transactions</h3>

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
