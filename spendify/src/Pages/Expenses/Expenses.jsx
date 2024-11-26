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
  ConfigProvider,
  theme,
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
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase";
import Search from "antd/es/transfer/search";

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isEditModalOpen: false,
      expenses: [],
      allExpenses: [],
      allExpenseDatas: [],
      categories: [],
      selectedCategory: "",
      selectedExpense: [],
      currentPage: 1,
      pageSize: 10,
      lastVisible: null,
      totalItems: 0,
      searchQuery: "",
    };
  }

  componentDidMount() {
    this.fetchPaginatedData();
  }

  fetchPaginatedData = async (page = 1) => {
    const { pageSize, lastVisible } = this.state;
    const transactionsCollection = collection(db, "transactions");

    try {
      let expenseQuery;

      if (page === 1) {
        expenseQuery = query(
          transactionsCollection,
          where("type", "==", "expense"),
          orderBy("date", "desc"),
          limit(pageSize)
        );

        const totalQuery = query(
          transactionsCollection,
          where("type", "==", "expense")
        );
        const totalSnapshot = await getDocs(totalQuery);
        const totalTransactionsData = totalSnapshot.docs.map((doc) => ({
          id: doc.id,
          transactionDocId: doc.id,
          ...doc.data(),
        }));
        this.setState({
          totalItems: totalSnapshot.size,
          allExpenseDatas: totalTransactionsData,
        });
      } else {
        expenseQuery = query(
          transactionsCollection,
          where("type", "==", "expense"),
          orderBy("date", "desc"),
          startAfter(lastVisible),
          limit(pageSize)
        );
      }

      const expenseSnapshot = await getDocs(expenseQuery);

      const transactionsData = expenseSnapshot.docs.map((doc) => ({
        id: doc.id,
        transactionDocId: doc.id,
        ...doc.data(),
      }));

      const lastDoc = expenseSnapshot.docs[expenseSnapshot.docs.length - 1];

      this.setState((prevState) => ({
        expenses:
          page === 1
            ? transactionsData
            : [...prevState.expenses, ...transactionsData],
        allExpenses: transactionsData,
        lastVisible: lastDoc,
        currentPage: page,
        categories: this.getUniqueCategories(transactionsData),
      }));
    } catch (error) {
      console.error("Error fetching paginated data:", error.message);
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      this.fetchPaginatedData(page);
    });
  };

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

  onSearch = (value) => {
    const { allExpenseDatas, pageSize } = this.state;
    const searchQuery = value.target.value.trim().toLowerCase();

    if (!searchQuery) {
      this.setState({
        expenses: allExpenseDatas.slice(0, pageSize),
        currentPage: 1,
        totalItems: allExpenseDatas.length,
      });
      return;
    }

    const filteredExpenses = allExpenseDatas.filter((expense) => {
      const expenseData = [
        expense.name.toLowerCase(),
        expense.type.toLowerCase(),
        expense.amount.toString().toLowerCase(),
        expense.category.toLowerCase(),
      ];
      return expenseData.some((data) => data.includes(searchQuery));
    });

    this.setState({
      expenses: filteredExpenses,
      currentPage: 1,
      totalItems: filteredExpenses.length,
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
      currentPage,
      pageSize,
      totalItems,
      searchQuery,
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
          <ConfigProvider
            theme={{
              algorithm: theme.defaultAlgorithm,
            }}
          >
            <Space direction="vertical" style={{ padding: "0 0 1rem 0" }}>
              <Search placeholder="Search expenses" onChange={this.onSearch} />
            </Space>
          </ConfigProvider>
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
              <Table
                columns={columns}
                dataSource={expenses}
                rowKey="id"
                pagination={
                  searchQuery
                    ? false
                    : {
                        current: currentPage,
                        pageSize,
                        total: totalItems,
                        onChange: this.handlePageChange,
                      }
                }
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Expenses;
