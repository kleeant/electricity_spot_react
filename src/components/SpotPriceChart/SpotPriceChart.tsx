import React, { useEffect, useState } from 'react'
import { AxisOptions, Chart } from 'react-charts'
import { CancelablePromise, Pagination, TSpotPrice, TSpotPriceSummary } from '../../openapi'
import { SpotPriceService } from '../../openapi/services/SpotPriceService'
import { removeDays, addDays, getStartOfDay, getEndOfDay } from '../../util/dateUtil'
import './SpotPriceChart.css'

// type Series = {
//   label: string,
//   data: TSpotPrice[]
// }


const getSpotPrices = async (): Promise<CancelablePromise<{ data?: TSpotPriceSummary | undefined, _paging?: Pagination | undefined}>> => {
  const from = getStartOfDay(removeDays(7))
  const to = getEndOfDay(addDays(1))
  const request = SpotPriceService.getSpotPrices(from.toISOString(), to.toISOString());
  return await request;
};

const LabelMetadata: React.FC<{ label: string, value: string }> = ({ label, value }) => {
  return (
    <p className='label-metadata'><span >{label}: </span>{value}</p>
  )
}


const SpotPriceChart: React.FC = () => {
  const [error, setError] = useState<Error|null>(null);
  const [spotPriceSummary, setSpotPriceSummary] = useState<TSpotPriceSummary|null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const response = await getSpotPrices();
        setLoading(false);
        // (response.data as TSpotPriceSummary).prices.length = 30;
        setSpotPriceSummary(response.data as TSpotPriceSummary)
        console.log('data fetched', response.data)
      }catch (error) {
        setError(error as Error);
      }
      // ...
    }
    void fetchData();
  }, []); // Or [] if effect doesn't need props or state

  

  const primaryAxis = React.useMemo(
    (): AxisOptions<TSpotPrice> => ({
      getValue: datum => new Date(datum.timestamp),
      tickCount: spotPriceSummary ? spotPriceSummary.prices.length / 6 : 0,
      scaleType: 'localTime',
      
    }),
    [spotPriceSummary]
  )
  
  const secondaryAxes = React.useMemo(
    (): AxisOptions<TSpotPrice>[] => [
      {
        getValue: datum => Number(datum.price_with_tax),
        position: 'left',
        // invert: true,
        formatters: {
          tooltip: (datum: unknown) => Number(datum).toFixed(2),
        }
      },
    ],
    [spotPriceSummary]
  )
  if(error) {
    return <div>Error: {error.message}</div>;
  }
  if(loading || !spotPriceSummary) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className='spot-price-chart'>
      <div className='spot-price-chart-description'>
        <LabelMetadata label='From' value={spotPriceSummary.from} />
        <LabelMetadata label='To' value={spotPriceSummary.to} />
        <LabelMetadata label='Price Unit' value={spotPriceSummary.meta.price_unit} />
        <LabelMetadata label='Tax' value={`${spotPriceSummary.meta.tax}%`} />
      </div>
      <Chart 

        options={{
          
          dark: true,
          data: [{
            label: spotPriceSummary.meta.price_unit,
            data: spotPriceSummary.prices,
          }],
          primaryAxis,
          secondaryAxes,
        }}
      />
      </div>
    </>
  )
}

export default SpotPriceChart
