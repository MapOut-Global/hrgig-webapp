import apiSlice from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/mapout-authentication/hrgig/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/mapout-authentication/hrgig/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    googleSignIn: builder.mutation({
      query: (credentials) => ({
        url: "/mapout-authentication/social-login/auth/google",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    linkedinSignIn: builder.mutation({
      query: (credentials) => ({
        url: "/mapout-authentication/social-login/auth/linkedin",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGoogleSignInMutation,
  useLinkedinSignInMutation,
} = authApiSlice;
