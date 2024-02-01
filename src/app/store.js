import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/userSlice";
import { doctorSlice } from "../features/doctorSlice";

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    doctors: doctorSlice.reducer,
  },
});
