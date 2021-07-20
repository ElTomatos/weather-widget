/**
 * Vendors
 */
import { useEffect, useState } from "react";

/**
 * API
 */
import { getWeatherDataByCityName } from "../services/openweather";

/**
 * Typings
 */
import { WeatherInfo } from "../types/weather";

/**
 * Hook to get weather data by city name
 */
export const useWeatherData = (
  city: string
): [WeatherInfo | null, boolean, string | null] => {
  /**
   * State for holding weather data
   */
  const [data, setData] = useState<WeatherInfo | null>(null);

  /**
   * State for holding error
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * State for holding loading flag
   */
  const [isLoading, setLoadingState] = useState<boolean>(false);

  /**
   * Get data on mount
   */
  useEffect(() => {
    /**
     * Request API function
     */
    const getWeatherData = async () => {
      setLoadingState(true);
      try {
        const { current } = await getWeatherDataByCityName({ city });
        setData(current);
      } catch (e) {
        setError(e ? e.toString() : "Server error");
      }
    };

    getWeatherData();
  }, [city]);

  /**
   * Remove loading indicator when get data or error
   */
  useEffect(() => {
    if (data || error) {
      setLoadingState(false);
    }
  }, [data, error]);

  return [data, isLoading, error];
};
