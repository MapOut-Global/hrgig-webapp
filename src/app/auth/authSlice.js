import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice";
import Cookies from "js-cookie";

const initialState = {
  token: null,
  email: null,
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
        console.log("ACTION",action.payload?.data)
        const token = action.payload?.data?.token;
        const email = action.payload?.data?.user?.email;
        state.token = token;
        state.email = email;

        if (token) {
          Cookies.set("token", token, {
            expires: 1,
            secure: true, 
            httpOnly: true, 
            sameSite: "strict",
          });
        }
        return state;
      }
    );
    builder.addMatcher(
      authApiSlice.endpoints.signIn.matchFulfilled,
      (state, action) => {
        state.token = action.payload?.data?.token;
        state.email = action.payload?.data?.user?.email;
        return state;
      }
    );
    builder.addMatcher(
      authApiSlice.endpoints.googleSignIn.matchFulfilled,
      (state, action) => {
        state.token = action.payload?.data?.token;
        state.email = action.payload?.data?.user?.email;
        return state;
      }
    );
    builder.addMatcher(
      authApiSlice.endpoints.linkedinSignIn.matchFulfilled,
      (state, action) => {
        state.token = action.payload?.data?.token;
        state.email = action.payload?.data?.user?.email;
        return state;
      }
    );
  },
});

export const { logout } = authSlice.actions;
export const selectCurrentUserEmail = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
export default authSlice.reducer;
