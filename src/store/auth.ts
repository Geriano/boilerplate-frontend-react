import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { LoginForm, LoginValidationError, State, User } from "../_interfaces/auth"
import axios, { AxiosError } from "axios"
import auth from "../_services/auth"
import { RootState } from "../store"

export const name = 'auth'
export const initialState: State = {
  authenticated: false,
  user: {
    id: '',
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
      }
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
    api.dispatch(clearError())
    api.dispatch(process(true))
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
      }
    } else {
      throw e
    }
  } finally {
    api.dispatch(process(false))
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, api) => {
  try {
    const { response } = await auth.logout()

    console.log(response)
  } catch (e) {
    if (e instanceof AxiosError === false) {
      throw e
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
  },
})

export const { process, authenticate, unauthenticate, set, reset, setError, clearError } = slice.actions

export default slice.reducer