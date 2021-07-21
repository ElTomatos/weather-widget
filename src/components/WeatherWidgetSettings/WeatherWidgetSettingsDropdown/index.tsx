/**
 * Vendors
 */
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import MultiBackend, {
  MouseTransition,
  TouchTransition,
} from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

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

const CustomHTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      transition: MouseTransition,
      // by default, will dispatch a duplicate `mousedown` event when this backend is activated
    },
    {
      backend: TouchBackend,
      // Note that you can call your backends with options
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
      // will not dispatch a duplicate `touchstart` event when this backend is activated
      skipDispatchOnTransition: true,
    },
  ],
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
      {/* @ts-ignore */}
      <DndProvider backend={MultiBackend} options={CustomHTML5toTouch}>
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
