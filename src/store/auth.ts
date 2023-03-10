import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { LoginForm, LoginValidationError, RegisterForm, State, User } from "../_interfaces/auth"
import { RootState } from "../store"
import axios, { AxiosError } from "axios"
import auth from "../_services/auth"
import * as toast from "./toast"

export const name = 'auth'
export const initialState: State = {
  authenticated: false,
  user: {
    id: '',
    profile_photo_path: '',
    name: '',
    username: '',
    email: '',
    permissions: [],
    roles: [],
  },
  token: localStorage.getItem('token') || '',
  processing: false,
  form: {
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
  },
  errors: {
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
  }
}

export const relog = createAsyncThunk('auth/relog', async (_, api) => {
  const state = api.getState() as RootState
  const token = state.auth.token

  if (!token) {
    return
  }

  if (state.auth.processing) {
    return
  }

  try {
    api.dispatch(process(true))
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    const { response: user } = await auth.user()
    api.dispatch(authenticate({
      user,
      token,
    }))
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response!.status === 401) {
        localStorage.removeItem('token')
        window.location.reload()
      } else {
        const { data } = e.response!
        api.dispatch(toast.error(data && data.message ? data.message : e.message))
      }
    } else {
      const error = e as Error
      api.dispatch(toast.error(error.message))
    }
  } finally {
    api.dispatch(process(false))
  }
})

export const login = createAsyncThunk('auth/login', async (_, api) => {
  const state = api.getState() as RootState
  const form = state.auth.form as LoginForm

  if (state.auth.processing) {
    return
  }
 
  try {
    api.dispatch(process(true))
    api.dispatch(clearError())
    const { response } = await auth.login(form)
    api.dispatch(authenticate(response))
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response!.status === 422) {
        const { data: response } = e.response! as LoginValidationError

        response.errors.forEach(error => api.dispatch(setError({
          key: error.field,
          value: error.message,
        })))
      } else {
        const { data } = e.response!
        api.dispatch(toast.error(data && data.message ? data.message : e.message))
      }
    } else {
      const error = e as Error
      api.dispatch(toast.error(error.message))
    }
  } finally {
    api.dispatch(process(false))
  }
})

export const register = createAsyncThunk('auth/register', async (_, api) => {
  const state = api.getState() as RootState
  const form = state.auth.form as RegisterForm

  if (state.auth.processing) {
    return
  }
 
  try {
    api.dispatch(process(true))
    api.dispatch(clearError())
    const { response } = await auth.register(form)
    api.dispatch(toast.success(response.message))
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response!.status === 422) {
        const { data: response } = e.response! as LoginValidationError

        response.errors.forEach(error => api.dispatch(setError({
          key: error.field,
          value: error.message,
        })))
      } else {
        const { data } = e.response!
        api.dispatch(toast.error(data && data.message ? data.message : e.message))
      }
    } else {
      const error = e as Error
      api.dispatch(toast.error(error.message))
    }
  } finally {
    api.dispatch(process(false))
    api.dispatch(reset())
  }
})

export const verify = createAsyncThunk('auth/verify', async (token: string, api) => {
  const state = api.getState() as RootState
  const { processing } = state.auth

  if (processing) {
    return
  }

  try {
    api.dispatch(process(true))
    api.dispatch(clearError())
    const { response } = await auth.verify(token)
    api.dispatch(toast.success(response.message))
    
    setTimeout(() => {
      window.open(import.meta.env.VITE_APP_URL, '_self')
      api.dispatch(reset())
      api.dispatch(process(false))
    }, 1000)

    return true
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response!

      if (response.status === 422) {
        const data = response.data as {
          errors: {
            field: keyof State['errors']
            message: string
          }[]
        }

        data.errors.forEach(error => {
          api.dispatch(setError({
            key: error.field,
            value: error.message,
          }))
        })
      } else {
        api.dispatch(toast.error(response.data.message))
      }
    } else {
      const error = e as Error
      api.dispatch(toast.error(error.message))
    }

    api.dispatch(process(false))

    return false
  }
})

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (_, api) => {
  const state = api.getState() as RootState
  const { processing, form } = state.auth

  if (processing) {
    return
  }

  try {
    api.dispatch(process(true))
    api.dispatch(clearError())
    const { response } = await auth.forgotPassword(form.email)
    api.dispatch(toast.success(response.message))
    api.dispatch(process(false))
    api.dispatch(reset())

    return true
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response!

      if (response.status === 422) {
        const data = response.data as {
          errors: {
            field: keyof State['errors']
            message: string
          }[]
        }

        data.errors.forEach(error => {
          api.dispatch(setError({
            key: error.field,
            value: error.message,
          }))
        })
      } else {
        api.dispatch(toast.error(response.data.message))
      }
    } else {
      const error = e as Error
      api.dispatch(toast.error(error.message))
    }

    api.dispatch(process(false))

    return false
  }
})

export const resetPassword = createAsyncThunk('auth/resetPassword', async (_, api) => {
  const state = api.getState() as RootState
  const { processing, form } = state.auth

  if (processing) {
    return
  }

  try {
    api.dispatch(process(true))
    api.dispatch(clearError())
    const { response } = await auth.resetPassword(form)
    api.dispatch(toast.success(response.message))
    api.dispatch(process(false))
    api.dispatch(reset())

    return true
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response!

      if (response.status === 422) {
        const data = response.data as {
          errors: {
            field: keyof State['errors']
            message: string
          }[]
        }

        data.errors.forEach(error => {
          api.dispatch(setError({
            key: error.field,
            value: error.message,
          }))
        })
      } else {
        api.dispatch(toast.error(response.data.message))
      }
    } else {
      const error = e as Error
      api.dispatch(toast.error(error.message))
    }

    api.dispatch(process(false))

    return false
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, api) => {
  try {
    const { response } = await auth.logout()

    api.dispatch(toast.success(response.message))
  } catch (e) {
    if (e instanceof AxiosError === false) {
      const error = e as Error
      api.dispatch(toast.error(error.message))
    }
  } finally {
    api.dispatch(unauthenticate())
  }
})

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    process(state, { payload }: PayloadAction<boolean|undefined>) {
      state.processing = payload ? payload : !state.processing
    },
    authenticate(state: State, { payload }: PayloadAction<{ user: User, token: string }>) {
      state.user = payload.user
      state.token = payload.token
      state.authenticated = true

      localStorage.setItem('token', state.token)
      axios.defaults.headers.common.Authorization = `Bearer ${state.token}`
    },
    unauthenticate(state: State) {
      state.user = initialState.user
      state.token = initialState.token
      state.authenticated = false

      localStorage.removeItem('token')
      axios.defaults.headers.common.Authorization = undefined
    },
    set<T extends keyof State['form']>(state: State, { payload }: PayloadAction<{ key: T, value: State['form'][T] }>) {
      state.form[payload.key] = payload.value
    },
    reset<T extends keyof State['form']>(state: State, { payload }: PayloadAction<T|undefined>) {
      if (payload) {
        state.form[payload] = ''
      } else {
        state.form = initialState.form
      }
    },
    setError<T extends keyof State['errors']>(state: State, { payload }: PayloadAction<{ key: T, value: string }>) {
      state.errors[payload.key] = payload.value
    },
    clearError<T extends keyof State['errors']>(state: State, { payload }: PayloadAction<T|undefined>) {
      if (payload) {
        state.errors[payload] = ''
      } else {
        state.errors = initialState.errors
      }
    },
    removeProfilePhoto(state: State) {
      state.user.profile_photo_path = null
    },
  },
})

export const { process, authenticate, unauthenticate, set, reset, setError, clearError, removeProfilePhoto } = slice.actions

export default slice.reducer