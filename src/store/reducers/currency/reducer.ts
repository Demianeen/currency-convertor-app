import { CurrencyAction, currencyActionTypes, ICurrencyState } from './types'

const initialState: ICurrencyState = {
  currencyRates: {},
  availableCurrencyOptions: [],
  fromCurrency: '',
  toCurrency: '',
  exchangeRate: 0,
  error: null
}

export const currencyReducer = (state = initialState, action: CurrencyAction): ICurrencyState => {
  const baseCurrencies = ['EUR', 'USD', 'UAH']
  const withOutBaseCurrencies = (array: string[]) => {
    return array.filter(option =>
      option !== 'EUR' &&
      option !== 'USD' &&
      option !== 'UAH'
    )
  }

  switch (action.type) {
    case currencyActionTypes.GET_CURRENCY_RATES_SUCCESS:
      return {
        currencyRates: action.payload.currencyRates,
        availableCurrencyOptions:
          [...baseCurrencies, ...withOutBaseCurrencies(action.payload.availableCurrencyOptions)]
            .filter(option =>
              option !== action.payload.toCurrency &&
              option !== action.payload.fromCurrency
            ),
        fromCurrency: action.payload.fromCurrency,
        toCurrency: action.payload.toCurrency,
        exchangeRate: action.payload.exchangeRate,
        error: null
      }
    case currencyActionTypes.GET_CURRENCY_RATES_ERROR:
      return { ...state, error: action.payload }
    case currencyActionTypes.CHANGE_FROM_CURRENCY_SUCCESS:
      return {
        currencyRates: action.payload.currencyRates,
        availableCurrencyOptions:
          [...baseCurrencies, ...withOutBaseCurrencies(action.payload.availableCurrencyOptions)]
            .filter(option =>
              option !== action.payload.fromCurrency &&
              option !== state.toCurrency
            ),
        fromCurrency: action.payload.fromCurrency,
        toCurrency: state.toCurrency,
        exchangeRate: action.payload.currencyRates[state.toCurrency],
        error: null
      }
    case currencyActionTypes.CHANGE_FROM_CURRENCY_ERROR:
      return { ...state, error: action.payload }
    case currencyActionTypes.CHANGE_TO_CURRENCY:
      return {
        ...state,
        availableCurrencyOptions:
          [...baseCurrencies, ...withOutBaseCurrencies([state.toCurrency, ...state.availableCurrencyOptions])]
            .filter(option =>
              option !== action.payload &&
              option !== state.fromCurrency
            ),
        toCurrency: action.payload,
        exchangeRate: state.currencyRates[action.payload]
      }
    default:
      return state
  }
}
