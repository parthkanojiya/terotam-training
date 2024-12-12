import React, { useState, useEffect, useCallback, useRef } from "react";
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
import "../../global.less";
import "./style.less";
import { db, auth } from "../../firebase";
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
import { useDispatch, useSelector } from "react-redux";
import {
  setTransactions,
  setCategories,
  setSelectedCategory,
} from "../../redux/actions/transactionsActions";

const TransactionsList = () => {
  const dispatch = useDispatch();
  const { transactions, categories, selectedCategory } = useSelector(
    (state) => state.transactions
  );
  const [allTransactions, setAllTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState(null);
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);
  const lastVisibleDocRef = useRef(null);

  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        console.error("User is not authenticated.");
      }
    });

    return () => {
      if (authUnsubscribe) authUnsubscribe();
    };
  }, []);

  const fetchPaginatedData = useCallback(
    async (page = 1) => {
      if (!userId) {
        console.error("No authenticated user found.");
        return;
      }

      const transactionsCollection = collection(
        db,
        `users/${userId}/transactions`
      );
      let transactionQuery;

      if (page === 1) {
        transactionQuery = query(
          transactionsCollection,
          orderBy("date", "desc"),
          limit(10)
        );

        const totalQuery = query(transactionsCollection);
        const totalSnapshot = await getDocs(totalQuery);
        setTotalItems(totalSnapshot.size);
      } else {
        transactionQuery = query(
          transactionsCollection,
          orderBy("date", "desc"),
          startAfter(lastVisibleDoc),
          limit(10)
        );
      }

      const snapshot = await getDocs(transactionQuery);
      const transactionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (snapshot.docs.length > 0) {
        lastVisibleDocRef.current = snapshot.docs[snapshot.docs.length - 1];
      }
      setAllTransactions((prev) =>
        page === 1 ? transactionsData : [...prev, ...transactionsData]
      );
      dispatch(setTransactions(transactionsData));
      setCurrentPage(page);
      updateCategories(transactionsData);
    },
    [userId, lastVisibleDoc, dispatch]
  );

  useEffect(() => {
    if (userId) {
      fetchPaginatedData();
    }
  }, [userId, fetchPaginatedData]);

  const updateCategories = (transactionsData) => {
    const uniqueCategories = [
      ...new Set(transactionsData.map((item) => item.category)),
    ].map((category) => ({ value: category, label: category }));

    dispatch(setCategories(uniqueCategories));
  };

  const handlePageChange = (page) => {
    fetchPaginatedData(page);
  };

  const handleCategoryChange = (value) => {
    dispatch(setSelectedCategory(value));
    if (value) {
      const filteredTransactions = transactions.filter(
        (item) => item.category === value
      );
      dispatch(setTransactions(filteredTransactions));
    } else {
      dispatch(setTransactions(transactions));
    }
  };

  const onSearch = (value) => {
    const searchQuery = value.trim().toLowerCase();
    setSearchQuery(searchQuery);

    if (!searchQuery) {
      dispatch(setTransactions(allTransactions));
      setTotalItems(allTransactions.length);
      setCurrentPage(1);
      return;
    }

    const filteredTransactions = allTransactions.filter((transaction) => {
      return (
        transaction.name.toLowerCase().includes(searchQuery) ||
        transaction.type.toLowerCase().includes(searchQuery) ||
        transaction.amount.toString().toLowerCase().includes(searchQuery) ||
        transaction.category.toLowerCase().includes(searchQuery)
      );
    });

    dispatch(setTransactions(filteredTransactions));
    setTotalItems(filteredTransactions.length);
    setCurrentPage(1);
  };

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
              onChange={(e) => onSearch(e.target.value)}
            />
          </Space>
        </ConfigProvider>

        <div className="transactions-heading flex justify-between item-center">
          <h3>Transactions</h3>
        </div>

        <div className="table">
          <Table
            columns={columns}
            dataSource={transactions}
            rowKey="id"
            pagination={
              searchQuery
                ? false
                : {
                    current: currentPage,
                    pageSize: 10,
                    total: totalItems,
                    onChange: handlePageChange,
                  }
            }
            scroll={{ x: "max-content" }}
            responsive
          />
        </div>
      </div>
    </section>
  );
};

export default TransactionsList;
