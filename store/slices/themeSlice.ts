import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ThemeState {
  mode: 'light' | 'dark' | 'system'
  isDark: boolean
  primaryColor: string
  secondaryColor: string
  accentColor: string
}

const initialState: ThemeState = {
  mode: 'dark',
  isDark: true,
  primaryColor: 'oklch(0.45 0.18 264)',
  secondaryColor: 'oklch(0.50 0.15 200)',
  accentColor: 'oklch(0.55 0.16 45)',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.mode = action.payload
      
      if (action.payload === 'system') {
        state.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      } else {
        state.isDark = action.payload === 'dark'
      }
    },
    toggleTheme: (state) => {
      state.isDark = !state.isDark
      state.mode = state.isDark ? 'dark' : 'light'
    },
    setColors: (state, action: PayloadAction<{
      primary?: string
      secondary?: string
      accent?: string
    }>) => {
      if (action.payload.primary) state.primaryColor = action.payload.primary
      if (action.payload.secondary) state.secondaryColor = action.payload.secondary
      if (action.payload.accent) state.accentColor = action.payload.accent
    },
  },
})

export const { setThemeMode, toggleTheme, setColors } = themeSlice.actions
export default themeSlice.reducer
