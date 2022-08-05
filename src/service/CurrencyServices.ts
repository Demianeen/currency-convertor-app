import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IApiResponse } from '../store/reducers/currency/types'

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.apilayer.com/exchangerates_data' }),
  endpoints: (build) => ({
    fetchCurrencyRates: build.query<IApiResponse, string>({
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
