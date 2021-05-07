import { configureStore } from "@reduxjs/toolkit";
import {
  userLoginReducer,
  userEmailUpdateReducer,
} from "../reducers/userReducers";

export default configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userEmailUpdate: userEmailUpdateReducer,
  },
});
