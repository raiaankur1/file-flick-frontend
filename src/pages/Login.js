import React, { useState, useContext, useEffect } from "react";
import { Button, Divider, Form, Input } from "antd";
import { AuthContext } from "../context/auth/AuthState";
import { Link, useNavigate } from "react-router-dom";
import Alertmsg from "../components/Alertmsg";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Login = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: null, password: null });
  const { loginUser, isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onFinish = (e) => {
    console.log(user);
    loginUser(user);
  };

  onchange = (e) => {
    setUser({ ...user, [e.target.id.split("_")[1]]: e.target.value });
  };

  return (
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Divider orientation="left">User Login</Divider>
      <br></br>
      <Alertmsg />
      <Form.Item
        label="Username"
        name="username"
        value={user.username}
        onChange={onchange}
        rules={[
          {
            required: true,
            message: "Username cannot be blank!",
          },
        ]}
      >
        <Input name="test" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        value={user.password}
        onChange={onchange}
        rules={[
          {
            required: true,
            message: "Password cannot be blank!",
          },
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
          {"   "}Submit {"    "}
        </Button>{" "}
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
      </Form.Item>
    </Form>
  );
};
export default Login;
