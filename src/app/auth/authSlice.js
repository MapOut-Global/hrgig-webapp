import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice";

const initialState = {
  token: null,
  email: null,
};

const handleAuthFulfilled = (state, action) => {
  const { token, email } = action.payload?.data || {};
  state.token = token;
  state.email = email;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        [
          authApiSlice.endpoints.signUp,
          authApiSlice.endpoints.signIn,
          authApiSlice.endpoints.googleSignIn,
          authApiSlice.endpoints.linkedinSignIn,
        ].includes(action),
      handleAuthFulfilled
    );
  },
});

export const { logout } = authSlice.actions;

export const selectCurrentUserEmail = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;

export default authSlice.reducer;
