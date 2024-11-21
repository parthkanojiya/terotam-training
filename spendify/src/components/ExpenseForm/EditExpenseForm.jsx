import React, { Component, createRef } from "react";
import "../../global.less";
import "./style.less";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  Button,
  Checkbox,
  Input,
  Cascader,
  DatePicker,
  Form,
  InputNumber,
  Mentions,
  Select,
  Space,
  TreeSelect,
  Segmented,
  message,
} from "antd";
import dayjs from "dayjs";

const dateFormat = "DD/MM/YYYY";

class EditExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.formRef = createRef();

    this.state = {
      categories: [],
      name: props.expenseData?.name || "",
      category: props.expenseData?.category || "",
      amount: props.expenseData?.amount || "",
      date: props.expenseData?.date || "",
    };
  }

  componentDidMount() {
    const categoriesCollection = collection(db, "categories");
    this.unsubscribeCategories = onSnapshot(
      categoriesCollection,
      (snapshot) => {
        const categoriesData = snapshot.docs.map((doc) => ({
          value: doc.data.name,
          lable: doc.data.name,
        }));
        this.setState({ categories: categoriesData });
      }
    );

    this.setInitialFormValues();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expenseData !== this.props.expenseData) {
      this.setInitialFormValues();
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeCategories) this.unsubscribeCategories();
  }

  setInitialFormValues = () => {
    const { expenseData } = this.props;

    const initialValues = {
      name: expenseData?.name || "",
      amount: expenseData?.amount || "",
      category: expenseData?.category || "",
      date: expenseData?.data ? dayjs(expenseData.date, dateFormat) : null,
    };

    this.formRef.current.setFieldsValue(initialValues);
  };

  onFinish = async (values) => {
    const { expenseData, closeModalOnSubmit } = this.props;

    const formattedValues = {
      ...values,
      date: values.date ? dayjs(values.date).format(dateFormat) : null,
    };

    try {
      if (expenseData?.id) {
        const docRef = doc(db, "transactions", expenseData.transactionDocId);
        await updateDoc(docRef, formattedValues);
        message.success("Expense updated successfully!");
      } else {
        const id = crypto.randomUUID();
        const data = { ...formattedValues, id };
        await addDoc(collection(db, "transactions"), data);
        message.success("Expense added successfully!");
      }
    } catch (error) {
      console.error("Error updating/adding document: ", error);
      message.error("Failed to update/add income.");
    }
    this.formRef.current.resetFields();
    if (closeModalOnSubmit) closeModalOnSubmit();
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    const { categories } = this.state;

    return (
      <Form
        ref={this.formRef}
        name="editExpenseForm"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
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

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input your Amount!",
            },
          ]}
        >
          <InputNumber
            placeholder="Enter amount"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select type"
            allowClear
            options={[{ value: "expense", label: "expense" }]}
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select category"
            allowClear
            options={categories}
          />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: "88px" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default EditExpenseForm;
