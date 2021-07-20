/**
 * Base API service
 */
import { apiService } from "../../ApiService";

/**
 * Typings
 */
import { WeatherInfo } from "../../../types/weather";

type TRequest = {
  /**
   * latitude
   */
  lat: number;

  /**
   * lon
   */
  lon: number;
};

/**
 * Get weather data by city name
 */
export const getWeatherDataByCoords = async ({ lat, lon }: TRequest) => {
  return apiService<{ current: WeatherInfo }>(
    process.env.REACT_APP_OPENWEATHER_API_BASE_URL +
      "?" +
      new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        appid: process.env.REACT_APP_OPENWEATHER_API_KEY as string,
        units: "metric",
        mode: "xml",
      })
  );
};
