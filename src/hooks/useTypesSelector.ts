import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootReducer } from '../store/reducers/reducer'

export const useTypedSelector: TypedUseSelectorHook<RootReducer> = useSelector
