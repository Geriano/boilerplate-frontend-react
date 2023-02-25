import { configureStore } from "@reduxjs/toolkit"
import layout from "./store/layout"
import auth from "./store/auth"
import permission from "./store/permission"
import role from "./store/role"
import user from "./store/user"
import translation from "./store/translation"
import profile from "./store/profile"
import toast from "./store/toast"

export const store = configureStore({
  reducer: {
    auth,
    layout,
    permission,
    role,
    user,
    translation,
    profile,
    toast,
  },
  middleware: middleware => middleware({
    serializableCheck: false,
  })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
