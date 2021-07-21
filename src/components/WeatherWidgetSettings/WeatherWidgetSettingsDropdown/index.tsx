/**
 * Vendors
 */
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

/**
 * Components
 */
import WeatherWidgetSettingsForm from "../WeatherWidgetSettingsForm";
import WeatherWidgetSettingsList from "../WeatherWidgetSettingsList";

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

      <WeatherWidgetSettingsForm onAdd={onAdd} widgets={widgets} />
    </div>
  );
};

export default WeatherWidgetSettingsDropdown;
