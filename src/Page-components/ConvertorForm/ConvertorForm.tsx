import React, { ChangeEvent, useEffect, useState } from 'react'
import { ConvertorProps } from './ConvertorForm.props'
import styles from './ConvertorForm.module.css'
import cn from 'classnames'
import { currencyApi } from '../../service/CurrencyServices'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Input, Select } from '../../Components'
import { currencySlice } from '../../store/reducers/currency/slice'

const Convertor = ({ className, ...props }: ConvertorProps) => {
  const [baseCurrency, setBaseCurrency] = useState('UAH')
  const { data: currencyRates, isLoading, isError, isSuccess, error } = currencyApi.useFetchCurrencyRatesQuery(baseCurrency)

  const dispatch = useAppDispatch()
  const { availableCurrencyOptions, exchangeRate, fromCurrency, toCurrency } = useAppSelector(store => store.currency)
  const { getCurrencyRates, changeToCurrency } = currencySlice.actions

  const [amountFrom, setAmountFrom] = useState(1)
  const [amountTo, setAmountTo] = useState(1)

  const handleFromAmountChange = (newValue: number) => {
    setAmountFrom(newValue)
    setAmountTo(newValue * exchangeRate)
  }

  const handleToAmountChange = (newValue: number) => {
    setAmountFrom(newValue / exchangeRate)
    setAmountTo(newValue)
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(getCurrencyRates(currencyRates))
    }
  }, [currencyRates])

  useEffect(() => {
    handleFromAmountChange(amountFrom)
  }, [fromCurrency])

  useEffect(() => {
    handleFromAmountChange(amountFrom)
  }, [toCurrency])

  if (isLoading) {
    return <h1>{'Loading...'}</h1>
  }

  if (isError) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

      return (
        <div>
          <h1>{'An error has occurred:'}</h1>
          <h2>{errMsg}</h2>
        </div>
      )
    }
    return <h1>{error.message}</h1>
  }

  return (
    <div
      className={ cn(styles.convertorContainer, className) }
      { ...props }
    >
      <h2>{'Currency Converter'}</h2>
      <form action={ '' } className={ styles.convertorForm }>
        <Select
          currencyOptions={ availableCurrencyOptions }
          currentCurrency={ baseCurrency }
          onChange={ (event: ChangeEvent<HTMLSelectElement>) => setBaseCurrency(event.target.value) }
          title={ `exchange rate: ${exchangeRate}` }
          className={ styles.select }
        />
        <Input
          onChange={ (e) => handleFromAmountChange(Number(e.target.value)) }
          onFocus={ (e) => e.target.select() }
          className={ styles.input }
          value={ amountFrom }
        />

        <Select
          currencyOptions={ availableCurrencyOptions }
          currentCurrency={ toCurrency }
          onChange={ (event: ChangeEvent<HTMLSelectElement>) => dispatch(changeToCurrency(event.target.value)) }
          className={ styles.select }
          title={ `exchange rate: ${1 / exchangeRate}` }
        />
        <Input
          onChange={ (e) => handleToAmountChange(Number(e.target.value)) }
          className={ styles.input }
          onFocus={ (e) => e.target.select() }
          value={ amountTo }
        />
      </form>
    </div>
  )
}

export default Convertor
