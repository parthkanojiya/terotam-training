import React, { Component } from "react";
import "../../global.less";
import "./style.less";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
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
} from "antd";

class CategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  formRef = React.createRef();

  componentDidMount() {
    const categoriesCollection = collection(db, "categories");

    this.unsubscribe = onSnapshot(categoriesCollection, (snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.setState({ categories: categoriesData });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  // handleNameChange = (event) => {
  //   this.setState({ name: event.target.value });
  // };

  /* handleSubmit = async (event) => {
    event.preventDefault();
    const { id, name } = this.state;
    const data = { id, name };
    localStorage.setItem("categories", JSON.stringify(data));

    try {
      await addDoc(collection(db, "categories"), {
        id,
        name,
      });

      const { closeModalOnSubmit } = this.props;
      if (closeModalOnSubmit) closeModalOnSubmit();
    } catch (error) {
      console.error("Error adding document to Firestore: ", error);
    }

    // Reset form
    this.setState({ id: crypto.randomUUID(), name: "" });
  }; */

  onFinish = async (values) => {
    const formattedValues = {
      ...values,
      id: crypto.randomUUID(),
    };

    const { id, name } = formattedValues;
    const data = { id, name };
    localStorage.setItem("categories", JSON.stringify(data));

    try {
      await addDoc(collection(db, "categories"), data);
    } catch (error) {
      console.error("Error adding document to Firestore: ", error);
    }

    // Reset all form fields after submit
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
    };

    return (
      // <form onSubmit={this.handleSubmit}>
      //   <div className="input-fields">
      //     <label>Name:</label>
      //     <input
      //       type="text"
      //       placeholder="Enter Category Name"
      //       value={this.state.name}
      //       onChange={this.handleNameChange}
      //     />
      //   </div>

      //   <button type="submit">Add</button>
      // </form>
      <Form
        {...layout}
        ref={this.formRef}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 32,
        }}
        style={{
          maxWidth: 600,
          margin: "1rem 0",
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
      </Form>
    );
  }
}

export default CategoryForm;
