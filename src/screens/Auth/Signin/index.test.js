import React from "react";
import { render, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SignIn } from "../Signin/index"; 
import store from "../../../app/store/store";
import { GoogleClientId } from "../../../config";
import { GoogleOAuthProvider } from '@react-oauth/google';

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SignIn Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("navigates to home if currentUserEmail is present", async () => {
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue("dummy@example.com");

    await act(async () => {
      render(
        <MemoryRouter>
        <GoogleOAuthProvider clientId={GoogleClientId}>
          <Provider store={store}>
            <SignIn />
          </Provider>
          </GoogleOAuthProvider>
        </MemoryRouter>
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
