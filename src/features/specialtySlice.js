import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  specialties: [],
};

export const specialtySlice = createSlice({
  name: "specialties",
  initialState,
  reducers: {
    getSpecialties: (state, action) => {
      state.specialties = action.payload;
    },
  },
});

export const { getSpecialties } = specialtySlice.actions;
