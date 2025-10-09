import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  isOpen: boolean
  type: 'contact' | 'project' | 'service' | null
  data: any
  isLoading: boolean
}

const initialState: ModalState = {
  isOpen: false,
  type: null,
  data: null,
  isLoading: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{
      type: 'contact' | 'project' | 'service'
      data?: any
    }>) => {
      state.isOpen = true
      state.type = action.payload.type
      state.data = action.payload.data || null
    },
    closeModal: (state) => {
      state.isOpen = false
      state.type = null
      state.data = null
      state.isLoading = false
    },
    setModalLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { openModal, closeModal, setModalLoading } = modalSlice.actions
export default modalSlice.reducer
