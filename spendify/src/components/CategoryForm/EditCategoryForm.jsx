import React, { Component, createRef } from "react";
import "../../global.less";
import "./style.less";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  Button,
  Input,
  Select,
  DatePicker,
  Form,
  InputNumber,
  message,
} from "antd";

class EditCategoryForm extends Component {
  constructor(props) {
    super(props);

    this.formRef = createRef();

    this.state = {
      categories: [],
      name: props.categoryData?.name || "",
    };

    this.formRef.current?.setFieldsValue(initialValues);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categoryData !== this.props.categoryData) {
      this.setInitialFormValues();
    }
  }

  setInitialFormValues = () => {
    const { categoryData } = this.props;

    const initialValues = {
      name: categoryData?.name || "",
    };

    this.formRef.current?.setFieldsValue(initialValues);
  };

  onFinish = async (values) => {
    const { categoryData, closeModalOnSubmit } = this.props;

    const categoryName = { ...values };

    try {
      if (categoryData?.id) {
        const docRef = doc(db, "categories", categoryData.categoryDocId);
        await updateDoc(docRef, categoryName);
        message.success("Category updated successfully!");
      } else {
        const id = crypto.randomUUID();
        const data = { ...categoryName, id };
        await addDoc(collection(db, "categories"), data);
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
    const { categories } = this.state;

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

export default EditCategoryForm;
