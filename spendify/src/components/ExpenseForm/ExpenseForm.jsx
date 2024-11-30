import React, { Component } from "react";
import "./style.less";
import "../../global.less";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
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

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenseDatas: [],
      categories: [],
      selectedCategory: "",
      // id: crypto.randomUUID(),
      // name: "",
      // amount: "",
      // type: "expense",
      // date: new Date().toISOString().slice(0, 10),
      // expenses: [],
    };
  }

  formRef = React.createRef();

  componentDidMount() {
    const categoriesCollection = collection(db, "categories");
    this.unsubscribeCategories = onSnapshot(
      categoriesCollection,
      (snapshot) => {
        const categoriesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const categoryOptions = categoriesData.map((category) => ({
          value: category.name,
          label: category.name,
        }));
        this.setState({ categories: categoryOptions });
      }
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
    if (this.unsubscribeCategories) this.unsubscribeCategories();
  }

  onFinish = async (values) => {
    const user = auth.currentUser.uid;

    const formattedValues = {
      ...values,
      id: crypto.randomUUID(),
      date: values.date ? dayjs(values.date).format(dateFormat) : null,
    };

    const { id, name, amount, type, category, date } = formattedValues;
    const data = { id, name, amount, type, category, date };
    localStorage.setItem("transactions", JSON.stringify(data));

    try {
      await addDoc(collection(db, `users/${user}/transactions`), data);
      const { closeModalOnSubmit } = this.props;
      if (closeModalOnSubmit) closeModalOnSubmit();
      message.success("Expense Added Successfully!");
    } catch (error) {
      console.error("Error adding document to Firestore: ", error);
    }
    this.formRef.current.resetFields();
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    const { closeModalOnSubmit } = this.props;

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };

    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 32,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
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
            onChange={this.handleTypeChange}
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
            allowClear
            value={this.state.selectedCategory || null}
            onChange={this.handleCategoryChange}
            placeholder="Select category"
            options={this.state.categories}
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

        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: "88px" }}
            onClick={closeModalOnSubmit}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ExpenseForm;
