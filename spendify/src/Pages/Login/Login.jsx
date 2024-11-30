import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.less";
import "../../global.less";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { calc } from "antd/es/theme/internal";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase.js";
import Password from "antd/es/input/Password";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../../UserContext.jsx";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [formValue, setFormValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUserData } = useContext(UserContext);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const onFinish = async (values) => {
    if (!isSignInForm) {
      // Sign Up logic
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: values.name,
        });

        const userDetails = {
          email: user.email,
          displayName: values.name,
        };

        localStorage.setItem("isLoggedIn", "true");
        setUserData(userDetails);
        navigate("/home");
      } catch (error) {
        console.error("Error during sign-up:", error.message);
      }
    } else {
      // Sign In Logic
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        const user = userCredential.user;
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
      } catch (error) {
        console.error("Error during login:", error.message);
      }
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100%", height: "100vh" }}
    >
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        onFinish={onFinish}
        form={form}
      >
        {!isSignInForm && (
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your Name!",
              },
            ]}
            style={{
              width: 360,
            }}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
        )}

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email is required!" },
            () => ({
              validator(rule, value, callBack) {
                if (!value) {
                  return Promise.resolve();
                }
                if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)) {
                  return Promise.reject("Enter a valid email");
                }
                return Promise.resolve();
              },
            }),
          ]}
          style={{
            width: 360,
          }}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Password is required!" },
            () => ({
              validator(rule, value, callBack) {
                if (!value) {
                  return Promise.resolve();
                }
                if (
                  !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                    value
                  )
                ) {
                  return Promise.reject("Enter a valid password");
                }
                return Promise.resolve();
              },
            }),
          ]}
          style={{
            width: 360,
          }}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            style={{
              width: 360,
            }}
          />
        </Form.Item>

        <Form.Item
          style={{
            width: 360,
          }}
        >
          <Button block type="primary" htmlType="submit">
            {!isSignInForm ? "Sign Up" : "Log In"}
          </Button>
          <p
            style={{ position: "relative", top: "10px", cursor: "pointer" }}
            onClick={toggleSignInForm}
          >
            {!isSignInForm ? (
              <span className="sign-in-up-state">
                Already registered?{" "}
                <b style={{ color: "#1677ff" }}>Sign In now.</b>
              </span>
            ) : (
              <span className="sign-in-up-state">
                Don't have an Account?{" "}
                <b style={{ color: "#1677ff" }}>Sign Up now.</b>
              </span>
            )}
          </p>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
