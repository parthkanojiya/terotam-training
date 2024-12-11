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

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} from "../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions/userActions.js";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [formValue, setFormValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const {
    isLoggedIn,
    error,
    loading: authLoading,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const onFinish = async (values) => {
    setLoading(true);

    if (!isSignInForm) {
      // Sign Up Logic
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;

        await updateProfile(user, { displayName: values.name });
        const userDetails = { email: user.email, displayName: values.name };

        dispatch(setUserData(userDetails));

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userData", JSON.stringify(userDetails));

        navigate("/");
      } catch (error) {
        console.error("Error during sign-up:", error.message);
        setLoading(false);
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

        const userDetails = {
          email: user.email,
          displayName: user.displayName,
        };

        dispatch(setUserData(userDetails));

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userData", JSON.stringify(userDetails));

        navigate("/");
      } catch (error) {
        console.error("Error during login:", error.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (error) {
      message.error(error);
      setLoading(false);
    }
  }, [error]);

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
