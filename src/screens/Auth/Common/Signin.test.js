import * as authApiSlice from "../../../app/auth/authApiSlice";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../app/store/store";
import { SignupComponent } from "../Common/SignupComponent";

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
          <SignupComponent isSignUp={false} />
        </Provider>
      </MemoryRouter>
    );
  });

  it("triggers form submission on button click", async () => {
    const signInMock = jest.fn(); 
    jest.spyOn(authApiSlice, "useSignInMutation").mockReturnValue([
      signInMock,
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
          <SignupComponent isSignUp={false} />
        </Provider>
      </MemoryRouter>
    );

   
    fireEvent.change(getByPlaceholderText("jane@email.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("8+ characters"), {
      target: { value: "password123" },
    });

  
    const signInButton = getByTestId("sign");
    fireEvent.click(signInButton);

  
    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});
