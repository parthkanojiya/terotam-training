import React, { Component } from "react";
import "../../global.less";
import "./style.less";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import EditExpenseForm from "../../components/ExpenseForm/EditExpenseForm";
import {
  Button,
  message,
  Popconfirm,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
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

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isEditModalOpen: false,
      expenses: [],
      allExpenses: [],
      categories: [],
      selectedCategory: "",
      selectedExpense: [],
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
        transactionDocId: doc.id,
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

  toggleEditModal = (isOpen) => {
    this.setState({
      isEditModalOpen: isOpen,
      selectedExpense: isOpen ? this.state.selectedExpense : null,
    });
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

  handleEdit = (data) => {
    const { transactionDocId, name, category, date, type, amount } = data;
    this.setState({
      selectedExpense: { ...data },
      isEditModalOpen: true,
    });
  };

  deleteExpense = async (id) => {
    try {
      const expenseDocRef = doc(db, "transactions", id);
      await deleteDoc(expenseDocRef);
      this.setState((prevState) => ({
        expenses: prevState.expenses.filter((expense) => expense.id !== id),
        allExpenses: prevState.allExpenses.filter(
          (expense) => expense.id !== id
        ),
      }));
      message.success("Item Deleted Successfully");
    } catch (error) {
      console.error("Error deleting income:", error.message);
    }
  };

  handleEdit = (data) => {
    const { transactionDocId, name, category, date, type, amount } = data;
    this.setState({
      selectedExpense: { ...data },
      isEditModalOpen: true,
    });
  };

  render() {
    const {
      isModalOpen,
      isEditModalOpen,
      expenses,
      categories,
      selectedCategory,
      selectedExpense,
    } = this.state;

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
      {
        key: "action",
        title: "Action",
        dataIndex: "action",
        render: (_, record) => {
          return (
            <>
              <EditOutlined
                style={{ fontSize: "16px", cursor: "pointer" }}
                onClick={() => this.handleEdit(record)}
              />
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this item?"
                onConfirm={() => this.deleteExpense(record.transactionDocId)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined
                  style={{
                    fontSize: "16px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                />
              </Popconfirm>
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
            <div className="flex justify-between item-center gap-4">
              <button
                className="import-csv"
                onClick={() => this.toggleModal(true)}
              >
                Add Expense
              </button>
            </div>
          </div>

          {/* Add Expense Modal */}

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

          {/* Edit Expense Modal */}
          <Modal
            title="Edit Expense"
            footer={false}
            open={isEditModalOpen}
            onOk={() => this.toggleEditModal(false)}
            onCancel={() => this.toggleEditModal(false)}
            style={{ maxWidth: 400 }}
          >
            <EditExpenseForm
              expenseData={selectedExpense}
              closeModalOnSubmit={() => this.toggleEditModal(false)}
            />
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
