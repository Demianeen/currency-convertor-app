import { combineReducers } from 'redux'
import { currencyReducer } from './currency/reducer'

export const rootReducer = combineReducers({
  currency: currencyReducer
})

export type RootReducer = ReturnType<typeof rootReducer>
