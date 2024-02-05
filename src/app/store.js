import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/userSlice";
import { doctorSlice } from "../features/doctorSlice";
import { specialtySlice } from "../features/specialtySlice";
import { patientSlice } from "../features/patientSlice";

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    doctors: doctorSlice.reducer,
    specialties: specialtySlice.reducer,
    patients: patientSlice.reducer,
  },
});
