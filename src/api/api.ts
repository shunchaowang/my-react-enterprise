import axios, { AxiosInstance, AxiosRequestConfig, Cancel } from 'axios'

const axiosParams = {
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '/',
}

// create an instance with default params
const axiosInstance = axios.create(axiosParams)

// main api functions
const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.get<T>(url, config),
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.post<T>(url, body, config),
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.put<T>(url, body, config),
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.patch<T>(url, body, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.delete<T>(url, config),
  }
}

export default api(axiosInstance)
