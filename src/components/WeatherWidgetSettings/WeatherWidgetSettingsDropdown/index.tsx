/**
 * Vendors
 */
import React, { useRef } from "react";
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
import WeatherWidgetSettingsForm from "../WeatherWidgetSettingsForm";
import WeatherWidgetSettingsList from "../WeatherWidgetSettingsList";

/**
 * Typings
 */
type TProps = {
  isOpen: boolean;
  widgets: { city: string }[];
  onAdd: (city: string) => void;
  onDelete: (city: string) => void;
  onReorder: (id: string, atIndex: number) => void;
};

/**
 * Expo
 */
const WeatherWidgetSettingsDropdown: React.FC<TProps> = ({
  isOpen,
  widgets,
  onAdd,
  onDelete,
  onReorder,
}) => {
  const classes = [
    "widget-settings-dropdown",
    isOpen ? "is-open" : "is-close",
  ].join(" ");

  return (
    <div className={classes}>
      <DndProvider backend={HTML5Backend}>
        <WeatherWidgetSettingsList
          widgets={widgets}
          onReorder={onReorder}
          onDelete={onDelete}
        />
      </DndProvider>

      <WeatherWidgetSettingsForm onAdd={onAdd} />
    </div>
  );
};

export default WeatherWidgetSettingsDropdown;
