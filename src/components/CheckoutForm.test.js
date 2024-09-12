import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);
});

test("form shows success message on submit with form details", () => {
  render(<CheckoutForm />);

  const firstName = "Aldo";
  const lastName = "Gamboa";
  const address = "1 Recursive Lane";
  const city = "Layerville";
  const state = "AA";
  const zip = "04242";

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const addressInput = screen.getByLabelText(/address/i);
  const cityInput = screen.getByLabelText(/city/i);
  const stateInput = screen.getByLabelText(/state/i);
  const zipInput = screen.getByLabelText(/zip/i);
  // Test that input fields are empty at start
  expect(firstNameInput).toHaveValue("");
  expect(lastNameInput).toHaveValue("");
  expect(addressInput).toHaveValue("");
  expect(cityInput).toHaveValue("");
  expect(stateInput).toHaveValue("");
  expect(zipInput).toHaveValue("");

  // Fill the form inputs with the defined variables
  userEvent.type(firstNameInput, firstName);
  userEvent.type(lastNameInput, lastName);
  userEvent.type(addressInput, address);
  userEvent.type(cityInput, city);
  userEvent.type(stateInput, state);
  userEvent.type(zipInput, zip);
  // Test that the inputs have been filled
  expect(firstNameInput).toHaveValue(firstName);
  expect(lastNameInput).toHaveValue(lastName);
  expect(addressInput).toHaveValue(address);
  expect(cityInput).toHaveValue(city);
  expect(stateInput).toHaveValue(state);
  expect(zipInput).toHaveValue(zip);

  // Get the button and click it
  const button = screen.getByRole("button", { name: /checkout/i });
  userEvent.click(button);

  // Get success message and test that it's displayed
  const successMessage = screen.getByText(/ordered/i);
  expect(successMessage).toBeInTheDocument();

  const regex = new RegExp(`${firstName} ${lastName}`, "i");
  const fullName = screen.getByText(regex);
  expect(fullName).toBeInTheDocument();
});
