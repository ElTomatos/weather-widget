/**
 * Vendors
 */
import React, { useState } from "react";

/**
 * Icons
 */
import { AiOutlineEnter } from "react-icons/all";

/**
 * Typings
 */
type TProps = {
  onAdd: (city: string) => void;
};

/**
 * Expo
 */
const WeatherWidgetSettingsForm: React.FC<TProps> = ({ onAdd }) => {
  const [newCity, setNewCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCity.trim().length > 1) {
      onAdd(newCity);
      setNewCity("");
    }
  };

  const handleCityChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setNewCity(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="add-city">Add Location:</label>
      <div className="form-row">
        <input
          id="add-city"
          type="text"
          value={newCity}
          onChange={handleCityChange}
        />
        <button type="submit">
          <AiOutlineEnter />
        </button>
      </div>
    </form>
  );
};

export default WeatherWidgetSettingsForm;
