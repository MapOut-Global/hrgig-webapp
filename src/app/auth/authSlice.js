import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice";

const initialState = {
  token: null,
  email: null,
};

const setAuthState = ({ state, action }) => {
  const { token, user } = action.payload?.data || {};
  state.token = token;
  state.email = user?.email;
  return state;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.signUp.matchFulfilled,
      (state, action) => {
        return setAuthState({ state, action });
      }
    );
    builder.addMatcher(
      authApiSlice.endpoints.signIn.matchFulfilled,
      (state, action) => {
        return setAuthState({ state, action });
      }
    );
    builder.addMatcher(
      authApiSlice.endpoints.googleSignIn.matchFulfilled,
      (state, action) => {
        return setAuthState({ state, action });
      }
    );
    builder.addMatcher(
      authApiSlice.endpoints.linkedinSignIn.matchFulfilled,
      (state, action) => {
        return setAuthState({ state, action });
      }
    );
  },
});

export const { logout } = authSlice.actions;
export const selectCurrentUserEmail = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
export default authSlice.reducer;
