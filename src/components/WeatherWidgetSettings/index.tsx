/**
 * Vendors
 */
import React, { useState, useRef, memo, useCallback } from "react";

/**
 * Hooks
 */
import { useClickOutside } from "../../hooks";

/**
 * Components
 */
import WeatherWidgetSettingsDropdown from "./WeatherWidgetSettingsDropdown";

/**
 * Icon
 */
import { BsGear } from "react-icons/all";

/**
 * Typings
 */
import { WeatherWidgetShape } from "../../types/weather";

type TProps = {
  widgets: WeatherWidgetShape[];
  onWidgetAdd: (city: string) => void;
  onWidgetDelete: (city: string) => void;
  onWidgetsReorder: (id: string, atIndex: number) => void;
};

const WeatherWidgetSettings: React.FC<TProps> = memo(
  ({ widgets, onWidgetAdd, onWidgetDelete, onWidgetsReorder }) => {
    const [isDropdownOpen, setDropdownOpenState] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
      setDropdownOpenState((state) => !state);
    };

    const handleOutsideClick = useCallback(() => {
      setDropdownOpenState(false);
    }, []);

    useClickOutside(dropdownRef, handleOutsideClick);

    return (
      <div className="weather-widget-settings" ref={dropdownRef}>
        <button
          className="weather-widget-settings-btn btn"
          onClick={toggleDropdown}
        >
          <BsGear />
        </button>

        <WeatherWidgetSettingsDropdown
          isOpen={isDropdownOpen}
          widgets={widgets}
          onAdd={onWidgetAdd}
          onDelete={onWidgetDelete}
          onReorder={onWidgetsReorder}
        />
      </div>
    );
  }
);

export default WeatherWidgetSettings;
