import React from "react";
import LoginPage from "../LoginPage";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  render,
  cleanup,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { GlobalContext } from "../../Context/GlobalContext";
import userEvent from "@testing-library/user-event";
import axios from "axios";

const globalValue = jest.fn();
// axios.post = jest.fn();
jest.mock('axios');

test("login button triggered to local storage", async () => {
  // const data = {
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJleHBpcmVkIjoiMjAyMS0xMC0yMFQxOTo1ODo0OC4wODQ4NTErMDc6MDAifQ.NwqR5OiTkrGoU12tdCLMYK6cgZgwZxP5QEBN-1drOM8",
  //   user: {
  //     created_at: "2021-10-19T20:47:25.890241Z",
  //     email: "vilen@email.com",
  //     name: "Vivi",
  //     user_id: 5,
  //     wallet: 0,
  //   },
  // };

  render(
    <GlobalContext.Provider value={{ globalValue }}>
      <LoginPage />
    </GlobalContext.Provider>
  );

  const btnLogin = screen.getByTestId("btn-login");
  const elEmail = screen.getByTestId("email-input");
  const elPass = screen.getByTestId("password-input");
  const inputEmail = elEmail.children[1].children[0];
  const inputPass = elPass.children[1].children[0];

  userEvent.type(inputEmail, "vilen@email.com");
  // fireEvent.change(inputEmail, {target: {value: 'vilen@email.com'}});
  userEvent.type(inputPass, "12345");
  // fireEvent.change(inputPass, {target: {value: '12345'}});

  screen.debug();

  userEvent.click(btnLogin);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith();
  })

  // expect(axios.post).toHaveBeenCalledWith(`http://6f8e-103-92-225-75.ap.ngrok.io/auth/login`);

  expect(localStorage.setItem).toHaveBeenCalled();
});
