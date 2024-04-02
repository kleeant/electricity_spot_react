import React, { useState } from 'react'
import './App.css'
import { AxisOptions, Chart } from 'react-charts'
import SpotPriceChart from './components/SpotPriceChart/SpotPriceChart'

function App() {
  return (
    <>
      <h1>Sähkön hinta</h1>
      <SpotPriceChart/>
    </>
  )
}

export default App
