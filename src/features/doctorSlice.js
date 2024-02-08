import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctors: [],
  appointmentsByDoctor: [],
};

export const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    getDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    getAppointmentsByDoctor: (state, action) => {
      state.appointmentsByDoctor = action.payload;
    },
  },
});

export const { getDoctors, getAppointmentsByDoctor } = doctorSlice.actions;
