/**
 * Vendors
 */
import { useState, useEffect } from "react";

/**
 * API
 */
import { getWeatherDataByCoords } from "../services/openweather";
import { WeatherInfo } from "../types/weather";

/**
 * Config
 */
import { WIDGETS_STORAGE_NAME } from "../config/storage";

const widgetsFallback = [
  {
    city: "Moscow",
    data: null,
  },
];

/**
 * Hook to get user geolocation
 */
export const useDefaultWidgets = (): [
  { city: string; data: WeatherInfo | null }[] | null,
  boolean
] => {
  const [isMounted, setMountedState] = useState(false);

  const [widgetData, setWidgetData] = useState<
    | {
        city: string;
        data: WeatherInfo | null;
      }[]
    | null
  >(null);

  const getWidgetsFromStorage = () => {
    const widgets = localStorage.getItem(WIDGETS_STORAGE_NAME);
    if (widgets) {
      try {
        const parsed = JSON.parse(widgets);
        const formattedWidgets = parsed.map((city: string) => ({
          city,
          data: null,
        }));
        setWidgetData(formattedWidgets);
        setMountedState(true);
        return true;
      } catch (e) {
        localStorage.removeItem(WIDGETS_STORAGE_NAME);
        return false;
      }
    }
    return false;
  };

  const successHandler = async (position: GeolocationPosition) => {
    try {
      const { current } = await getWeatherDataByCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });

      setWidgetData([{ city: current.city.name, data: current }]);
      setMountedState(true);
    } catch (e) {
      handleError();
    }
  };

  const handleError = () => {
    setWidgetData(widgetsFallback);
    setMountedState(true);
  };

  useEffect(() => {
    if (getWidgetsFromStorage()) {
      return;
    }
    if (!navigator.geolocation) {
      handleError();
    } else {
      navigator.geolocation.getCurrentPosition(successHandler, handleError);
    }
  }, []);

  return [widgetData, isMounted];
};
