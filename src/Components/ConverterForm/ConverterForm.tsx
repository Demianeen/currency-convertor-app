import React, { FocusEvent, ChangeEvent, memo, useEffect, useState } from 'react'
// import Select, { components, SingleValue, SingleValueProps } from 'react-select'
import { Label, StyledNumberFormat, StyledSelect } from '..'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ConverterProps } from './ConverterForm.props'
import styles from './ConverterForm.module.css'
import { currencySlice } from '../../store/reducers/currency/slice'

const ConverterForm = ({ changeFromCurrency }: ConverterProps) => {
  const dispatch = useAppDispatch()
  const { availableCurrencyOptions, exchangeRate, fromCurrency, toCurrency } =
    useAppSelector(store => store.currency)
  const { changeToCurrency } = currencySlice.actions

  const [amountFrom, setAmountFrom] = useState(1)
  const [amountTo, setAmountTo] = useState(1)
  const [symbolFrom, setSymbolFrom] = useState('UAH')
  const [symbolTo, setSymbolTo] = useState('USD')

  const getCurrencySymbol = (currency: string) => {
    // ua-UA just to load page. Here can be any other local
    if (!currency) return
    const res = (0)
      .toLocaleString('ua-UA',
        {
          style: 'currency',
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
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
    handleToAmountChange(amountTo)
    setSymbolTo(getCurrencySymbol(toCurrency) + ' ')
  }, [toCurrency])

  // TODO: Make all form with mui components
  return (<form className={ styles.form }>
    <Label id={ 'fromCurrency' } className={ styles.label }>{'From'}</Label>
    {/* TODO: Input a e.target.select() without select currency prefix */}
    <StyledSelect
      currencyOptions={ availableCurrencyOptions }
      currentCurrency={ fromCurrency }
      onChange={ (e) => changeFromCurrency(e.target.value as string) }
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

    <Label htmlFor={ 'toCurrency' } className={ styles.label }>{'To'}</Label>
    <StyledSelect
      currencyOptions={ availableCurrencyOptions }
      currentCurrency={ toCurrency }
      onChange={ (e) => dispatch(changeToCurrency((e.target.value as string))) }
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
