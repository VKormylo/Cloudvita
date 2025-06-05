import axios, { AxiosInstance } from 'axios'

const API_URL = 'http://localhost:8000/api/v1'
const WEATHER_API_URL = 'http://api.weatherapi.com/v1'

export const apiClient: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

export const weatherApiClient: AxiosInstance = axios.create({
  withCredentials: false,
  baseURL: WEATHER_API_URL
})
