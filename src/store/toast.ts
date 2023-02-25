import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"
import { RootState } from "../store"

export const name = 'toast'

export const initialState = {
  position: 'top-end' as 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end',
  timer: 5000,
}

const localStorageState = localStorage.getItem(name)

export const Toast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

export const success = createAsyncThunk('toast/success', async (text: string, api) => {
  const state = api.getState() as RootState
  const { position, timer } = state.toast

  return await Toast.fire({
    position,
    timer,
    text,
    icon: 'success',
  })
})

export const error = createAsyncThunk('toast/error', async (text: string, api) => {
  const state = api.getState() as RootState
  const { position, timer } = state.toast

  return await Toast.fire({
    position,
    timer,
    text,
    icon: 'error',
  })
})

export const info = createAsyncThunk('toast/info', async (text: string, api) => {
  const state = api.getState() as RootState
  const { position, timer } = state.toast

  return await Toast.fire({
    position,
    timer,
    text,
    icon: 'info',
  })
})

export const warning = createAsyncThunk('toast/warning', async (text: string, api) => {
  const state = api.getState() as RootState
  const { position, timer } = state.toast

  return await Toast.fire({
    position,
    timer,
    text,
    icon: 'warning',
  })
})

type State = typeof initialState

export const slice = createSlice({
  name,
  initialState: localStorageState ? JSON.parse(localStorageState) as typeof initialState : initialState,
  reducers: {
    position(state: State, { payload }: PayloadAction<State['position']>) {
      state.position = payload

      localStorage.setItem(name, JSON.stringify(state))
    },
    timer(state: State, { payload }: PayloadAction<number>) {
      state.timer = payload
    },
  },
})

export const { position } = slice.actions

export default slice.reducer