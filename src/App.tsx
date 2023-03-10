import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import './App.css'
// import AnimalExample from '@/components/AnimalExample'
// import AnimalExampleWithApiStates from './components/AnimalExampleWithApiStates'
// import AnimalExampleWithUseApi from './components/AnimalExampleWithUseApi'
import SearchMealExample from './components/SearchMealsExample'

function App() {
  return (
    <>
      <ToastContainer />
      <div className='App mx-auto max-w-6xl text-center my-8'>
        <h1 className='font-semibold text-2xl underline'>
          React - The Road To Enterprise
        </h1>
        <SearchMealExample />
      </div>
    </>
  )
}

export default App
