import { render, screen } from "@testing-library/react";
import AppContext, { AppState } from "../../AppContext";
import ForecastList from ".";

jest.mock("../forecastItem");

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

test("renders with no results", () => {
  appState.dailyForecasts = [];
  render(
    <AppContext.Provider value={appState}>
      <ForecastList />
    </AppContext.Provider>
  );
  const noResults = screen.getByText(
    "No results, please write a more accurate address."
  );
  const forecastList = screen.queryByTestId("forecast-list");
  expect(noResults).toBeInTheDocument();
  expect(forecastList).not.toBeInTheDocument();
});

test("renders with results", () => {
  appState.dailyForecasts = [{}];
  appState.location = "test city";
  render(
    <AppContext.Provider value={appState}>
      <ForecastList />
    </AppContext.Provider>
  );
  const noResults = screen.queryByText(
    "No results, please write a more accurate address."
  );
  const location = screen.queryByText("7 days forecast for test city");
  const forecastList = screen.queryByTestId("forecast-list");
  expect(noResults).not.toBeInTheDocument();
  expect(forecastList).toBeInTheDocument();
  expect(location).toBeInTheDocument();
});
