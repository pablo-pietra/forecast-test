const ForecastItem = ({ dailyForecast }: { dailyForecast: any }) => {
  const Period = ({ period }: { period: any }) => {
    return (
      <div>
        <div className="mb-2 text-sm font-semibold">
          {period.isDaytime ? "Day" : "Night"}
        </div>
        <div className="inline-grid grid-flow-col gap-x-4 mb-4">
          <img
            className="rounded-md"
            src={period.icon}
            alt={period.shortForecast}
          />
          <div className="font-bold text-3xl">
            {period.temperature}°{period.temperatureUnit}
            <div className="font-semibold text-lg">{period.shortForecast}</div>
          </div>
        </div>
        <div className="text-sm mb-2 font-semibold">
          Wind: {period.windSpeed} {period.windDirection}
        </div>
        <div className="text-sm mb-2 text-slate-500">
          {period.detailedForecast}
        </div>
      </div>
    );
  };

  return (
    <div key={dailyForecast.day} className="rounded shadow-lg p-4 bg-white">
      <div className="font-semibold text-xl mb-2 text-blue-500">
        {dailyForecast.date}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Period period={dailyForecast.dayPeriod} />
        <Period period={dailyForecast.nightPeriod} />
      </div>
    </div>
  );
};

export default ForecastItem;
