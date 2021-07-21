export interface Coord {
  lon: number;
  lat: number;
}

export interface Sun {
  rise: Date;
  set: Date;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  timezone: number;
  sun: Sun;
}

export interface Temperature {
  value: number;
  min: number;
  max: number;
  unit: string;
}

export interface FeelsLike {
  value: number;
  unit: string;
}

export interface Humidity {
  value: number;
  unit: string;
}

export interface Pressure {
  value: number;
  unit: string;
}

export interface Speed {
  value: number;
  unit: string;
  name: string;
}

export interface Direction {
  value: number;
  code: string;
  name: string;
}

export interface Wind {
  speed: Speed;
  gusts: string;
  direction: Direction;
}

export interface Clouds {
  value: number;
  name: string;
}

export interface Visibility {
  value: number;
}

export interface Precipitation {
  mode: string;
}

export interface Weather {
  number: number;
  value: string;
  icon: string;
}

export interface Lastupdate {
  value: Date;
}

export interface WeatherInfo {
  city: City;
  temperature: Temperature;
  feels_like: FeelsLike;
  humidity: Humidity;
  pressure: Pressure;
  wind: Wind;
  clouds: Clouds;
  visibility: Visibility;
  precipitation: Precipitation;
  weather: Weather;
  lastupdate: Lastupdate;
}

export interface WeatherWidgetShape {
  city: string;
  data: WeatherInfo | null;
}
