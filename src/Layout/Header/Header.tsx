import React, { useEffect, useState } from 'react'
import { HeaderProps } from './Header.props'
import styles from './Header.module.css'
import cn from 'classnames'
import { ThemeSwitcher } from '../../Components'
import { useAppSelector } from '../../hooks/redux'

const Header = ({ className, ...props }: HeaderProps) => {
  const { currencyRates } = useAppSelector(store => store.currency)

  const theme = useAppSelector(store => store.theme)

  const [rateUSD, setRateUSD] = useState<number | null>(null)
  const [rateEUR, setRateEUR] = useState<number | null>(null)

  // TODO: Change to useRef
  useEffect(() => {
    if (rateUSD == null) {
      setRateUSD(currencyRates.USD)
      setRateEUR(currencyRates.EUR)
    }
  }, [currencyRates])

  return (
    <header
      className={ cn(styles.header, className, {
        [styles.lightHeader]: theme === 'light',
        [styles.darkHeader]: theme === 'dark'
      }) }
      { ...props }
    >
      <div>{`USD/UAH: ${rateUSD ? Math.round(1 / rateUSD * 100) / 100 : 1}`}</div>
      <div>{`EUR/UAH: ${rateEUR ? Math.round(1 / rateEUR * 100) / 100 : 1}`}</div>
      <ThemeSwitcher />
    </header>
  )
}

export default Header
