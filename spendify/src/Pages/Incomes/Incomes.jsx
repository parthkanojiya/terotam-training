import React, { Component } from "react";
import { Button, Modal, Select, Space, Table, Tag } from "antd";
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
} from "firebase/firestore";
import { db } from "../../firebase";

class Incomes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      incomes: [],
      allIncomes: [],
      categories: [],
      selectedCategory: "",
    };
  }

  componentDidMount() {
    const transactionsCollection = collection(db, "transactions");
    const incomeQuery = query(
      transactionsCollection,
      where("type", "==", "income")
    );

    this.unsubscribeIncomes = onSnapshot(incomeQuery, (snapshot) => {
      const transactionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.setState({
        incomes: transactionsData,
        allIncomes: transactionsData,
        categories: this.getUniqueCategories(transactionsData),
      });
    });
  }

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
    } catch (error) {
      console.error("Error deleting income:", error.message);
    }
  };

  render() {
    const { isModalOpen, incomes, categories, selectedCategory } = this.state;

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
        render: (_, record) => {
          return (
            <>
              <EditOutlined style={{ fontSize: "16px", cursor: "pointer" }} />
              <DeleteOutlined
                style={{
                  fontSize: "16px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
                onClick={() => this.deleteIncome(record.id)}
              />
            </>
          );
        },
      },
    ];

    return (
      <section className="income-page-section">
        <div className="transaction-wrapper">
          <div className="transactions-heading flex justify-between item-center">
            <h3>Incomes</h3>
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
                Add Income
              </button>
            </div>
          </div>

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

          <div className="table">
            <div className="table_component" role="region" tabIndex="0">
              {/* AntD table */}
              <Table columns={columns} dataSource={incomes} rowKey="id" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Incomes;
