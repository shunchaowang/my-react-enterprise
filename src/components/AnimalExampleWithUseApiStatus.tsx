// define a api state, idle, pending, success, error

import { fetchDog } from '@/api/animalApi'
import { withAsync } from '@/helpers/withAsync'
import { useEffect, useState } from 'react'
import { IDLE, PENDING, SUCCESS, ERROR } from '@/api/constants/apiStatus'
import { useApiStatus } from '@/api/useApiStatus'

const useFetchDog = () => {
  const [dog, setDog] = useState<string>()

  const {
    status: fetchDogStatus,
    setStatus: setFetchDogStatus,
    isIdle: isFetchDogStatusIdle,
    isPending: isFetchDogStatusPending,
    isSuccess: isFetchDogStatusSuccess,
    isError: isFetchDogStatusError,
  } = useApiStatus(IDLE)
  const initFetchDog = async () => {
    setFetchDogStatus(PENDING)
    const { response, error } = await withAsync(() => fetchDog())
    if (error) {
      setFetchDogStatus(ERROR)
    } else if (response) {
      setDog(response.data.message)
      setFetchDogStatus(SUCCESS)
    }
  }

  return {
    dog,
    fetchDogStatus,
    initFetchDog,
    isFetchDogStatusIdle,
    isFetchDogStatusPending,
    isFetchDogStatusSuccess,
    isFetchDogStatusError,
  }
}

function AnimalExampleWithApiStates() {
  const {
    dog,
    fetchDogStatus,
    initFetchDog,
    isFetchDogStatusIdle,
    isFetchDogStatusPending,
    isFetchDogStatusSuccess,
    isFetchDogStatusError,
  } = useFetchDog()

  useEffect(() => {
    initFetchDog()
  }, [])

  return (
    <div className='my-8 mx-auto max-w-2xl'>
      <div className='flex justify-center gap-8'>
        <div className='w-64 h-64'>
          {isFetchDogStatusIdle ? <p>Welcome</p> : null}
          {isFetchDogStatusPending ? <p>Loading data...</p> : null}
          {isFetchDogStatusError ? <p>There was a problem</p> : null}
          {isFetchDogStatusSuccess ? (
            <img className='h-64 w-full object-cover' src={dog} alt='Dog' />
          ) : null}
        </div>
      </div>

      <button
        onClick={initFetchDog}
        className='mt-4 bg-blue-800 text-blue-100 p-4'
      >
        Fetch Animals
      </button>
    </div>
  )
}

export default AnimalExampleWithApiStates
