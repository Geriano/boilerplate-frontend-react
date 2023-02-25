import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { State } from "../_interfaces/layout"

export const name = 'layout'
export const initialState: State = {
  open: {
    sidebar: true,
    dropdown: false,
  },
  theme: 'primary',
}
export const localStorageState = localStorage.getItem('layout')

export const slice = createSlice({
  name,
  initialState: localStorageState ? JSON.parse(localStorageState) as State : initialState,
  reducers: {
    toggle(state: State, { payload }: PayloadAction<keyof State['open']>) {
      state.open[payload] = !state.open[payload]

      store(state)
    },
    theme(state: State, { payload }: PayloadAction<State['theme']>) {
      state.theme = payload

      store(state)
    }
  },
})

const store = (state: State) => localStorage.setItem(name, JSON.stringify(state))

export const { toggle, theme } = slice.actions
export default slice.reducer