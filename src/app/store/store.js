// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../auth/authSlice";
// import apiSlice from "../api/apiSlice";

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     auth: authReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
//     devTools: true
// });

// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import apiSlice from "../api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production", // Enable devtools only in non-production environment
});

export default store;
