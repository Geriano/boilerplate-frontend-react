import { configureStore } from "@reduxjs/toolkit"
import layout from "./store/layout"
import auth from "./store/auth"

export const store = configureStore({
  reducer: {
    auth,
    layout,
  },
  middleware: middleware => middleware({
    serializableCheck: false,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
