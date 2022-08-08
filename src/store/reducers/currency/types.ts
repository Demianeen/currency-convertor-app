export interface ICurrencyApiResponse {
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
