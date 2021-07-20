/**
 * Vendors
 */
import React, { useEffect, memo } from "react";

/**
 * Components
 */
import Loader from "../Loader";
import WeatherWidgetItemData from "../WeatherWidgetItemData";
import WeatherWidgetItemError from "./WeatherWidgetItemError";

/**
 * Hooks
 */
import { useWeatherData } from "../../hooks";

/**
 * Typings
 */
import { WeatherInfo } from "../../types/weather";
type TProps = {
  city: string;
  data: WeatherInfo | null;
  onUpdate: (city: string, data: WeatherInfo) => void;
};

/**
 * Expo
 */
const WeatherWidgetItem: React.FC<TProps> = memo(({ city, data, onUpdate }) => {
  const [responseData, isLoading, error] = useWeatherData(city);

  useEffect(() => {
    if (responseData) {
      onUpdate(city, responseData);
    }
  }, [responseData]);

  return (
    <div className="weather-widget-item">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <WeatherWidgetItemError error={error} />
      ) : (
        <WeatherWidgetItemData data={data} city={city} />
      )}
    </div>
  );
});

export default WeatherWidgetItem;
