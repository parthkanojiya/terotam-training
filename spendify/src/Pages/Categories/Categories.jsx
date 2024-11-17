import React, { Component } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import { Modal, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./style.less";
import "../../global.less";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      categories: [],
      isEditing: false,
    };
  }

  componentDidMount() {
    const categoriesCollection = collection(db, "categories");
    this.unsubscribe = onSnapshot(categoriesCollection, (snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.setState({ categories: categoriesData });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  showModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModalOnSubmit = () => {
    this.setState({ isModalOpen: false });
  };

  handleOk = () => {
    this.setState({ isModalOpen: false });
  };

  handleCancel = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen, categories } = this.state;

    const columns = [
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
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
      <section className="income-page-section">
        <div className="transaction-wrapper">
          <div className="transactions-heading flex justify-between item-center">
            <h3>Categories</h3>
            <div className="flex justify-between item-center gap-4">
              <button className="import-csv" onClick={this.showModal}>
                Add Categories
              </button>
            </div>
          </div>

          <Modal
            title="Add Categories"
            footer={false}
            open={isModalOpen}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ maxWidth: 400 }}
          >
            <CategoryForm closeModalOnSubmit={this.closeModalOnSubmit} />
          </Modal>

          <div className="table">
            <div className="table_component" role="region" tabIndex="0">
              {/* ANTD */}
              {categories.length === 0 ? (
                <tr>
                  <td style={{ color: "#ff5435" }}>Categories not found</td>
                </tr>
              ) : (
                <Table columns={columns} dataSource={categories} rowKey="id" />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Categories;
