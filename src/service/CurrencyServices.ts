import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICurrencyApiResponse } from '../store/reducers/currency/types'

// TODO: add process env
export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.apilayer.com/exchangerates_data' }),
  endpoints: (build) => ({
    fetchCurrencyRates: build.query<ICurrencyApiResponse, string>({
      query: (currency) => ({
        url: '/latest',
        params: {
          base: currency
        },
        headers: {
          apikey: 'jr18zv6f9n9fKIsalSTlIlIk9K5qpHZN'
        }
      })
    })
  })
})
