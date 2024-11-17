import React, { Component } from "react";
import "../../global.less";
import "./style.less";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import { Button, Modal, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      expenses: [],
      allExpenses: [],
      categories: [],
      selectedCategory: "",
    };
  }

  componentDidMount() {
    const transactionsCollection = collection(db, "transactions");
    const expenseQuery = query(
      transactionsCollection,
      where("type", "==", "expense")
    );

    this.unsubscribe = onSnapshot(expenseQuery, (snapshot) => {
      const transactionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.setState({
        expenses: transactionsData,
        allExpenses: transactionsData,
        categories: this.getUniqueCategories(transactionsData),
      });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
    if (this.unsubscribeCategories) this.unsubscribeCategories();
  }

  toggleModal = (isOpen) => {
    this.setState({ isModalOpen: isOpen });
  };

  getUniqueCategories = (data) => {
    const categoryOptions = data
      .filter((item) => item.type === "expense")
      .map((item) => ({
        id: item.id,
        value: item.category,
        lable: item.category,
      }));

    return categoryOptions.filter(
      (item, index, self) =>
        self.findIndex((prevItem) => prevItem.value === item.value) === index
    );
  };

  handleCategoryChange = (value) => {
    this.setState({ selectedCategory: value });

    if (value) {
      const filteredExpenseItems = this.state.allExpenses.filter(
        (item) => item.category === value
      );
      this.setState({ expenses: filteredExpenseItems });
    } else {
      this.setState({ expenses: this.state.allExpenses });
    }
  };

  render() {
    const { isModalOpen, expenses, categories, selectedCategory } = this.state;

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
      {
        key: "action",
        title: "Action",
        dataIndex: "action",
        render: (record) => {
          return (
            <>
              <EditOutlined style={{ fontSize: "16px", cursor: "pointer" }} />
              <DeleteOutlined
                style={{
                  fontSize: "16px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              />
            </>
          );
        },
      },
    ];

    return (
      <section className="expenses-page-section">
        <div className="transaction-wrapper">
          <div className="transactions-heading flex justify-between item-center">
            <h3>Expenses</h3>
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
                  disabled={categories.length === 0}
                />
              </Space>
            </ul>
            <div className="flex justify-between item-center gap-4">
              <button
                className="import-csv"
                onClick={() => this.toggleModal(true)}
              >
                Add Expense
              </button>
            </div>
          </div>

          <Modal
            title="Add Expense"
            footer={false}
            open={isModalOpen}
            onOk={() => this.toggleModal(false)}
            onCancel={() => this.toggleModal(false)}
            style={{ maxWidth: 400 }}
          >
            <ExpenseForm closeModalOnSubmit={() => this.toggleModal(false)} />
          </Modal>

          <div className="table">
            <div className="table_component" role="region" tabIndex="0">
              <Table columns={columns} dataSource={expenses} rowKey="id" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Expenses;
