import { createContext } from "react";

export type AppState = {
  error: string;
  setError: (value: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  location: string;
  setLocation: (value: string) => void;
  dailyForecasts: any[] | undefined;
  setDailyForecasts: (value: any[] | undefined) => void;
};

const AppContext = createContext<AppState>({
  error: "",
  setError: () => {},
  loading: false,
  setLoading: () => {},
  location: "",
  setLocation: () => {},
  dailyForecasts: undefined,
  setDailyForecasts: () => {},
});

export default AppContext;
