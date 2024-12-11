import React, { useEffect, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  message,
  Popconfirm,
  Modal,
  Table,
  Space,
  Input,
  ConfigProvider,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  setExpenses,
  addExpense,
  deleteExpense,
  editExpense,
  setTotalItems,
  setCategories,
} from "../../redux/actions/expenseActions";
import "../../global.less";
import "./style.less";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import EditExpenseForm from "../../components/ExpenseForm/EditExpenseForm";
import Search from "antd/es/transfer/search";

const Expenses = () => {
  const dispatch = useDispatch();
  const { expenses, totalItems, categories } = useSelector(
    (state) => state.expenses
  );

  const [allExpenses, setAllExpenses] = useState(expenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [user, setUser] = useState(null);

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

    return () => {
      unsubscribeAuth();
      if (unsubscribeTotal.current) unsubscribeTotal.current();
      if (unsubscribePaginated.current) unsubscribePaginated.current();
    };
  }, []);

  const fetchPaginatedData = useCallback(
    async (page = 1) => {
      const user = auth.currentUser.uid;
      const transactionsCollection = collection(
        db,
        `users/${user}/transactions`
      );

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

          unsubscribeTotal.current = onSnapshot(totalQuery, (snapshot) => {
            const totalTransactionsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              transactionDocId: doc.id,
              ...doc.data(),
            }));
            dispatch(setTotalItems(snapshot.size));
            dispatch(setTotalItems(totalTransactionsData));
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

        unsubscribePaginated.current = onSnapshot(expenseQuery, (snapshot) => {
          const transactionsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            transactionDocId: doc.id,
            ...doc.data(),
          }));

          const lastDoc = snapshot.docs[snapshot.docs.length - 1];

          setExpenses(
            page === 1 ? transactionsData : [...expenses, ...transactionsData]
          );
          setLastVisible(lastDoc);
          dispatch(setExpenses(transactionsData));
          dispatch(setCategories(getUniqueCategories(transactionsData)));
          setAllExpenses(expenses);
          setCurrentPage(page);
        });
      } catch (error) {
        console.error("Error fetching paginated data:", error.message);
      }
    },
    [pageSize, lastVisible, dispatch]
  );

  const getUniqueCategories = (data) => {
    const categoryOptions = data
      .filter((item) => item.type === "expense")
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
      dispatch(deleteExpense(id));
      message.success("Item Deleted Successfully");
    } catch (error) {
      console.error("Error deleting income:", error.message);
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setIsEditModalOpen(true);
  };

  const onSearch = (value) => {
    const searchQuery = value.target.value.trim().toLowerCase();

    if (!searchQuery) {
      dispatch(setExpenses(allExpenses.slice(0, pageSize)));
      return;
    }

    const filteredExpenses = allExpenses.filter((expense) => {
      const expenseData = [
        expense.name.toLowerCase(),
        expense.type.toLowerCase(),
        expense.amount.toString().toLowerCase(),
        expense.category.toLowerCase(),
      ];
      return expenseData.some((data) => data.includes(searchQuery));
    });
    dispatch(setExpenses(filteredIncomes));
  };

  const toggleModal = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  return (
    <section className="expenses-page-section">
      <div className="transaction-wrapper">
        <Space direction="vertical" style={{ padding: "0 0 1rem 0" }}>
          <Search placeholder="Search expenses" onChange={onSearch} />
        </Space>

        <div className="transactions-heading flex justify-between item-center">
          <h3>Expenses</h3>
          <Button
            type="primary"
            onClick={() => toggleModal(true)}
            style={{ marginBottom: 20 }}
          >
            Add Expense
          </Button>
        </div>

        <Modal
          title="Add Expense"
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          style={{ maxWidth: 400 }}
        >
          <ExpenseForm closeModalOnSubmit={() => setIsModalOpen(false)} />
        </Modal>

        <Modal
          title="Edit Expense"
          open={isEditModalOpen}
          onOk={() => setIsEditModalOpen(false)}
          onCancel={() => setIsEditModalOpen(false)}
          footer={null}
          style={{ maxWidth: 400 }}
        >
          <EditExpenseForm
            expenseData={selectedExpense}
            closeModalOnSubmit={() => setIsEditModalOpen(false)}
          />
        </Modal>

        <div className="table">
          <div className="table_component" role="region" tabIndex="0">
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
              rowKey="transactionDocId"
              dataSource={expenses}
              pagination={{
                current: currentPage,
                pageSize,
                total: totalItems,
                onChange: handlePageChange,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expenses;
