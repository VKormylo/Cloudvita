interface APIWeatherCondition {
  text: string
  icon: string
  code: number
}

interface APIWeatherCurrent {
  cloud: number
  condition: APIWeatherCondition
  dewpoint_c: number
  dewpoint_f: number
  feelslike_c: number
  feelslike_f: number
  gust_kph: number
  gust_mph: number
  heatindex_c: number
  heatindex_f: number
  humidity: number
  is_day: number
  last_updated: string
  last_updated_epoch: number
  precip_in: number
  precip_mm: number
  pressure_in: number
  pressure_mb: number
  temp_c: number
  temp_f: number
  uv: number
  vis_km: number
  vis_miles: number
  wind_degree: number
  wind_dir: string
  wind_kph: number
  wind_mph: number
  windchill_c: number
  windchill_f: number
}

interface APIWeatherCondition {
  text: string
  icon: string
  code: number
}

interface APIAstroData {
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moon_phase: string
  moon_illumination: string
}

interface APIDayData {
  maxtemp_c: number
  maxtemp_f: number
  mintemp_c: number
  mintemp_f: number
  avgtemp_c: number
  avgtemp_f: number
  maxwind_kph: number
  maxwind_mph: number
  totalprecip_mm: number
  totalprecip_in: number
  totalsnow_cm?: number
  avgvis_km: number
  avgvis_miles: number
  avghumidity: number
  daily_chance_of_rain: number
  daily_chance_of_snow: number
  condition: APIWeatherCondition
  uv: number
}

export interface APIHourData {
  time: string
  time_epoch: number
  temp_c: number
  temp_f: number
  is_day: number
  condition: APIWeatherCondition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
  vis_km: number
  vis_miles: number
  gust_mph: number
  gust_kph: number
  snow_cm?: number
  uv: number
}

interface APIForecastDay {
  date: string
  date_epoch: number
  day: APIDayData
  astro: APIAstroData
  hour: APIHourData[]
}

interface APIForecast {
  forecastday: APIForecastDay[]
}

interface APILocationData {
  country: string
  lat: number
  lon: number
  name: string
  region: string
  tz_id: string
  localtime: string
  localtime_epoch: number
}

export interface WeatherResponse {
  current: APIWeatherCurrent
  forecast: APIForecast
  location: APILocationData
}
