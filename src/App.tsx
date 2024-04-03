
import './App.css'
import SpotPriceChart from './components/SpotPriceChart/SpotPriceChart'
import { OpenAPI } from './openapi'
OpenAPI.BASE = import.meta.env.VITE_API_BASE_ADDRESS || OpenAPI.BASE

function App() {
  return (
      <main className='content'>
        <h1>Weekly electricity spot price</h1>
        <SpotPriceChart/>
      </main>
  )
}

export default App
