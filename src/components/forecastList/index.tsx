import { useContext } from "react";
import AppContext from "../../AppContext";
import ForecastItem from "../forecastItem";

const ForecastList = () => {
  const { location, dailyForecasts } = useContext(AppContext);

  return dailyForecasts ? (
    dailyForecasts.length ? (
      <div>
        <div className="mb-4 text-3xl">7 days forecast for {location}</div>
        <div className="grid gap-4">
          {dailyForecasts.map((dailyForecast, index) => (
            <ForecastItem key={index} dailyForecast={dailyForecast} />
          ))}
        </div>
      </div>
    ) : (
      <div className="flex justify-center">
        No results, please write a more accurate address.
      </div>
    )
  ) : null;
};

export default ForecastList;
