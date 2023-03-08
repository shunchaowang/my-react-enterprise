import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosPromise,
  Canceler,
} from 'axios'

export type { Canceler }

// this will create a type from Pick utility types, Omit will do the reverse
// {get: '', post: '', put: '', patch: '', delete: ''}
type AxiosMethods = Pick<
  AxiosInstance,
  'get' | 'post' | 'put' | 'patch' | 'delete'
>

// create an object type AxiosMethods['get'|'post'|...]
export type WithAbortFn = AxiosMethods[keyof AxiosMethods]

export type ApiExecutor<T> = {
  (url: string, body: unknown, config: ApiRequestConfig): AxiosPromise<T>
  (url: string, config: ApiRequestConfig): AxiosPromise<T>
}

export type ApiExecutorArgs =
  | [string, unknown, ApiRequestConfig]
  | [string, ApiRequestConfig]

export type ApiRequestConfig = AxiosRequestConfig & {
  abort?: (cancel: Canceler) => void
}

export type ApiError = AxiosError
