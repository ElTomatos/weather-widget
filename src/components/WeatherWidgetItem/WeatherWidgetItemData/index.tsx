/**
 * Vendors
 */
import React, { memo } from "react";

/**
 * Icons
 */
import { WiStrongWind } from "react-icons/all";
import { ReactComponent as PressureIcon } from "../../../assets/svg/barometer.svg";

/**
 * Helpers
 */
import { capitalize } from "../../../utils";

/**
 * Typings
 */
import { WeatherInfo } from "../../../types/weather";

type TProps = {
  city: string;
  data: WeatherInfo | null;
};

const renderIcon = (icon: string) => (
  <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
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
      {/* TITLE */}
      <div className="weather-widget-city">
        {city}, {data.city.country}
      </div>

      {/* ICON */}
      <div className="weather-widget-icon">
        {renderIcon(data.weather.icon)}
        <span className="weather-widget-temp">
          {Math.round(data.temperature.value)}°C
        </span>
      </div>

      {/* DESCRIPTION */}
      <div className="weather-widget-description">
        Feels like {Math.round(data.feels_like.value)}°C.{" "}
        {capitalize(data.clouds.name)}. {data.wind.speed.name}
      </div>

      {/* WIND */}
      <div className="weather-widget-list">
        <div className="weather-widget-list-item">
          <WiStrongWind />
          {data.wind.speed.value}
          {data.wind.speed.unit} {data.wind.direction.code}
        </div>

        {/* PRESSURE */}
        <div className="weather-widget-list-item">
          <PressureIcon />
          {data.pressure.value}
          {data.pressure.unit}
        </div>

        {/* HUMIDITY */}
        <div className="weather-widget-list-item">
          Humidity: {data.humidity.value}
          {data.humidity.unit}
        </div>

        {/* VISIBILITY */}
        <div className="weather-widget-list-item">
          Visibility: {(data.visibility.value / 1000).toFixed(1)}km
        </div>
      </div>
    </div>
  );
});

export default WeatherWidgetItemData;
