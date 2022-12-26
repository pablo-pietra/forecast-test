import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders ok", () => {
  render(<App />);
  const search = screen.queryByTestId("search-form");
  const forecast = screen.queryByTestId("forecast-list");
  expect(search).toBeInTheDocument();
  expect(forecast).not.toBeInTheDocument();
});

test("search button clicked", () => {
  render(<App />);
  const searchButton = screen.getByText("Search");
  expect(screen.queryByTestId("forecast-list")).not.toBeInTheDocument();
  fireEvent.click(searchButton);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
