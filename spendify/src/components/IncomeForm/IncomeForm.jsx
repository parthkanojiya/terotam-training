import React, { useState, useEffect, useRef } from "react";
import "../../global.less";
import "./style.less";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase";
import {
  Button,
  Input,
  DatePicker,
  Form,
  InputNumber,
  Select,
  message,
} from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../redux/actions/categoryActions";
import { addIncome } from "../../redux/actions/incomeActions";

const dateFormat = "DD/MM/YYYY";

const IncomeForm = ({ closeModalOnSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const formRef = useRef();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    const user = auth.currentUser.uid;
    const categoriesCollection = collection(db, `users/${user}/categories`);

    const unsubscribeCategories = onSnapshot(
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

        dispatch(setCategories(categoryOptions));
      }
    );

    return () => {
      unsubscribeCategories();
    };
  }, [dispatch]);

  const onFinish = async (values) => {
    const user = auth.currentUser.uid;

    const formattedValues = {
      ...values,
      id: crypto.randomUUID(),
      date: values.date ? dayjs(values.date).format(dateFormat) : null,
      type: "income",
    };
    const { id, name, amount, type, category, date } = formattedValues;
    const data = { id, name, amount, type, category, date };

    localStorage.setItem("transactions", JSON.stringify(data));

    try {
      await addDoc(collection(db, `users/${user}/transactions`), data);
      message.success("Income Added Successfully!");

      dispatch(addIncome(data));

      closeModalOnSubmit();
    } catch (error) {
      console.error("Error adding document to Firestore: ", error);
      message.error("Failed to add income!");
    }

    formRef.current.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      ref={formRef}
      name="incomeForm"
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input the income name!",
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
            message: "Please input the amount!",
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
          onChange={(value) => {}}
          placeholder="Select type"
          allowClear
          options={[{ value: "income", label: "income" }]}
        />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: "Please select a category!",
          },
        ]}
      >
        <Select
          allowClear
          value={selectedCategory || null}
          onChange={setSelectedCategory}
          placeholder="Select category"
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
};

export default IncomeForm;
