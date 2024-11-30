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
import { db, auth } from "../../firebase";
import {
  Button,
  Input,
  Select,
  DatePicker,
  Form,
  InputNumber,
  message,
} from "antd";
import dayjs from "dayjs";

const dateFormat = "DD/MM/YYYY";

class EditIncomeForm extends Component {
  constructor(props) {
    super(props);

    this.formRef = createRef();

    this.state = {
      categories: [],
      name: props.incomeData?.name || "",
      category: props.incomeData?.category || "",
      amount: props.incomeData?.amount || "",
      date: props.incomeData?.date || null,
    };
  }

  componentDidMount() {
    const user = auth.currentUser.uid;
    const categoriesCollection = collection(db, `users/${user}/categories`);

    this.unsubscribeCategories = onSnapshot(
      categoriesCollection,
      (snapshot) => {
        const categoriesData = snapshot.docs.map((doc) => ({
          value: doc.data().name,
          label: doc.data().name,
        }));
        this.setState({ categories: categoriesData });
      }
    );

    this.setInitialFormValues();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.incomeData !== this.props.incomeData) {
      this.setInitialFormValues();
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeCategories) this.unsubscribeCategories();
  }

  setInitialFormValues = () => {
    const { incomeData } = this.props;

    const initialValues = {
      name: incomeData?.name || "",
      amount: incomeData?.amount || "",
      category: incomeData?.category || "",
      date: incomeData?.date ? dayjs(incomeData.date, dateFormat) : null,
    };

    this.formRef.current?.setFieldsValue(initialValues);
  };

  onFinish = async (values) => {
    const { incomeData, closeModalOnSubmit } = this.props;
    const user = auth.currentUser.uid;

    const formattedValues = {
      ...values,
      date: values.date ? dayjs(values.date).format(dateFormat) : null,
    };

    try {
      if (incomeData?.id) {
        const docRef = doc(
          db,
          `users/${user}/transactions`,
          incomeData.transactionDocId
        );
        await updateDoc(docRef, formattedValues);
        message.success("Income updated successfully!");
      } else {
        const id = crypto.randomUUID();
        const data = { ...formattedValues, id };
        await addDoc(collection(db, `users/${user}/transactions`), data);
        message.success("Income added successfully!");
      }
    } catch (error) {
      console.error("Error updating/adding document: ", error);
      message.error("Failed to update/add income.");
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
        name="editIncomeForm"
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
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter name" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please input your Amount!" }]}
        >
          <InputNumber placeholder="Enter amount" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Type" name="type" rules={[{ required: true }]}>
          <Select
            placeholder="Select type"
            allowClear
            options={[{ value: "income", label: "income" }]}
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select category"
            allowClear
            options={categories}
          />
        </Form.Item>

        <Form.Item label="Date" name="date" rules={[{ required: true }]}>
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

export default EditIncomeForm;
