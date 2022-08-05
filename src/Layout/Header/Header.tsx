import React, { useEffect, useState } from 'react'
import { HeaderProps } from './Header.props'
import styles from './Header.module.css'
import cn from 'classnames'
import { useAppSelector } from '../../hooks/redux'

const Header = ({ className, ...props }: HeaderProps) => {
  const { currencyRates } = useAppSelector(store => store.currency)

  const [rateUSD, setRateUSD] = useState<number | null>(null)
  const [rateEUR, setRateEUR] = useState<number | null>(null)

  useEffect(() => {
    if (rateUSD == null) {
      setRateUSD(currencyRates.USD)
      setRateEUR(currencyRates.EUR)
    }
  }, [currencyRates])

  return (
    <header
      className={ cn(styles.header, className) }
      { ...props }
    >
      <p>{`USD/UAH: ${rateUSD ? Math.round(1 / rateUSD * 100) / 100 : 1}`}</p>
      <p>{`EUR/UAH: ${rateEUR ? Math.round(1 / rateEUR * 100) / 100 : 1}`}</p>
    </header>
  )
}

export default Header
