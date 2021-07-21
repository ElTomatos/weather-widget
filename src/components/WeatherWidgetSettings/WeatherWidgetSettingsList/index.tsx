/**
 * Vendors
 */
import React from "react";
import { useDrop } from "react-dnd";

/**
 * Components
 */
import WeatherWidgetSettingsListItem from "../WeatherWidgetSettingsListItem";

/**
 * Typings
 */
import { WeatherWidgetShape } from "../../../types/weather";

type TProps = {
  widgets: WeatherWidgetShape[];
  onReorder: (id: string, atIndex: number) => void;
  onDelete: (city: string) => void;
};

/**
 * Expo
 */
const WeatherWidgetSettingsList: React.FC<TProps> = ({
  widgets,
  onReorder,
  onDelete,
}) => {
  const [, drop] = useDrop(() => ({ accept: "weather-widget-item" }));

  return (
    <div className="widgets-settings-list" ref={drop}>
      {widgets.map(({ city }, index) => (
        <WeatherWidgetSettingsListItem
          key={city}
          city={city}
          index={index}
          onReorder={onReorder}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default WeatherWidgetSettingsList;
