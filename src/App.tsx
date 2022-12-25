import { useState } from "react";
import AppContext from "./AppContext";
import ForecastList from "./components/forecastList";
import ErrorToast from "./components/errorToast";
import SearchForm from "./components/searchForm";

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [dailyForecasts, setDailyForecasts] = useState<any[] | undefined>();

  const initialState = {
    error,
    setError,
    loading,
    setLoading,
    location,
    setLocation,
    dailyForecasts,
    setDailyForecasts,
  };

  return (
    <AppContext.Provider value={initialState}>
      <div className="container mx-auto grid gap-8 my-8">
        {error && <ErrorToast />}
        <SearchForm />
        {loading ? (
          <div className="flex justify-center">Loading...</div>
        ) : (
          <ForecastList />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
