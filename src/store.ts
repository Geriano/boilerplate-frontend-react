import { configureStore } from "@reduxjs/toolkit"
import layout from "./store/layout"

export const store = configureStore({
  reducer: {
    layout,
  },
  middleware: middleware => middleware({
    serializableCheck: false,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
