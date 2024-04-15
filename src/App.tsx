
import './App.css'
import SpotPriceChart from './components/SpotPriceChart/SpotPriceChart'
import { OpenAPI } from './generated/openapi'
// envs are not coming trough in production and i dont have time to fix this
OpenAPI.BASE = import.meta.env.VITE_API_BASE_ADDRESS || 'https://spot-hinta-api.azurewebsites.net/api/v1'

function App() {
  return (
      <main className='content'>
        <h1>Weekly electricity spot price</h1>
        <SpotPriceChart/>
      </main>
  )
}

export default App
