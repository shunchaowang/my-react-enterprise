import axios, { AxiosInstance, AxiosRequestConfig, Cancel } from 'axios'
import {
  ApiError,
  ApiExecutor,
  ApiExecutorArgs,
  ApiRequestConfig,
  WithAbortFn,
} from './api.types'

// default config for the axios instance
const axiosParams = {
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '/',
}

// create an instance with default params
const axiosInstance = axios.create(axiosParams)

export const didAbort = (
  error: unknown
): error is Cancel & { aborted: boolean } => axios.isCancel(error)

const getCancelSource = () => axios.CancelToken.source()

export const isApiError = (error: unknown): error is ApiError => {
  return axios.isAxiosError(error)
}

const withAbort = <T>(fn: WithAbortFn) => {
  const executor: ApiExecutor<T> = async (...args: ApiExecutorArgs) => {
    const originalConfig = args[args.length - 1] as ApiRequestConfig
    // extract abort property from the config
    const { abort, ...config } = originalConfig

    // create cancel token and abort method only if abort
    // function was passed
    if (typeof abort === 'function') {
      const { cancel, token } = getCancelSource()
      config.cancelToken = token
      abort(cancel)
    }

    try {
      if (args.length > 2) {
        const [url, body] = args
        return await fn<T>(url, body, config)
      } else {
        const [url] = args
        return await fn<T>(url, config)
      }
    } catch (error) {
      console.log('api error', error)
      // add 'aborted' preperty to the error if the request was canceled
      if (didAbort(error)) {
        error.aborted = true
      }
      throw error
    }
  }

  return executor
}

// main api functions
const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      withAbort<T>(axios.get)(url, config),
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      withAbort<T>(axios.post)(url, body, config),
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      withAbort<T>(axios.put)(url, body, config),
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      withAbort<T>(axios.patch)(url, body, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      withAbort<T>(axios.delete)(url, config),
  }
}

export default api(axiosInstance)
