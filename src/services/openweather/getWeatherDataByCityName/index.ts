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
   * Search city
   */
  city: string;
};

/**
 * Get weather data by city name
 */
export const getWeatherDataByCityName = async ({ city }: TRequest) => {
  return apiService<{ current: WeatherInfo }>(
    process.env.REACT_APP_OPENWEATHER_API_BASE_URL +
      "?" +
      new URLSearchParams({
        q: city,
        appid: process.env.REACT_APP_OPENWEATHER_API_KEY as string,
        units: "metric",
        mode: "xml",
      })
  );
};
