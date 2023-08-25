import React, { Fragment, useContext, useState, useEffect } from "react";
import { Button, Divider, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthState";
import Alertmsg from "../components/Alertmsg";
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: null,
    password: null,
    cpassword: null,
  });
  const { registerUser, isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onFinish = (e) => {
    console.log(user);
    registerUser(user);
  };

  onchange = (e) => {
    setUser({ ...user, [e.target.id.split("_")[1]]: e.target.value });
  };

  return (
    <Fragment>
      <Divider orientation="left">Sign Up for New User</Divider>
      <br></br>
      <Alertmsg />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
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
          label="Username"
          name="username"
          value={user.username}
          onChange={onchange}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          value={user.password}
          onChange={onchange}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="passwordconfirm"
          value={user.cpassword}
          onChange={onchange}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          {"  "}
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </Form.Item>
      </Form>
    </Fragment>
  );
};
export default Signup;
