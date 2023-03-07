import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosPromise,
  Canceler,
} from 'axios'

export type { Canceler }

type AxiosMethods = Pick<
  AxiosInstance,
  'get' | 'post' | 'put' | 'patch' | 'delete'
>
export type WithAbortFn = AxiosMethods[keyof AxiosMethods]
