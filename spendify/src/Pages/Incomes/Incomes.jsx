import React, { useEffect, useCallback, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import "../../global.less";
import "./style.less";
import IncomeForm from "../../components/IncomeForm/IncomeForm";
import EditIncomeForm from "../../components/IncomeForm/EditIncomeForm";
import { auth } from "../../firebase";
import {
  setIncomes,
  addIncome,
  deleteIncome,
  editIncome,
  setTotalItems,
  setCategories,
} from "../../redux/actions/incomeActions";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Search from "antd/es/transfer/search";

const Incomes = () => {
  const dispatch = useDispatch();
  const { incomes, totalItems, categories } = useSelector(
    (state) => state.income
  );
  const [allIncomes, setAllIncomes] = useState(incomes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const unsubscribeTotal = useRef(null);
  const unsubscribePaginated = useRef(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchPaginatedData();
      } else {
        message.error("User not authenticated");
      }
    });
    setAllIncomes(incomes);

    return () => {
      unsubscribeAuth();
      if (unsubscribeTotal.current) unsubscribeTotal.current();
      if (unsubscribePaginated.current) unsubscribePaginated.current();
    };
  }, []);

  const fetchPaginatedData = useCallback(
    (page = 1) => {
      const user = auth.currentUser.uid;
      const transactionsCollection = collection(
        db,
        `users/${user}/transactions`
      );

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

          unsubscribeTotal.current = onSnapshot(totalQuery, (snapshot) => {
            const totalTransactionsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              transactionDocId: doc.id,
              ...doc.data(),
            }));
            dispatch(setTotalItems(snapshot.size));
            dispatch(setIncomes(totalTransactionsData));
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

        unsubscribePaginated.current = onSnapshot(incomeQuery, (snapshot) => {
          const transactionsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            transactionDocId: doc.id,
            ...doc.data(),
          }));

          const lastDoc = snapshot.docs[snapshot.docs.length - 1];
          setLastVisible(lastDoc);

          dispatch(setIncomes(transactionsData));
          dispatch(setCategories(getUniqueCategories(transactionsData)));
          setAllIncomes(incomes);
        });
      } catch (error) {
        console.error("Error fetching paginated data:", error.message);
      }
    },
    [lastVisible, pageSize, dispatch]
  );

  const getUniqueCategories = (data) => {
    const categoryOptions = data
      .filter((item) => item.type === "income")
      .map((item) => ({
        id: item.id,
        value: item.category,
        label: item.category,
      }));
    return categoryOptions.filter(
      (item, index, self) =>
        self.findIndex((prevItem) => prevItem.value === item.value) === index
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchPaginatedData(page);
  };

  const deleteIncomeHandler = async (id) => {
    const user = auth.currentUser.uid;
    try {
      const incomeDocRef = doc(db, `users/${user}/transactions`, id);
      await deleteDoc(incomeDocRef);
      dispatch(deleteIncome(id));
      message.success("Item Deleted Successfully");
    } catch (error) {
      console.error("Error deleting income:", error.message);
    }
  };

  const handleEdit = (data) => {
    setSelectedIncome(data);
    setIsEditModalOpen(true);
  };

  const onSearch = (value) => {
    const searchQuery = value.target.value.trim().toLowerCase();
    if (!searchQuery) {
      dispatch(setIncomes(allIncomes.slice(0, pageSize)));
      return;
    }
    const filteredIncomes = allIncomes.filter((income) => {
      const incomeData = [
        income.name.toLowerCase(),
        income.type.toLowerCase(),
        income.amount.toString().toLowerCase(),
        income.category.toLowerCase(),
      ];
      return incomeData.some((data) => data.includes(searchQuery));
    });
    dispatch(setIncomes(filteredIncomes));
  };

  return (
    <section className="income-page-section">
      <div className="transaction-wrapper">
        <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
          <Space direction="vertical" style={{ padding: "0 0 1rem 0" }}>
            <Search placeholder="Search incomes" onChange={onSearch} />
          </Space>
        </ConfigProvider>
        <div className="transactions-heading flex justify-between item-center">
          <h3>Incomes</h3>
          <div className="flex justify-between item-center gap-4">
            <button className="import-csv" onClick={() => setIsModalOpen(true)}>
              Add Income
            </button>
          </div>
        </div>

        {/* Add Income Modal */}
        <Modal
          title="Add Income"
          footer={false}
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        >
          <IncomeForm closeModalOnSubmit={() => setIsModalOpen(false)} />
        </Modal>

        {/* Edit Income Modal */}
        <Modal
          title="Edit Income"
          footer={false}
          open={isEditModalOpen}
          onOk={() => setIsEditModalOpen(false)}
          onCancel={() => setIsEditModalOpen(false)}
        >
          <EditIncomeForm
            incomeData={selectedIncome}
            closeModalOnSubmit={() => setIsEditModalOpen(false)}
          />
        </Modal>

        <div className="table">
          <Table
            columns={[
              {
                key: "name",
                title: "Name",
                dataIndex: "name",
                sorter: (a, b) => a.name.localeCompare(b.name),
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
                render: (_, record) => (
                  <>
                    <EditOutlined
                      style={{ fontSize: "16px", cursor: "pointer" }}
                      onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                      title="Delete?"
                      onConfirm={() =>
                        deleteIncomeHandler(record.transactionDocId)
                      }
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
                ),
              },
            ]}
            dataSource={incomes}
            rowKey="id"
            pagination={{
              current: currentPage,
              pageSize,
              total: totalItems,
              onChange: handlePageChange,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Incomes;
