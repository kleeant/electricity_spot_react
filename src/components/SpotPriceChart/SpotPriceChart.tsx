import React, { useEffect, useState } from 'react'
import { AxisOptions, Chart } from 'react-charts'
import { CancelablePromise, Pagination, TSpotPrice, TSpotPriceSummary } from '../../openapi'
import { SpotPriceService } from '../../openapi/services/SpotPriceService'
import { removeDays, addDays } from '../../util/dateUtil'

type Series = {
  label: string,
  data: TSpotPrice[]
}
const mockPrices = [
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
const data: Series[] = [{
  label: 'Sähkön hinta',
  data: mockPrices
}]

const getSpotPrices = async (): Promise<CancelablePromise<{ data?: TSpotPriceSummary | undefined, _paging?: Pagination | undefined}>> => {
  const from = removeDays(7)
  const to = addDays(1)
  const request = SpotPriceService.getSpotPrices(from.toISOString(), to.toISOString());
  return await request;
};


const SpotPriceChart = () => {
  const [error, setError] = useState<Error|null>(null);
  const [spotPriceSummary, setSpotPriceSummary] = useState<TSpotPriceSummary|null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const response = await getSpotPrices();
        setLoading(false);
        setSpotPriceSummary(response.data as TSpotPriceSummary)
        console.log('data fetched', response.data)
      }catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setError(error as Error);
      }
      // ...
    }
    void fetchData();
  }, []); // Or [] if effect doesn't need props or state


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
  if(error) {
    return <div>Error: {error.message}</div>;
  }
  if(loading || !spotPriceSummary) {
    return <div>Loading...</div>;
  }
  // eslint-disable-next-line no-debugger
  return (
    <>
      <Chart
        options={{
          dark: true,
          data: [{
            label: 'Sähkön hinta',
            data: spotPriceSummary.prices
          }],
          primaryAxis,
          secondaryAxes,
        }}
      />
    </>
  )
}

export default SpotPriceChart
