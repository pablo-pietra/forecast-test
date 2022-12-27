import { useState, useContext } from "react";
import Moment from "react-moment";
import AppContext from "../../AppContext";

const API_KEY = "c771c835d0f1418eafa801008d0ee0a9";
const WEATHER_URL = "https://api.weather.gov/points";
const DEFAULT_ADDRESS = "1600 Pennsylvania Avenue NW, Washington, DC 20500, United States";

const SearchForm = () => {
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const { loading, setLoading, setError, setLocation, setDailyForecasts } =
    useContext(AppContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const geolocation = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${API_KEY}`
      ).then((response) => response.json());

      if (!geolocation.features.length) {
        setDailyForecasts([]);
        return;
      }

      const { lat, lon } = geolocation.features[0].properties;

      const points = await fetch(`${WEATHER_URL}/${lat},${lon}`).then(
        (response) => response.json()
      );

      const { properties: location } = points.properties.relativeLocation;

      const forecast = await fetch(points.properties.forecast).then(
        (response) => response.json()
      );

      setLocation(`${location.city}, ${location.state}`);
      setDailyForecasts(groupByDay(forecast.properties.periods));
    } catch (error) {
      setDailyForecasts(undefined);
      setError("Oops! something went wrong, try again later");
    } finally {
      setLoading(false);
    }
  };

  const groupByDay = (periods: any[]) => {
    const grouped = [];
    const dayPeriods = periods.filter((period) => period.isDaytime);
    const nightPeriods = periods.filter((period) => !period.isDaytime);
    for (let day = 0; day < 7; day++) {
      grouped.push({
        day: day + 1,
        dayPeriod: dayPeriods[day],
        nightPeriod: nightPeriods[day],
        date: <Moment format="dddd Do" date={dayPeriods[day].startTime} />,
      });
    }
    return grouped;
  };

  return (
    <form
      data-testid="search-form"
      className="flex space-x-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={address}
        data-testid="input-address"
        placeholder="Insert full address"
        className="border rounded shadow p-2 w-full"
        onChange={(event) => setAddress(event.target.value)}
      />
      <input
        type="submit"
        value="Search"
        disabled={!address || loading}
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded hover:cursor-pointer disabled:bg-blue-200"
      />
    </form>
  );
};

export default SearchForm;
