import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICurrencyApiResponse } from '../store/reducers/currency/types'

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_CURRENCY_URL }),
  endpoints: (build) => ({
    fetchCurrencyRates: build.query<ICurrencyApiResponse, string>({
      query: (currency) => ({
        url: '/latest',
        params: {
          base: currency
        },
        headers: {
          apikey: process.env.REACT_APP_CURRENCY_APIKEY
        }
      })
    })
  })
})
