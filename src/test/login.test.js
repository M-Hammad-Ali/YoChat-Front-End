import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import React, { createElement } from "react";
import Login from "./../components/login";

afterEach(cleanup);

it("Login Render", () => {
  const { getByPlaceholderText } = render(<Login />);
  expect(getByPlaceholderText(/Enter Username/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/Enter Password/i)).toBeInTheDocument();
});

// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------

it("Button should be enabled after entering text in fields", async () => {
  const { getByRole, getByPlaceholderText } = render(<Login />);
  const name = screen.getByPlaceholderText(/Enter Username/i);
  const pass = screen.getByPlaceholderText(/Enter Password/i);
  fireEvent.change(name, { target: { name: "username", value: "oatmeal" } });
  fireEvent.change(pass, { target: { name: "password", value: "pass" } });

  const button = screen.getByRole("button", { name: /Sign In/i });

  expect(button.disabled).toBeFalsy();
});