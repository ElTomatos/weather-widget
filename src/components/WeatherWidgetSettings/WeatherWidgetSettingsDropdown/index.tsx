/**
 * Vendors
 */
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

/**
 * Components
 */
import WeatherWidgetSettingsForm from "../WeatherWidgetSettingsForm";
import WeatherWidgetSettingsList from "../WeatherWidgetSettingsList";

/**
 * Helpers
 */
import { isTouchDevice } from "../../../utils";

/**
 * Typings
 */
import { WeatherWidgetShape } from "../../../types/weather";

type TProps = {
  isOpen: boolean;
  widgets: WeatherWidgetShape[];
  onAdd: (city: string) => void;
  onDelete: (city: string) => void;
  onReorder: (id: string, atIndex: number) => void;
};

const dndBackend = isTouchDevice() ? TouchBackend : HTML5Backend;

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
      {/* @ts-ignore */}
      <DndProvider backend={dndBackend}>
        <WeatherWidgetSettingsList
          widgets={widgets}
          onReorder={onReorder}
          onDelete={onDelete}
        />
      </DndProvider>

      <WeatherWidgetSettingsForm onAdd={onAdd} widgets={widgets} />
    </div>
  );
};

export default WeatherWidgetSettingsDropdown;
