import React, { FocusEvent, ChangeEvent, memo, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { currencySlice } from '../../store/reducers/currency/slice'
import P from '../P/P'
import Select from '../Select/Select'
import StyledNumberFormat from '../StyledNumberFormat/StyledNumberFormat'
import { ConverterProps } from './Converter.props'
import styles from './ConverterForm.module.css'

const ConverterForm = ({ changeFromCurrency }: ConverterProps) => {
  const dispatch = useAppDispatch()
  const { availableCurrencyOptions, exchangeRate, fromCurrency, toCurrency } =
    useAppSelector(store => store.currency)
  const { changeToCurrency } = currencySlice.actions

  // TODO: Change to useRef
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
    setAmountTo(resultValue)
    setAmountFrom(Math.floor(resultValue / exchangeRate * 100) / 100)
  }

  useEffect(() => {
    handleFromAmountChange(amountFrom)
    setSymbolFrom(getCurrencySymbol(fromCurrency) + ' ')
  }, [fromCurrency])

  useEffect(() => {
    handleFromAmountChange(amountFrom)
    setSymbolTo(getCurrencySymbol(toCurrency) + ' ')
  }, [toCurrency])

  return (<form action={ '' } className={ styles.form }>
    <P className={ styles.p }>{'From'}</P>
    <Select
      currencyOptions={ availableCurrencyOptions }
      currentCurrency={ fromCurrency }
      onChange={ (event: ChangeEvent<HTMLSelectElement>) => changeFromCurrency(event.target.value) }
      title={ `exchange rate: ${exchangeRate}` }
      className={ styles.select }
    />
    {/* TODO: Input a e.target.select() without select currency prefix */}
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
  </form>)
}

export default memo(ConverterForm)
