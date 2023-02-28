import './App.css'
// import AnimalExample from '@/components/AnimalExample'
// import AnimalExampleWithApiStates from './components/AnimalExampleWithApiStates'
import AnimalExampleWithUseApi from './components/AnimalExampleWithUseApi'

function App() {
  return (
    <div className='App mx-auto max-w-6xl text-center my-8'>
      <h1 className='font-semibold text-2xl'>React - The Road To Enterprise</h1>
      {/* <AnimalExample /> */}
      {/* <AnimalExampleWithApiStates /> */}
      <AnimalExampleWithUseApi />
    </div>
  )
}

export default App
