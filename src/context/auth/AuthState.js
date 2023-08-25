import React, { createContext, useReducer } from "react";
import axios from "axios";
import AuthhReducer from "./AuthhReducer";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
  AUTH_ERROR,
  USER_LOADED,
} from "../types";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  errors: null,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthhReducer, initialState);

  //Load user
  // const loadUser = async () => {

  //   if (localStorage.token) {
  //     const tkn=localStorage.token;
  //     const config = {
  //       headers: {
  //         "Authorization":tkn
  //       },
  //     };
  //     try {
  //       const res = await axios.get("https://file-flick.up.railway.app/FMS/loaduser/",config);
  //       dispatch({
  //         type: USER_LOADED,
  //         payload: res.data,
  //       });
  //     } catch (err) {
  //       dispatch({
  //         type: AUTH_ERROR,
  //       });
  //     }
  //   }

  // };

  //register new user
  const registerUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "https://file-flick.up.railway.app/FMS/signup/",
        formData,
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      //loadUser();
    } catch (err) {
      console.log(err);
      dispatch({
        type: REGISTER_FAIL,
        payload: "Error",
      });
    }
  };

  //Login user
  const loginUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "https://file-flick.up.railway.app/FMS/login/",
        formData,
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      //loadUser();
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
        payload: "Username or password not found",
      });
    }
  };

  //Remove errors
  const removeErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  //Logout
  function logUserOut() {
    console.log("cido");
    dispatch({
      type: LOGOUT,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        errors: state.errors,
        removeErrors,
        registerUser,
        loginUser,
        logUserOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
