import { fireEvent, render, screen } from "@testing-library/react";
import AppContext, { AppState } from "../../AppContext";
import SearchForm from ".";

let appState: AppState = {
  error: "",
  setError: () => {},
  loading: false,
  setLoading: () => {},
  location: "",
  setLocation: () => {},
  dailyForecasts: undefined,
  setDailyForecasts: () => {},
};

test("renders ok", () => {
  render(
    <AppContext.Provider value={appState}>
      <SearchForm />
    </AppContext.Provider>
  );
  const searchButton = screen.getByText("Search");
  expect(searchButton).toBeInTheDocument();
  expect(searchButton).toBeEnabled();
});

test("disable search button when empty address", () => {
  render(
    <AppContext.Provider value={appState}>
      <SearchForm />
    </AppContext.Provider>
  );
  const inputAddress = screen.getByTestId("input-address");
  const searchButton = screen.getByText("Search");
  fireEvent.change(inputAddress, { target: { value: "" } });
  expect(searchButton).toBeInTheDocument();
  expect(searchButton).toBeDisabled();
});

test("disable search button while loading", () => {
  appState.loading = true;
  render(
    <AppContext.Provider value={appState}>
      <SearchForm />
    </AppContext.Provider>
  );
  const searchButton = screen.getByText("Search");
  expect(searchButton).toBeInTheDocument();
  expect(searchButton).toBeDisabled();
});
