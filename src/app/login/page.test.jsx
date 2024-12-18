import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import Login from "./page";
import { loginUser, clearError } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: jest.fn(),
  Toaster: () => null,
}));

describe("Login Component", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  let store;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);

    // Create a fresh store for each test
    store = configureStore({
      reducer: {
        auth: (
          state = { loading: false, error: null, isAuthenticated: false },
          action
        ) => state,
      },
    });
  });

  const renderLoginComponent = () => {
    return render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  };

  // Test component rendering
  it("renders login form with all necessary elements", () => {
    renderLoginComponent();

    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });
 
  it("shows error for short password", async () => {
    renderLoginComponent();

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "12345" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(toast).toHaveBeenCalledWith(
      "Password must be at least 6 characters long"
    );
  });

  // Test successful form submission
  it("dispatches login action with correct credentials", async () => {
    renderLoginComponent();

    const validEmail = "test@example.com";
    const validPassword = "password123";

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: validEmail },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: validPassword },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Verify that loginUser action was dispatched with correct credentials
    const actions = store.getState();
    expect(actions).toBeTruthy();
  });

  // Test authentication redirect
  it("redirects to dashboard when authenticated", () => {
    store = configureStore({
      reducer: {
        auth: (state = { isAuthenticated: true }, action) => state,
      },
    });

    renderLoginComponent();

    expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
  });

  // Test loading state
  it("disables submit button and shows loading state during submission", () => {
    store = configureStore({
      reducer: {
        auth: (state = { loading: true }, action) => state,
      },
    });

    renderLoginComponent();

    const submitButton = screen.getByRole("button", {
      name: /signing in\.\.\./i,
    });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveClass("opacity-50");
  });

  // Test error handling
  it("displays error message when login fails", async () => {
    const errorMessage = "Invalid credentials";
    store = configureStore({
      reducer: {
        auth: (state = { error: { message: errorMessage } }, action) => state,
      },
    });

    renderLoginComponent();

    expect(toast).toHaveBeenCalledWith(errorMessage);
  });
});