import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { api } from '~/services/api'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
})

// 리스너 설정
setupListeners(store.dispatch)

// RootState와 AppDispatch 타입 export
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
