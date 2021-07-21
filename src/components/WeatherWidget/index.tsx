/**
 * Vendors
 */
import React, { useState, useCallback, useEffect } from "react";

/**
 * Components
 */
import WeatherWidgetItem from "../WeatherWidgetItem";
import WeatherWidgetSettings from "../WeatherWidgetSettings";
import Loader from "../Loader";

/**
 * Hooks
 */
import { useDefaultWidgets } from "../../hooks";

/**
 * Helpers
 */
import { reorder } from "../../utils";

/**
 * Config
 */
import { WIDGETS_STORAGE_NAME } from "../../config/storage";

/**
 * Typings
 */
import { WeatherInfo, WeatherWidgetShape } from "../../types/weather";

type TProps = {};

/**
 * Expo
 */
const WeatherWidget: React.FC<TProps> = () => {
  const [widgets, setWidgets] = useState<WeatherWidgetShape[]>([]);

  const syncWidgetsUpdateWithStorage = (widgets: WeatherWidgetShape[]) => {
    const cities = widgets.map((widget) => widget.city);
    localStorage.setItem(WIDGETS_STORAGE_NAME, JSON.stringify(cities));
    setWidgets(widgets);
  };

  const handleUpdateWidget = useCallback(
    (city: string, data: WeatherInfo) => {
      const updatedWidgets = widgets.map((widget) => {
        if (widget.city === city) {
          return { city, data };
        }
        return widget;
      });

      setWidgets(updatedWidgets);
    },
    [widgets]
  );

  const handleAddWidget = useCallback(
    (city: string) => {
      syncWidgetsUpdateWithStorage([...widgets, { city, data: null }]);
    },
    [widgets]
  );

  const handleDeleteWidget = useCallback(
    (id: string) => {
      const updatedWidgets = widgets.filter(({ city }) => city !== id);
      syncWidgetsUpdateWithStorage(updatedWidgets);
    },
    [widgets]
  );

  const handleWidgetsReorder = useCallback(
    (id: string, atIndex: number) => {
      const index = widgets.findIndex(({ city }) => city === id);
      if (index > -1) {
        syncWidgetsUpdateWithStorage(reorder(widgets, index, atIndex));
      }
    },
    [widgets]
  );

  const [defaultWidgets, isMounted] = useDefaultWidgets();

  useEffect(() => {
    if (defaultWidgets) {
      setWidgets(defaultWidgets);
    }
  }, [defaultWidgets]);

  return (
    <div className="weather-widget">
      <WeatherWidgetSettings
        widgets={widgets}
        onWidgetAdd={handleAddWidget}
        onWidgetDelete={handleDeleteWidget}
        onWidgetsReorder={handleWidgetsReorder}
      />
      {isMounted ? (
        widgets.map(({ city, data }) => (
          <WeatherWidgetItem
            key={city}
            city={city}
            data={data}
            onUpdate={handleUpdateWidget}
          />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default WeatherWidget;
