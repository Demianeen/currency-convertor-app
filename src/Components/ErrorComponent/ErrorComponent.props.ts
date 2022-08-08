import { SerializedError } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface HtagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  error: FetchBaseQueryError | SerializedError
}
