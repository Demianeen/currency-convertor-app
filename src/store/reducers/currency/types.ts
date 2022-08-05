export enum currencyActionTypes {
  GET_CURRENCY_RATES_SUCCESS = 'GET_CURRENCY_RATES_SUCCESS',
  GET_CURRENCY_RATES_ERROR = 'GET_CURRENCY_RATES_ERROR',
  CHANGE_FROM_CURRENCY_SUCCESS = 'CHANGE_FROM_CURRENCY_SUCCESS',
  CHANGE_FROM_CURRENCY_ERROR = 'CHANGE_FROM_CURRENCY_ERROR',
  CHANGE_TO_CURRENCY = 'CHANGE_TO_CURRENCY',
}

export interface IApiResponse {
  base: string,
  rates: Record<string, number>
}

export interface ICurrencyState {
  currencyRates: Record<string, number>
  availableCurrencyOptions: string[],
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number,
}

export interface IGetCurrencyRatesSuccessAction {
  type: currencyActionTypes.GET_CURRENCY_RATES_SUCCESS,
  payload: ICurrencyState
}

export interface IGetCurrencyRatesErrorAction {
  type: currencyActionTypes.GET_CURRENCY_RATES_ERROR,
  payload: string
}

export interface IChangeToCurrencyAction {
  type: currencyActionTypes.CHANGE_TO_CURRENCY,
  payload: string
}

export interface IChangeFromCurrencySuccessAction {
  type: currencyActionTypes.CHANGE_FROM_CURRENCY_SUCCESS,
  payload: {
    currencyRates: Record<string, number>,
    fromCurrency: string,
    availableCurrencyOptions: string[],
  }
}

export interface IChangeFromCurrencyErrorAction {
  type: currencyActionTypes.CHANGE_FROM_CURRENCY_ERROR,
  payload: string
}

export type CurrencyAction =
  IGetCurrencyRatesSuccessAction
  | IGetCurrencyRatesErrorAction
  | IChangeToCurrencyAction
  | IChangeFromCurrencySuccessAction
  | IChangeFromCurrencyErrorAction
