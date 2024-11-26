import React, { Component } from "react";
import "./style.less";
import "../../global.less";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  Button,
  ConfigProvider,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  theme,
} from "antd";
import Search from "antd/es/transfer/search";

class TransactionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      allTransactions: [],
      allTransactionDatas: [],
      categories: [],
      selectedCategory: "",
      currentPage: 1,
      pageSize: 10,
      // lastVisible: null,
      lastVisibleDocs: [],
      totalItems: 0,
      searchQuery: "",
    };
  }

  componentDidMount() {
    this.fetchPaginatedData(1);
  }

  fetchPaginatedData = async (page) => {
    const { pageSize, lastVisibleDocs } = this.state;
    const transactionsCollection = collection(db, "transactions");

    try {
      let transactionQuery;

      if (page === 1) {
        transactionQuery = query(
          transactionsCollection,
          orderBy("date", "desc"),
          limit(pageSize)
        );

        const totalSnapshot = await getDocs(transactionsCollection);
        const totalTransactionsData = totalSnapshot.docs.map((doc) => ({
          id: doc.id,
          transactionDocId: doc.id,
          ...doc.data(),
        }));
        this.setState({
          totalItems: totalSnapshot.size,
          allTransactions: totalTransactionsData,
          allTransactionDatas: totalTransactionsData,
        });
      } else {
        const lastVisible = lastVisibleDocs[page - 2];
        transactionQuery = query(
          transactionsCollection,
          orderBy("date", "desc"),
          startAfter(lastVisible),
          limit(pageSize)
        );
      }

      const transactionSnapshot = await getDocs(transactionQuery);
      const transactionsData = transactionSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const lastDoc =
        transactionSnapshot.docs[transactionSnapshot.docs.length - 1];

      this.setState((prevState) => {
        const updatedLastVisibleDocs = [...prevState.lastVisibleDocs];
        if (page > updatedLastVisibleDocs.length) {
          updatedLastVisibleDocs.push(lastDoc);
        }

        return {
          transactions: transactionsData,
          currentPage: page,
          lastVisibleDocs: updatedLastVisibleDocs,
        };
      }, this.updateCategories);
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

  onSearch = (value) => {
    const { allTransactionDatas, pageSize, lastVisible } = this.state;
    const searchQuery = value.target.value.trim().toLowerCase();

    if (!searchQuery) {
      this.setState((prevState) => ({
        transactions: prevState.allTransactions,
        currentPage: 1,
        totalItems: prevState.allTransactions.length,
        searchQuery: "",
      }));
      return;
    }

    const filteredTransactions = allTransactionDatas.filter((transaction) => {
      const transactionData = [
        transaction.name.toLowerCase(),
        transaction.type.toLowerCase(),
        transaction.amount.toString().toLowerCase(),
        transaction.category.toLowerCase(),
      ];
      return transactionData.some((data) => data.includes(searchQuery));
    });

    this.setState({
      transactions: filteredTransactions,
      currentPage: 1,
      totalItems: filteredTransactions.length,
      searchQuery,
    });
  };

  render() {
    const {
      transactions,
      allTransactions,
      categories,
      selectedCategory,
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
    ];

    return (
      <section className="transactions-section">
        <div className="transaction-wrapper">
          <ConfigProvider
            theme={{
              algorithm: theme.defaultAlgorithm,
            }}
          >
            <Space direction="vertical" style={{ padding: "0 0 1rem 0" }}>
              <Search
                placeholder="Search transactions"
                onChange={this.onSearch}
              />
            </Space>
          </ConfigProvider>
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
              <Table
                columns={columns}
                dataSource={transactions}
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

export default TransactionsList;
