import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NavigationState {
  activeSection: string
  isScrolled: boolean
  isMobileMenuOpen: boolean
  scrollProgress: number
}

const initialState: NavigationState = {
  activeSection: 'bosh',
  isScrolled: false,
  isMobileMenuOpen: false,
  scrollProgress: 0,
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload
    },
    setScrolled: (state, action: PayloadAction<boolean>) => {
      state.isScrolled = action.payload
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload
    },
    setScrollProgress: (state, action: PayloadAction<number>) => {
      state.scrollProgress = action.payload
    },
  },
})

export const { 
  setActiveSection, 
  setScrolled, 
  toggleMobileMenu, 
  setMobileMenuOpen, 
  setScrollProgress 
} = navigationSlice.actions

export default navigationSlice.reducer
