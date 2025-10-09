import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './slices/languageSlice'
import themeReducer from './slices/themeSlice'
import modalReducer from './slices/modalSlice'
import navigationReducer from './slices/navigationSlice'

export const store = configureStore({
  reducer: {
    language: languageReducer,
    theme: themeReducer,
    modal: modalReducer,
    navigation: navigationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
