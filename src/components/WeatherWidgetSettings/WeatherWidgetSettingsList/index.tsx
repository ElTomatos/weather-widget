/**
 * Vendors
 */
import React from "react";
import {
  useDrag,
  useDrop,
  DropTargetMonitor,
  XYCoord,
  DndProvider,
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

/**
 * Components
 */
import WeatherWidgetSettingsListItem from "../WeatherWidgetSettingsListItem";

/**
 * Typings
 */
type TDragItem = {
  index: number;
  id: string;
  type: string;
};

type TProps = {
  widgets: { city: string }[];
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
