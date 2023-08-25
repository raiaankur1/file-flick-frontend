import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Button } from "antd";
import { AuthContext } from "../context/auth/AuthState";
const { Header } = Layout;
const Headerr = () => {
  const { user, isAuthenticated, logUserOut } = useContext(AuthContext);

  const onLogout = (e) => {
    logUserOut();
  };
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <span>
        <span
          style={{
            fontSize: "25px",
            color: "white",
            paddingBottom: "0",
            marginBottom: "0",
          }}
        >
          <Link to="/">FLASHR {"  |" /*terrafile*/} </Link>
        </span>
      </span>

      <span style={{ float: "right", padding: "1em" }}>
        {isAuthenticated ? (
          <h5 style={{ color: "white" }}>
            {" "}
            {"  "}Logged In as {user.username}{" "}
            <Button onClick={onLogout} type="link">
              Logout
            </Button>
          </h5>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </span>
    </Header>
  );
};

export default Headerr;
