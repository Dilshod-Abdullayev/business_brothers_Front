import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LanguageState {
  currentLanguage: string
  availableLanguages: Array<{
    code: string
    name: string
    flag: string
  }>
  isLoading: boolean
}

const initialState: LanguageState = {
  currentLanguage: 'uz',
  availableLanguages: [
    { code: 'uz', name: 'Oʻzbek', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ],
  isLoading: false,
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload
      state.isLoading = true
    },
    setLanguageSuccess: (state) => {
      state.isLoading = false
    },
    setLanguageError: (state) => {
      state.isLoading = false
    },
  },
})

export const { setLanguage, setLanguageSuccess, setLanguageError } = languageSlice.actions
export default languageSlice.reducer
