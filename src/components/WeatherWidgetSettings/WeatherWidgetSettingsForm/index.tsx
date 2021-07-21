/**
 * Vendors
 */
import React, { useState } from "react";

/**
 * Icons
 */
import { AiOutlineEnter } from "react-icons/all";

/**
 * Helpers
 */
import { capitalize } from "../../../utils";

/**
 * Typings
 */
import { WeatherWidgetShape } from "../../../types/weather";

type TProps = {
  onAdd: (city: string) => void;
  widgets: WeatherWidgetShape[];
};

/**
 * Expo
 */
const WeatherWidgetSettingsForm: React.FC<TProps> = ({ onAdd, widgets }) => {
  const [newCity, setNewCity] = useState("");

  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (newCity.trim().length < 2) {
      return "Enter 2 or more characters";
    }

    if (
      widgets.some(({ city }) => city.toLowerCase() === newCity.toLowerCase())
    ) {
      return `Widget with city ${capitalize(newCity)} aleady exist`;
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();

    if (error) {
      setError(error);
      return;
    }

    onAdd(newCity);
    setNewCity("");
  };

  const handleFocus = () => {
    if (error) {
      setError(null);
    }
  };

  const handleCityChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setNewCity(value);
  };

  return (
    <form className="add-widget-form" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="add-city">
        Add Location:
      </label>
      <div className="form-row">
        <input
          id="add-city"
          type="text"
          className="form-control"
          placeholder="Enter a city"
          autoComplete="off"
          value={newCity}
          onChange={handleCityChange}
          onFocus={handleFocus}
        />
        <button className="btn add-widget-submit" type="submit">
          <AiOutlineEnter />
        </button>
      </div>
      {error && <div className="form-error">{error}</div>}
    </form>
  );
};

export default WeatherWidgetSettingsForm;
