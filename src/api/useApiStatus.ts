import { useMemo, useState } from 'react'
import { ApiStatus, defaultApiStatuses, IDLE } from './constants/apiStatus'

type Statuses = Record<`is${Capitalize<Lowercase<ApiStatus>>}`, boolean>

/**
 * capitalize a string
 * @param s the src
 * @returns new string capitalized
 */
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const prepareStatuses = (currentStatus: ApiStatus): Statuses => {
  const statuses = {} as Statuses

  for (const status of defaultApiStatuses) {
    const normalizedStatus = capitalize(status.toLowerCase())
    const normalizedStatusKey = `is${normalizedStatus}` as keyof Statuses
    statuses[normalizedStatusKey] = status === currentStatus
  }
  return statuses
}

/**
 * a hook to return api status, we want to have sth like {status, setStatus, isIdle, isPending, isSuccess, isError}
 * a state and setter used for the status
 * a method to normalize the status name is needed
 * a record to map the status with the status needed
 * @param currentStatus
 * @returns
 */
export const useApiStatus = (currentStatus: ApiStatus = IDLE) => {
  const [status, setStatus] = useState<ApiStatus>(currentStatus)
  const statuses = useMemo(() => prepareStatuses(status), [status])
  return { status, setStatus, ...statuses }
}
