import React, { Component } from "react";
import "../../global.less";
import "./style.less";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { Form, Input } from "antd";
import { connect } from "react-redux";
import { addCategory } from "../../redux/actions/categoryActions";

class CategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
    };
  }

  formRef = React.createRef();

  componentDidMount() {
    const { userId } = this.state;
    this.authUnsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userId: user.uid });
      } else {
        console.error("User is not authenticated.");
      }
    });

    const categoriesCollection = collection(db, `users/${userId}/categories`);

    this.unsubscribe = onSnapshot(categoriesCollection, (snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.props.setCategories(categoriesData);
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  onFinish = async (values) => {
    const { closeModalOnSubmit } = this.props;
    const user = auth.currentUser.uid;
    const formattedValues = {
      ...values,
      id: crypto.randomUUID(),
    };

    const { id, name } = formattedValues;
    const data = { id, name };
    localStorage.setItem("categories", JSON.stringify(data));

    try {
      await addDoc(collection(db, `users/${user}/categories`), data);
      this.props.addCategory(data);
    } catch (error) {
      console.error("Error adding document to Firestore: ", error);
    }

    this.formRef.current.resetFields();
    if (closeModalOnSubmit) closeModalOnSubmit();
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
    };

    return (
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

const mapDispatchToProps = {
  addCategory,
};

export default connect(null, mapDispatchToProps)(CategoryForm);
