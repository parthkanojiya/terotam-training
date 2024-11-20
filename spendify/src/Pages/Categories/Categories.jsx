import React, { Component } from "react";
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
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import { Modal, Space, Table, Tag, Empty, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./style.less";
import "../../global.less";
import EditCategoryForm from "../../components/CategoryForm/EditCategoryForm";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isEditModalOpen: false,
      categories: [],
      isEditing: false,
      selectedCategory: [],
    };
  }

  componentDidMount() {
    const categoriesCollection = collection(db, "categories");
    this.unsubscribe = onSnapshot(categoriesCollection, (snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        categoryDocId: doc.id,
        ...doc.data(),
      }));
      this.setState({ categories: categoriesData });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  toggleModal = (isOpen) => {
    this.setState({ isModalOpen: isOpen });
  };

  toggleEditModal = (isOpen) => {
    this.setState({
      isEditModalOpen: isOpen,
      selectedCategory: isOpen ? this.state.selectedCategory : null,
    });
  };

  deleteCategory = async (id) => {
    try {
      const categoryDocRef = doc(db, "categories", id);
      await deleteDoc(categoryDocRef);
      this.setState((prevState) => ({
        categories: prevState.categories.filter(
          (category) => category.id !== id
        ),
      }));
      message.success("Item Deleted Successfully");
    } catch (error) {
      console.error("Error deleting income:", error.message);
    }
  };

  handleEdit = (data) => {
    const { categoryDocId, name } = data;
    this.setState({
      selectedCategory: { ...data },
      isEditModalOpen: true,
    });
  };

  render() {
    const { isModalOpen, isEditModalOpen, categories, selectedCategory } =
      this.state;

    const columns = [
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
        align: "left",
      },
      {
        key: "action",
        title: "Action",
        dataIndex: "action",
        align: "right",
        render: (_, record) => {
          return (
            <>
              <EditOutlined
                style={{ fontSize: "16px", cursor: "pointer" }}
                onClick={() => this.handleEdit(record)}
              />
              <Popconfirm
                title="Delete the category"
                description="Are you sure to delete this item?"
                onConfirm={() => this.deleteCategory(record.categoryDocId)}
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
          <div className="transactions-heading flex justify-between item-center">
            <h3>Categories</h3>
            <div className="flex justify-between item-center gap-4">
              <button
                className="import-csv"
                onClick={() => this.toggleModal(true)}
              >
                Add Categories
              </button>
            </div>
          </div>

          <Modal
            title="Add Categories"
            footer={false}
            open={isModalOpen}
            onOk={() => this.toggleModal(false)}
            onCancel={() => this.toggleModal(false)}
            style={{ maxWidth: 400 }}
          >
            <CategoryForm closeModalOnSubmit={() => this.toggleModal(false)} />
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
            <EditCategoryForm
              categoryData={selectedCategory}
              closeModalOnSubmit={() => this.toggleEditModal(false)}
            />
          </Modal>

          <div className="table">
            <div className="table_component" role="region" tabIndex="0">
              {/* ANTD */}
              {categories.length === 0 ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Categories not found"
                />
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
