import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  cancelations: [],
};

export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    getPatients: (state, action) => {
      state.patients = action.payload;
    },
    getCancelations: (state, action) => {
      state.cancelations = action.payload;
    },
  },
});

export const { getPatients, getCancelations } = patientSlice.actions;
