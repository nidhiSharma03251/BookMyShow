import { configureStore } from '@reduxjs/toolkit'
import { baseAppApi } from '../services/baseServices'

export const store = configureStore({
  reducer: {
    [baseAppApi.reducerPath] : baseAppApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseAppApi.middleware)
})