import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctors: [],
};

export const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    getDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    updateDoctor: (state, action) => {
      state.doctors = action.payload;
    },
  },
});

export const { getDoctors, updateDoctor } = doctorSlice.actions;
