import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import React, { createElement } from "react";
import Register from "./../components/register";
import renderer from "react-test-renderer";


afterEach(cleanup);

it("Snapshot Register", () => {
  const regsiter = renderer.create(<Register></Register>).toJSON();
  expect(regsiter).toMatchSnapshot();
});

// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------

it("Fields are taking values correctly", () => {
  const { getByRole, getByPlaceholderText } = render(<Register />);

  const fname = screen.getByPlaceholderText(/Enter First Name/i);
  const lname = screen.getByPlaceholderText(/Enter Last Name/i);
  const email = screen.getByPlaceholderText(/Email/i);
  const uname = screen.getByPlaceholderText(/Enter Username/i);
  const pass = screen.getByPlaceholderText(/Enter Password/i);

  fireEvent.change(fname, {
    target: { name: "firstname", value: "Babar" },
  });
  fireEvent.change(lname, {
    target: { name: "lastname", value: "Hussain" },
  });

  fireEvent.change(email, {
    target: { name: "email", value: "Babar123@gmail.com" },
  });

  fireEvent.change(uname, {
    target: { name: "username", value: "BABAR" },
  });

  fireEvent.change(pass, {
    target: { name: "password", value: "babar@123" },
  });

  expect(fname.value).toEqual("Babar");
  expect(lname.value).toEqual("Hussain");
  expect(email.value).toEqual("Babar123@gmail.com");
  expect(uname.value).toEqual("BABAR");
  expect(pass.value).toEqual("babar@123");
});