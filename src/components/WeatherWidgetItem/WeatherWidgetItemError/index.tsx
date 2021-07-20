/**
 * Vendors
 */
import React from "react";

/**
 * Icons
 */
import { BiErrorCircle } from "react-icons/all";

/**
 * Typings
 */
type TProps = {
  error: string;
};

/**
 * Expo
 */
const WeatherWidgetItemError: React.FC<TProps> = ({ error }) => (
  <div className="weather-widget-error">
    <div className="weather-widget-error-icon">
      <BiErrorCircle />
    </div>
    {error}
  </div>
);

export default WeatherWidgetItemError;
