/**
 * Vendors
 */
import React from "react";

/**
 * Components
 */
import WeatherWidget from "../WeatherWidget";

/**
 * Expo
 */
const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <WeatherWidget />
    </div>
  );
};

export default App;
