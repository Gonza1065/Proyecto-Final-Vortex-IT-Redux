import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  cancelations: [],
  appointments: [],
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
    getAppointments: (state, action) => {
      state.appointments = action.payload;
    },
  },
});

export const { getPatients, getCancelations, getAppointments } =
  patientSlice.actions;
