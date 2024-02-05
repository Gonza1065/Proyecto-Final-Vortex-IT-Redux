import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookies";
const initialState = {
  token: Cookies.getItem("token") || null,
  role: Cookies.getItem("role") || null,
  id: Cookies.getItem("id") || null,
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
    setId: (state, action) => {
      state.id = action.payload;
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

export const storeId = (id) => (dispatch) => {
  Cookies.setItem("id", id);
  dispatch(setId(id));
};

export const deleteToken = (token, role, id) => (dispatch) => {
  Cookies.removeItem("token", token);
  Cookies.removeItem("role", role);
  Cookies.removeItem("id", id);
  dispatch(setToken(null));
  dispatch(setRole(null));
  dispatch(setId(null));
};

export const { setToken, setRole, setId } = userSlice.actions;
