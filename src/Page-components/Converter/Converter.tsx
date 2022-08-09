import React, { useEffect, useState } from 'react'
import { ConvertorProps } from './Converter.props'
import styles from './Converter.module.css'
import cn from 'classnames'
import { currencyApi } from '../../service/CurrencyServices'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ConverterForm, ErrorComponent, Htag } from '../../Components'
import { currencySlice } from '../../store/reducers/currency/slice'

const Converter = ({ className, ...props }: ConvertorProps) => {
  const [baseCurrency, setBaseCurrency] = useState('UAH')
  const changeBaseCurrency = (option: string | null) => {
    if (option) {
      setBaseCurrency(option)
    }
  }

  const { data: currencyRates, isSuccess, isLoading, isFetching, isError, error } =
    currencyApi.useFetchCurrencyRatesQuery(baseCurrency)

  const dispatch = useAppDispatch()
  const { getCurrencyRates } = currencySlice.actions

  useEffect(() => {
    if (isSuccess) {
      dispatch(getCurrencyRates(currencyRates))
    }
  }, [currencyRates])

  const theme = useAppSelector(store => store.theme)
  // TODO: Currency select rerender every time

  if (isError) {
    return (
      <div className={ styles.wrapper }>
        <ErrorComponent error={ error } />
      </div>
    )
  }

  return (
    <div className={ styles.wrapper }>
      <div
        className={ cn(styles.container, className, {
          [styles.lightContainer]: theme === 'light',
          [styles.darkContainer]: theme === 'dark'
        }) }
        { ...props }
      >
        {isLoading

          ? <Htag
            tag={ 'h2' }
            style={ theme === 'light' ? { color: 'black' } : { color: 'white' } }
          >
            {'Loading...'}
          </Htag>

          : <>
            <Htag tag={ 'h2' } className={ styles.h2 }>{isFetching ? 'Loading...' : 'Currency Converter'}</Htag>
            <ConverterForm changeFromCurrency={ changeBaseCurrency } />
          </>
        }
      </div>
    </div>
  )
}

export default Converter
