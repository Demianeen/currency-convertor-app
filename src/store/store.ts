import { currencyApi } from '../service/CurrencyServices'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { currencySlice } from './reducers/currency/slice'

export const rootReducer = combineReducers({
  [currencySlice.name]: currencySlice.reducer,
  [currencyApi.reducerPath]: currencyApi.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(currencyApi.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
