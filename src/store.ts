import { configureStore } from "@reduxjs/toolkit"
import layout from "./store/layout"
import auth from "./store/auth"
import permission from "./store/permission"
import role from "./store/role"

export const store = configureStore({
  reducer: {
    auth,
    layout,
    permission,
    role,
  },
  middleware: middleware => middleware({
    serializableCheck: false,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
