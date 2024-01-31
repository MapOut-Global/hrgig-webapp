import * as authApiSlice from "../../../app/auth/authApiSlice";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../app/store/store";
import { SignupComponent } from "./SignupComponent";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("@react-oauth/google", () => ({
  useGoogleLogin: jest.fn(),
}));

describe("SignupComponent", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SignupComponent isSignUp={true} />
        </Provider>
      </MemoryRouter>
    );
  });

  it("triggers form submission on button click", async () => {
    const signUpMock = jest.fn(); 
    jest.spyOn(authApiSlice, "useSignUpMutation").mockReturnValue([
      signUpMock,
      {
        isSuccess: false,
        isLoading: false,
        isError: false,
        data: null,
        error: null,
      },
    ]);

    const { getByPlaceholderText, getByTestId } = render(
      <MemoryRouter>
        <Provider store={store}>
          <SignupComponent isSignUp={true} />
        </Provider>
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("Jane Doe"), {
      target: { value: "Test User" },
    });
    fireEvent.change(getByPlaceholderText("jane@email.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("8+ characters"), {
      target: { value: "password123" },
    });

    const signUpButton = getByTestId("sign");
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(signUpMock).toHaveBeenCalledWith({
        fullName: "Test User",
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});

