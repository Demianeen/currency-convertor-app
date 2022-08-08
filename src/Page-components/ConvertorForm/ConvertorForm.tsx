import React, { ChangeEvent, useEffect, useState, FocusEvent } from 'react'
import { ConvertorProps } from './ConvertorForm.props'
import styles from './ConvertorForm.module.css'
import cn from 'classnames'
import { currencyApi } from '../../service/CurrencyServices'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Htag, P, Select, StyledNumberFormat } from '../../Components'
import { currencySlice } from '../../store/reducers/currency/slice'

const Convertor = ({ className, ...props }: ConvertorProps) => {
  const [baseCurrency, setBaseCurrency] = useState('UAH')
  // TODO: Currency select rerender every time
  const { data: currencyRates, isLoading, isFetching, isError, isSuccess, error } =
    currencyApi.useFetchCurrencyRatesQuery(baseCurrency)

  const dispatch = useAppDispatch()
  const { availableCurrencyOptions, exchangeRate, fromCurrency, toCurrency } =
    useAppSelector(store => store.currency)
  const { getCurrencyRates, changeToCurrency } = currencySlice.actions

  const theme = useAppSelector(store => store.theme)

  const [amountFrom, setAmountFrom] = useState(1)
  const [amountTo, setAmountTo] = useState(1)
  const [symbolFrom, setSymbolFrom] = useState('UAH')
  const [symbolTo, setSymbolTo] = useState('USD')

  const getCurrencySymbol = (currency: string) => {
    // ua-UA just to load page. Here can be any other local
    const res = (0).toLocaleString('ua-UA', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })
      .replace(/\d/g, '').trim()
    return res
  }

  const handleFromAmountChange = (newValue: string | number) => {
    const resultValue = typeof newValue === 'string'
      ? Number(newValue.match(/(\d+)+(\.\d+)?/g)!.join(''))
      : newValue

    setAmountFrom(resultValue)
    setAmountTo(Math.floor(resultValue * exchangeRate * 100) / 100)
  }

  const handleToAmountChange = (newValue: string | number) => {
    const resultValue = typeof newValue === 'string'
      ? Number(newValue.match(/(\d+)+(\.\d+)?/g)!.join(''))
      : newValue

    console.log(resultValue)

    setAmountTo(resultValue)
    setAmountFrom(Math.floor(resultValue / exchangeRate * 100) / 100)
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(getCurrencyRates(currencyRates))
    }
  }, [currencyRates])

  useEffect(() => {
    handleFromAmountChange(amountFrom)
    setSymbolFrom(getCurrencySymbol(fromCurrency) + ' ')
  }, [fromCurrency])

  useEffect(() => {
    handleFromAmountChange(amountFrom)
    setSymbolTo(getCurrencySymbol(toCurrency) + ' ')
  }, [toCurrency])

  if (isLoading) {
    return <Htag tag={ 'h2' } style={ { color: 'white' } }>{'Loading...'}</Htag>
  }

  if (isError) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

      return (
        <div>
          <Htag tag={ 'h1' }>{'An error has occurred:'}</Htag>
          <Htag tag={ 'h2' }>{errMsg}</Htag>
        </div>
      )
    }
    return <Htag tag={ 'h1' }>{error.message}</Htag>
  }

  return (
    <div className={ styles.wrapper }>
      <div
        className={ cn(styles.container, className, {
          [styles.darkContainer]: theme === 'dark',
          [styles.lightContainer]: theme === 'light'
        }) }
        { ...props }
      >
        <Htag tag={ 'h2' } className={ styles.h2 }>{isFetching ? 'Loading...' : 'Currency Converter'}</Htag>
        <form action={ '' } className={ styles.form }>
          <P className={ styles.p }>{'From'}</P>
          <Select
            currencyOptions={ availableCurrencyOptions }
            currentCurrency={ baseCurrency }
            onChange={ (event: ChangeEvent<HTMLSelectElement>) => setBaseCurrency(event.target.value) }
            title={ `exchange rate: ${exchangeRate}` }
            className={ styles.select }
          />
          <StyledNumberFormat
            onChange={ (e: ChangeEvent<HTMLInputElement>) => handleFromAmountChange(e.target.value) }
            onFocus={ (e: FocusEvent<HTMLInputElement, Element>) => e.target.select() }
            type={ 'tel' }
            allowEmptyFormatting={ true }
            thousandSeparator={ true }
            allowNegative={ false }
            prefix={ symbolFrom }
            value={ amountFrom }
          />

          <P className={ styles.p }>{'To'}</P>
          <Select
            currencyOptions={ availableCurrencyOptions }
            currentCurrency={ toCurrency }
            onChange={ (event: ChangeEvent<HTMLSelectElement>) => dispatch(changeToCurrency(event.target.value)) }
            className={ styles.select }
            title={ `exchange rate: ${1 / exchangeRate}` }
          />
          <StyledNumberFormat
            onChange={ (e: ChangeEvent<HTMLInputElement>) => handleToAmountChange(e.target.value) }
            onFocus={ (e: FocusEvent<HTMLInputElement, Element>) => e.target.select() }
            type={ 'tel' }
            allowEmptyFormatting={ true }
            thousandSeparator={ true }
            allowNegative={ false }
            prefix={ symbolTo }
            value={ amountTo }
          />
        </form>
      </div>
    </div>
  )
}

export default Convertor
