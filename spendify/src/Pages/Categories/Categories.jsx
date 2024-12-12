import React, { Component } from "react";
import { Modal, Table, Empty, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import EditCategoryForm from "../../components/CategoryForm/EditCategoryForm";
import {
  setCategories,
  addCategory,
  deleteCategory,
  editCategory,
} from "../../redux/actions/categoryActions";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import "./style.less";

import { saveState, loadCategoryState } from "../../utils/localStorageUtils";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isEditModalOpen: false,
      selectedCategory: null,
    };
  }

  componentDidMount() {
    const persistedState = loadCategoryState();
    if (persistedState && persistedState.category) {
      this.props.setCategories(persistedState.category);
    }

    const userId = auth.currentUser?.uid;
    if (userId) {
      const categoriesCollection = collection(db, `users/${userId}/categories`);

      onSnapshot(categoriesCollection, (snapshot) => {
        const categoriesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          categoryDocId: doc.id,
          ...doc.data(),
        }));

        this.props.setCategories(categoriesData);

        saveState({ category: categoriesData });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categories !== this.props.categories) {
      this.props.setCategories(this.props.categories);
    }
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

  addCategory = (category) => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const categoriesCollection = collection(db, `users/${userId}/categories`);
      addDoc(categoriesCollection, category)
        .then((docRef) => {
          this.props.addCategory({ id: docRef.id, ...category });
          message.success("Category added successfully");
        })
        .catch((error) => {
          console.error("Error adding category:", error.message);
        });
    }
  };

  deleteCategory = (id) => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const categoryDocRef = doc(db, `users/${userId}/categories`, id);
      deleteDoc(categoryDocRef)
        .then(() => {
          this.props.deleteCategory(id);
          message.success("Category deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting category:", error.message);
        });
    }
  };

  handleEdit = (data) => {
    this.setState({
      selectedCategory: data,
      isEditModalOpen: true,
    });
    this.props.editCategory(data);
  };

  render() {
    const { isModalOpen, isEditModalOpen, selectedCategory } = this.state;
    const { categories } = this.props;

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
            // style={{ maxWidth: 400 }}
          >
            <CategoryForm
              closeModalOnSubmit={() => this.toggleModal(false)}
              addCategory={this.addCategory}
            />
          </Modal>

          <Modal
            title="Edit Category"
            footer={false}
            open={isEditModalOpen}
            onOk={() => this.toggleEditModal(false)}
            onCancel={() => this.toggleEditModal(false)}
            // style={{ maxWidth: 400 }}
          >
            <EditCategoryForm
              categoryData={selectedCategory}
              closeModalOnSubmit={() => this.toggleEditModal(false)}
            />
          </Modal>

          <div className="table">
            <div className="table_component" role="region" tabIndex="0">
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

const mapStateToProps = (state) => ({
  categories: state.category?.categories || [],
});

const mapDispatchToProps = {
  setCategories,
  addCategory,
  deleteCategory,
  editCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
