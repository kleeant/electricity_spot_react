import React, { useEffect } from 'react'
import { AxisOptions, Chart } from 'react-charts'
import { TSpotPrice } from '../../openapi'
// import { SpotPriceService } from '../../openapi/services/SpotPriceService'
// import { removeDays, addDays } from '../../util/dateUtil'

type Series = {
  label: string,
  data: TSpotPrice[]
}

const data: Series[] = [{
  label: 'Sähkön hinta',
  data: [
    {
      "timestamp": "2024-03-25T23:00:00.000Z",
      "price": "7.215",
      "price_with_tax": "8.9466"
    },
    {
      "timestamp": "2024-03-26T00:00:00.000Z",
      "price": "7.015",
      "price_with_tax": "8.6986"
    },
    {
      "timestamp": "2024-03-26T01:00:00.000Z",
      "price": "6.726",
      "price_with_tax": "8.34024"
    },
    // ...
  ]
}]
const getSpotPrices = async () => {
  const from = removeDays(7)
  const to = addDays(1)
  const request = SpotPriceService.getSpotPrices(from.toISOString(), to.toISOString());
  // const request = SpotPriceService.getSpotPrices('2024-03-01T08:09:22.146Z', '2024-05-29T08:09:22.146Z');
  setTimeout(() => {
      if (!request.isCancelled) {
          console.warn('Canceling request due to timeout');
          request.cancel();
      }
  }, 1000);

  return await request;
};


const SpotPriceChart = () => {
  /*useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getSpotPrices();
      // ...
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

*/
  const primaryAxis = React.useMemo(
    (): AxisOptions<TSpotPrice> => ({
      getValue: datum => new Date(datum.timestamp),
    }),
    []
  )
  
  const secondaryAxes = React.useMemo(
    (): AxisOptions<TSpotPrice>[] => [
      {
        getValue: datum => datum.price,
      },
    ],
    []
  )
  return (
    <>
      <Chart
        options={{
          dark: true,
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </>
  )
}

export default SpotPriceChart
