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
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [apiSlice.reducerPath],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production", // Enable devtools only in non-production environment
});

export default store;
