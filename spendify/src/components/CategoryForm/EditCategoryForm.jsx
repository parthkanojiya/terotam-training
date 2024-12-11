import React, { Component, createRef } from "react";
import "../../global.less";
import "./style.less";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { Form, Input, message } from "antd";
import { connect } from "react-redux";
import {
  addCategory,
  updateCategory,
} from "../../redux/actions/categoryActions";

class EditCategoryForm extends Component {
  constructor(props) {
    super(props);

    this.formRef = createRef();
  }

  componentDidMount() {
    this.setInitialFormValues();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categoryData !== this.props.categoryData) {
      this.setInitialFormValues();
    }
  }

  setInitialFormValues = () => {
    const { categoryData } = this.props;

    if (categoryData && this.formRef.current) {
      this.formRef.current?.setFieldsValue({
        name: categoryData.name,
      });
    }
  };

  onFinish = async (values) => {
    const { categoryData, closeModalOnSubmit, addCategory, updateCategory } =
      this.props;
    const user = auth.currentUser.uid;

    const categoryName = { ...values };

    try {
      if (categoryData?.categoryDocId) {
        const docRef = doc(
          db,
          `users/${user}/categories`,
          categoryData.categoryDocId
        );
        await updateDoc(docRef, categoryName);
        updateCategory({ ...categoryData, ...categoryName });
        message.success("Category updated successfully!");
      } else {
        const id = crypto.randomUUID();
        const data = { ...categoryName, id };
        await addDoc(collection(db, `users/${user}/categories`), data);
        addCategory(data);
        message.success("Category added successfully!");
      }
    } catch (error) {
      console.error("Error updating/adding document: ", error);
      message.error("Failed to update/add category.");
    }

    this.formRef.current?.resetFields();
    if (closeModalOnSubmit) closeModalOnSubmit();
  };

  onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  render() {
    return (
      <Form
        ref={this.formRef}
        name="editCategoryForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 32 }}
        style={{ maxWidth: 600, margin: "1rem 0" }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input placeholder="Enter name" style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = {
  addCategory,
  updateCategory,
};

export default connect(null, mapDispatchToProps)(EditCategoryForm);
