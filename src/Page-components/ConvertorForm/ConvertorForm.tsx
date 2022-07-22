import React, { ChangeEvent, useEffect, useState } from 'react'
import { ConvertorProps } from './ConvertorForm.props'
import styles from './ConvertorForm.module.css'
import cn from 'classnames'
import { Input, Select } from '../../Components'
import { useTypedSelector } from '../../hooks/useTypesSelector'
import { useAction } from '../../hooks/useAction'

const Convertor = ({ className, ...props }: ConvertorProps) => {
  const { availableCurrencyOptions, exchangeRate, fromCurrency, toCurrency, error } = useTypedSelector(store => store.currency)
  const { getCurrencyRates, changeToCurrency, changeFromCurrency } = useAction()

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
    getCurrencyRates()
  }, [])

  useEffect(() => {
    handleFromAmountChange(amountFrom)
  }, [fromCurrency])

  useEffect(() => {
    // handleToAmountChange
    handleFromAmountChange(amountFrom)
  }, [toCurrency])

  if (error) {
    return <h1>{'error'}</h1>
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
          currentCurrency={ fromCurrency }
          onChange={ (event: ChangeEvent<HTMLSelectElement>) => changeFromCurrency(event.target.value) }
          title={ `exchange rate: ${1 / exchangeRate}` }
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
          onChange={ (event: ChangeEvent<HTMLSelectElement>) => changeToCurrency(event.target.value) }
          className={ styles.select }
          title={ `exchange rate: ${exchangeRate}` }
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
