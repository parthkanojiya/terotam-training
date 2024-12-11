import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  editExpense,
  setCategories,
} from "../../redux/actions/expenseActions";

const dateFormat = "DD/MM/YYYY";

const EditExpenseForm = ({ expenseData, closeModalOnSubmit }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [initialValues, setInitialValues] = useState({
    name: expenseData?.name || "",
    category: expenseData?.category || "",
    amount: expenseData?.amount || "",
    date: expenseData?.date ? dayjs(expenseData.date, dateFormat) : null,
  });

  const categories = useSelector((state) => state.category.categories);
  useEffect(() => {
    const user = auth.currentUser.uid;
    const categoriesCollection = collection(db, `users/${user}/categories`);

    const unsubscribeCategories = onSnapshot(
      categoriesCollection,
      (snapshot) => {
        const categoriesData = snapshot.docs.map((doc) => ({
          value: doc.data().name,
          label: doc.data().name,
        }));

        dispatch(setCategories(categoriesData));
      }
    );

    return () => {
      unsubscribeCategories();
    };
  }, [dispatch]);

  useEffect(() => {
    setInitialValues({
      name: expenseData?.name || "",
      amount: expenseData?.amount || "",
      category: expenseData?.category || "",
      type: "expense",
      date: expenseData?.date ? dayjs(expenseData.date, dateFormat) : null,
    });
    formRef.current?.setFieldsValue({
      name: expenseData?.name || "",
      amount: expenseData?.amount || "",
      type: "expense",
      category: expenseData?.category || "",
      date: expenseData?.date ? dayjs(expenseData.date, dateFormat) : null,
    });
  }, [expenseData]);

  const onFinish = async (values) => {
    const user = auth.currentUser.uid;
    const formattedValues = {
      ...values,
      date: values.date ? dayjs(values.date).format(dateFormat) : null,
    };

    try {
      if (expenseData?.id) {
        const docRef = doc(
          db,
          `users/${user}/transactions`,
          expenseData.transactionDocId
        );
        await updateDoc(docRef, formattedValues);
        dispatch(editExpense(expenseData.id, formattedValues));
        message.success("Expense updated successfully!");
      } else {
        const id = crypto.randomUUID();
        const data = { ...formattedValues, id };
        await addDoc(collection(db, `users/${user}/transactions`), data);
        dispatch(addExpense(data));
        message.success("Expense added successfully!");
      }
    } catch (error) {
      console.error("Error updating/adding document: ", error);
      message.error("Failed to update/add income.");
    }

    formRef.current?.resetFields();
    if (closeModalOnSubmit) closeModalOnSubmit();
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <Form
      ref={formRef}
      name="editExpenseForm"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={initialValues}
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
          options={[{ value: "expense", label: "expense" }]}
        />
      </Form.Item>

      <Form.Item label="Category" name="category" rules={[{ required: true }]}>
        <Select placeholder="Select category" allowClear options={categories} />
      </Form.Item>

      <Form.Item label="Date" name="date" rules={[{ required: true }]}>
        <DatePicker format={dateFormat} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginLeft: "88px" }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditExpenseForm;
