import authReducer from "./authSlice";
import commentReducer from "./commentSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    auth: authReducer,
    comment: commentReducer
  }
})

export default store;
