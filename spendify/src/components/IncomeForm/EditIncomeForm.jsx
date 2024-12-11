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
  addIncome,
  editIncome,
  setCategories,
} from "../../redux/actions/incomeActions";

const dateFormat = "DD/MM/YYYY";

const EditIncomeForm = ({ incomeData, closeModalOnSubmit }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [initialValues, setInitialValues] = useState({
    name: incomeData?.name || "",
    category: incomeData?.category || "",
    amount: incomeData?.amount || "",
    date: incomeData?.date ? dayjs(incomeData.date, dateFormat) : null,
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
      name: incomeData?.name || "",
      amount: incomeData?.amount || "",
      category: incomeData?.category || "",
      type: "income",
      date: incomeData?.date ? dayjs(incomeData.date, dateFormat) : null,
    });
    formRef.current?.setFieldsValue({
      name: incomeData?.name || "",
      amount: incomeData?.amount || "",
      type: "income",
      category: incomeData?.category || "",
      date: incomeData?.date ? dayjs(incomeData.date, dateFormat) : null,
    });
  }, [incomeData]);

  const onFinish = async (values) => {
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
        dispatch(editIncome(incomeData.id, formattedValues));
        message.success("Income updated successfully!");
      } else {
        const id = crypto.randomUUID();
        const data = { ...formattedValues, id };
        await addDoc(collection(db, `users/${user}/transactions`), data);
        dispatch(addIncome(data));
        message.success("Income added successfully!");
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
      name="editIncomeForm"
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
          options={[{ value: "income", label: "income" }]}
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

export default EditIncomeForm;
