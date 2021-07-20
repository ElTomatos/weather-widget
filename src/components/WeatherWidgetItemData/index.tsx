/**
 * Vendors
 */
import React, { memo } from "react";

/**
 * Typings
 */
import { WeatherInfo } from "../../types/weather";

type TProps = {
  city: string;
  data: WeatherInfo | null;
};

/**
 * Helpers
 */
const renderIcon = (icon: string) => (
  <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
);

/**
 * Expo
 */
const WeatherWidgetItemData: React.FC<TProps> = memo(({ city, data }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="weather-widget-data">
      <div className="weather-widget-city">{city}</div>
      <div className="weather-widget-icon">
        {renderIcon(data.weather.icon)}
        <span className="weather-widget-temp">
          {Math.round(data.temperature.value)}°C
        </span>
      </div>
      <div className="weather-widget-description">
        Feels like {Math.round(data.feels_like.value)}°C. {data.clouds.name}.{" "}
        {data.wind.speed.name}
      </div>
      <div className="weather-widget-list">
        <div className="weather-widget-list-item">
          {data.wind.speed.value}
          {data.wind.speed.unit} {data.wind.direction.name}
        </div>

        <div className="weather-widget-list-item">
          {data.pressure.value}
          {data.pressure.unit}
        </div>

        <div className="weather-widget-list-item">
          Humidity: {data.humidity.value}
          {data.humidity.unit}
        </div>

        <div className="weather-widget-list-item">
          Visibility: {(data.visibility.value / 1000).toFixed(1)}km
        </div>
      </div>
    </div>
  );
});

export default WeatherWidgetItemData;
