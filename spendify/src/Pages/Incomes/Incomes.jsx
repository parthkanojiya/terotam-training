import React, { Component } from "react";
import {
  Button,
  message,
  Popconfirm,
  Modal,
  Select,
  Space,
  Table,
  Input,
  Tag,
  ConfigProvider,
  theme,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../global.less";
import "./style.less";
import IncomeForm from "../../components/IncomeForm/IncomeForm";
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
import EditIncomeForm from "../../components/IncomeForm/EditIncomeForm";
import Search from "antd/es/transfer/search";

class Incomes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isEditModalOpen: false,
      incomes: [],
      allIncomes: [],
      allIncomeDatas: [],
      categories: [],
      selectedCategory: "",
      selectedIncome: [],
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
      let incomeQuery;

      if (page === 1) {
        incomeQuery = query(
          transactionsCollection,
          where("type", "==", "income"),
          orderBy("date", "desc"),
          limit(pageSize)
        );

        const totalQuery = query(
          transactionsCollection,
          where("type", "==", "income")
        );
        const totalSnapshot = await getDocs(totalQuery);
        const totalTransactionsData = totalSnapshot.docs.map((doc) => ({
          id: doc.id,
          transactionDocId: doc.id,
          ...doc.data(),
        }));
        this.setState({
          totalItems: totalSnapshot.size,
          allIncomeDatas: totalTransactionsData,
        });
      } else {
        incomeQuery = query(
          transactionsCollection,
          where("type", "==", "income"),
          orderBy("date", "desc"),
          startAfter(lastVisible),
          limit(pageSize)
        );
      }

      const incomeSnapshot = await getDocs(incomeQuery);

      const transactionsData = incomeSnapshot.docs.map((doc) => ({
        id: doc.id,
        transactionDocId: doc.id,
        ...doc.data(),
      }));

      const lastDoc = incomeSnapshot.docs[incomeSnapshot.docs.length - 1];

      this.setState((prevState) => ({
        incomes:
          page === 1
            ? transactionsData
            : [...prevState.incomes, ...transactionsData],
        allIncomes: transactionsData,
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
    if (this.unsubscribeIncomes) this.unsubscribeIncomes();
  }

  getUniqueCategories = (data) => {
    const categoryOptions = data
      .filter((item) => item.type === "income")
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

  toggleModal = (isOpen) => {
    this.setState({ isModalOpen: isOpen });
  };

  toggleEditModal = (isOpen) => {
    this.setState({
      isEditModalOpen: isOpen,
      selectedIncome: isOpen ? this.state.selectedIncome : null,
    });
  };

  handleCategoryChange = (value) => {
    this.setState({ selectedCategory: value });

    if (value) {
      const filteredIncomeItems = this.state.allIncomes.filter(
        (item) => item.category === value
      );
      this.setState({ incomes: filteredIncomeItems });
    } else {
      this.setState({ incomes: this.state.allIncomes });
    }
  };

  deleteIncome = async (id) => {
    try {
      const incomeDocRef = doc(db, "transactions", id);
      await deleteDoc(incomeDocRef);
      this.setState((prevState) => ({
        incomes: prevState.incomes.filter((income) => income.id !== id),
        allIncomes: prevState.allIncomes.filter((income) => income.id !== id),
      }));
      message.success("Item Deleted Successfully");
    } catch (error) {
      console.error("Error deleting income:", error.message);
    }
  };

  handleEdit = (data) => {
    const { transactionDocId, name, category, date, type, amount } = data;
    this.setState({
      selectedIncome: { ...data },
      isEditModalOpen: true,
    });
  };

  onSearch = (value) => {
    const { allIncomeDatas, pageSize } = this.state;
    const searchQuery = value.target.value.trim().toLowerCase();

    if (!searchQuery) {
      this.setState({
        incomes: allIncomeDatas.slice(0, pageSize),
        currentPage: 1,
        totalItems: allIncomeDatas.length,
      });
      return;
    }

    const filteredIncomes = allIncomeDatas.filter((income) => {
      const incomeData = [
        income.name.toLowerCase(),
        income.type.toLowerCase(),
        income.amount.toString().toLowerCase(),
        income.category.toLowerCase(),
      ];
      return incomeData.some((data) => data.includes(searchQuery));
    });

    this.setState({
      incomes: filteredIncomes,
      currentPage: 1,
      totalItems: filteredIncomes.length,
    });
  };

  render() {
    const {
      isModalOpen,
      isEditModalOpen,
      incomes,
      categories,
      selectedCategory,
      selectedIncome,
      currentPage,
      pageSize,
      totalItems,
      allIncomeDatas,
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
                onConfirm={() => this.deleteIncome(record.transactionDocId)}
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
      <section className="income-page-section">
        <div className="transaction-wrapper">
          <ConfigProvider
            theme={{
              algorithm: theme.defaultAlgorithm,
            }}
          >
            <Space direction="vertical" style={{ padding: "0 0 1rem 0" }}>
              <Search placeholder="Search incomes" onChange={this.onSearch} />
            </Space>
          </ConfigProvider>
          <div className="transactions-heading flex justify-between item-center">
            <h3>Incomes</h3>
            <div className="flex justify-between item-center gap-4">
              <button
                className="import-csv"
                onClick={() => this.toggleModal(true)}
              >
                Add Income
              </button>
            </div>
          </div>

          {/* Add Income Modal */}
          <Modal
            title="Add Income"
            footer={false}
            open={isModalOpen}
            onOk={() => this.toggleModal(false)}
            onCancel={() => this.toggleModal(false)}
            style={{ maxWidth: 400 }}
          >
            <IncomeForm closeModalOnSubmit={() => this.toggleModal(false)} />
          </Modal>

          {/* Edit Income Modal */}
          <Modal
            title="Edit Income"
            footer={false}
            open={isEditModalOpen}
            onOk={() => this.toggleEditModal(false)}
            onCancel={() => this.toggleEditModal(false)}
            style={{ maxWidth: 400 }}
          >
            <EditIncomeForm
              incomeData={selectedIncome}
              closeModalOnSubmit={() => this.toggleEditModal(false)}
            />
          </Modal>

          <div className="table">
            <div className="table_component" role="region" tabIndex="0">
              {/* AntD table */}
              <Table
                columns={columns}
                dataSource={incomes}
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

export default Incomes;
