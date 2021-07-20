/**
 * Vendors
 */
import React, { useState, useRef, memo } from "react";

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
type TProps = {
  widgets: { city: string }[];
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

    const handleOutsideClick = () => {
      setDropdownOpenState(false);
    };

    useClickOutside(dropdownRef, handleOutsideClick);

    return (
      <div className="weather-widget-settings" ref={dropdownRef}>
        <button onClick={toggleDropdown}>
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
