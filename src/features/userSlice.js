import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookies";
const initialState = {
  token: Cookies.getItem("token") || null,
  role: Cookies.getItem("role") || null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const storeToken = (token) => (dispatch) => {
  Cookies.setItem("token", token);
  dispatch(setToken(token));
};

export const storeRole = (role) => (dispatch) => {
  Cookies.setItem("role", role);
  dispatch(setRole(role));
};

export const deleteToken = (token, role) => (dispatch) => {
  Cookies.removeItem("token", token);
  Cookies.removeItem("role", role);
  dispatch(setToken(token));
  dispatch(setRole(role));
};

export const { setToken, setRole } = userSlice.actions;
