import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICurrencyApiResponse, ICurrencyState } from './types'

const initialState: ICurrencyState = {
  currencyRates: {},
  availableCurrencyOptions: [],
  fromCurrency: '',
  toCurrency: '',
  exchangeRate: 1
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    getCurrencyRates: (
      state: ICurrencyState,
      action: PayloadAction<ICurrencyApiResponse>
    ) => {
      const { base: baseCurrency, rates: currencyRates } = action.payload

      state.currencyRates = currencyRates
      state.toCurrency = state.toCurrency || 'USD'
      state.availableCurrencyOptions =
        ['UAH', 'USD', 'EUR', ...Object.keys(currencyRates).filter(option =>
          option !== 'UAH' &&
          option !== 'USD' &&
          option !== 'EUR'
        )].filter(option =>
          option !== baseCurrency &&
          option !== state.toCurrency
        )
      state.fromCurrency = baseCurrency
      state.exchangeRate = currencyRates[state.toCurrency]
    },
    changeToCurrency: (state: ICurrencyState, action: PayloadAction<string>) => {
      state.availableCurrencyOptions =
        [state.toCurrency, ...state.availableCurrencyOptions.filter(option =>
          option !== action.payload
        )]
      state.toCurrency = action.payload
      state.exchangeRate = state.currencyRates[action.payload]
    }
  }
})
