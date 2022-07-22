import axios from 'axios'
import { Dispatch } from 'redux'
import { CurrencyAction, currencyActionTypes, ICurrencyState } from './types'

const CONVERTOR_URL = 'https://api.apilayer.com/exchangerates_data/latest'
const CONVERTOR_API = 'jr18zv6f9n9fKIsalSTlIlIk9K5qpHZN'

interface IExchangeRatesApi {
  data: {
    base: string,
    date: Date,
    rates: Record<string, number>
  }
}

export const getCurrencyRates = () => {
  return async (dispatch: Dispatch<CurrencyAction>) => {
    try {
      const { data: { base, rates } }: IExchangeRatesApi =
        await axios.get(CONVERTOR_URL, {
          params: {
            base: 'UAH'
          },
          headers: {
            apikey: CONVERTOR_API
          }
        })

      const ratesKeys = Object.keys(rates)

      const newState: ICurrencyState = {
        currencyRates: rates,
        fromCurrency: base,
        toCurrency: 'USD',
        availableCurrencyOptions: ratesKeys,
        exchangeRate: rates.USD
      }
      // TODO: fix: repeated two times due page rendering
      dispatch({ type: currencyActionTypes.GET_CURRENCY_RATES_SUCCESS, payload: newState })
    } catch (error) {
      dispatch({ type: currencyActionTypes.GET_CURRENCY_RATES_ERROR, payload: 'Cannot get currency rates from api' })
    }
  }
}

export const changeFromCurrency = (newOption: string) => {
  return async (dispatch: Dispatch<CurrencyAction>) => {
    try {
      const { data: { base, rates } }: IExchangeRatesApi =
        await axios.get(CONVERTOR_URL, {
          params: {
            base: newOption
          },
          headers: {
            apikey: CONVERTOR_API
          }
        })

      const ratesKeys = Object.keys(rates)

      const partState = {
        currencyRates: rates,
        availableCurrencyOptions: ratesKeys,
        fromCurrency: base
      }
      dispatch({ type: currencyActionTypes.CHANGE_FROM_CURRENCY_SUCCESS, payload: partState })
    } catch (error) {
      dispatch({ type: currencyActionTypes.CHANGE_FROM_CURRENCY_ERROR, payload: 'Cannot get currency rates from api' })
    }
  }
}

export const changeToCurrency = (newOption: string) => {
  return { type: currencyActionTypes.CHANGE_TO_CURRENCY, payload: newOption }
}
