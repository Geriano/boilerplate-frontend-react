import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { State } from "../_interfaces/profile"
import { RootState } from "../store"
import { AxiosError } from "axios"
import * as toast from "./toast"
import * as auth from './auth'
import profile from "../_services/profile"

export const name = 'profile'
export const initialState: State = {
  processing: false,
  form: {
    profile: {
      photo: null,
      name: '',
      username: '',
      email: '',
    },
    password: {
      old_password: '',
      password: '',
      password_confirmation: '',
    },
  },
  errors: {
    profile: {
      photo: '',
      name: '',
      username: '',
      email: '',
    },
    password: {
      old_password: '',
      password: '',
      password_confirmation: '',
    },
  },
}

export const updateProfileInformation = createAsyncThunk('profile/updateProfileInformation', async (_, api) => {
  const state = api.getState() as RootState
  const { processing, form } = state.profile

  if (processing) {
    return
  }

  try {
    api.dispatch(clearError({ type: 'profile' }))
    api.dispatch(process(true))
    const { response } = await profile.updateProfileInformation(form.profile)

    await api.dispatch(auth.relog())
    api.dispatch(toast.success(response.message))
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response!

      if (response.status === 422) {
        const data = response.data as {
          errors: {
            field: keyof State['errors']['profile']
            message: string
          }[]
        }

        data.errors.forEach(error => api.dispatch(
          setProfileError({
            key: error.field,
            value: error.message,
          })
        ))
      } else {
        const data = response.data
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

export const removeProfilePhoto = createAsyncThunk('profile/removeProfilePhoto', async (_, api) => {
  const state = api.getState() as RootState
  const { processing, form } = state.profile

  if (processing) {
    return
  }

  try {
    api.dispatch(clearError({ type: 'profile' }))
    api.dispatch(process(true))
    const { response } = await profile.removeProfilePhoto()

    await api.dispatch(auth.relog())
    api.dispatch(toast.success(response.message))
    api.dispatch(setProfileForm({
      key: 'photo',
      value: null,
    }))
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response!

      if (response.status === 422) {
        const data = response.data as {
          errors: {
            field: keyof State['errors']['profile']
            message: string
          }[]
        }

        data.errors.forEach(error => api.dispatch(
          setProfileError({
            key: error.field,
            value: error.message,
          })
        ))
      } else {
        const data = response.data
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

export const updatePassword = createAsyncThunk('profile/updatePassword', async (_, api) => {
  const state = api.getState() as RootState
  const { processing, form } = state.profile

  if (processing) {
    return
  }

  try {
    api.dispatch(clearError({ type: 'password' }))
    api.dispatch(process(true))
    const { response } = await profile.updatePassword(form.password)

    api.dispatch(toast.success(response.message))
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response!

      if (response.status === 422) {
        const data = response.data as {
          errors: {
            field: keyof State['errors']['password']
            message: string
          }[]
        }

        data.errors.forEach(error => api.dispatch(
          setPasswordError({
            key: error.field,
            value: error.message,
          })
        ))
      } else {
        const data = response.data
        api.dispatch(toast.error(data && data.message ? data.message : e.message))
      }
    } else {
      const error = e as Error
      api.dispatch(toast.error(error.message))
    }
  } finally {
    api.dispatch(process(false))
    api.dispatch(reset({
      type: 'password',
    }))
  }
})

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    process(state: State, { payload }: PayloadAction<boolean|undefined>) {
      state.processing = payload !== undefined ? payload : ! state.processing
    },
    setProfileForm<T extends keyof State['form']['profile'], U extends State['form']['profile'][T]>(state: State, { payload }: PayloadAction<{ key: T, value: U }>) {
      state.form.profile[payload.key] = payload.value
    },
    setPasswordForm<T extends keyof State['form']['password'], U extends State['form']['password'][T]>(state: State, { payload }: PayloadAction<{ key: T, value: U }>) {
      state.form.password[payload.key] = payload.value
    },
    reset<T extends keyof State['form'], U extends keyof State['form'][T]>(state: State, { payload }: PayloadAction<{ type: T|undefined, key?: U|undefined }>) {
      const { type, key } = payload

      if (type && key) {
        state.form[type][key] = initialState.form[type][key]
      } else if (type && ! key) {
        state.form[type] = initialState.form[type]
      } else {
        state.form = initialState.form
      }
    },
    setProfileError(state: State, { payload }: PayloadAction<{ key: keyof State['errors']['profile'], value: string }>) {
      state.errors.profile[payload.key] = payload.value
    },
    setPasswordError(state: State, { payload }: PayloadAction<{ key: keyof State['errors']['password'], value: string }>) {
      state.errors.password[payload.key] = payload.value
    },
    clearError<T extends keyof State['errors'], U extends keyof State['errors'][T]>(state: State, { payload }: PayloadAction<{ type: T|undefined, key?: U|undefined }>) {
      const { type, key } = payload

      if (type && key) {
        state.errors[type][key] = initialState.errors[type][key]
      } else if (type && ! key) {
        state.errors[type] = initialState.errors[type]
      } else {
        state.errors = initialState.errors
      }
    },
  },
})

export const { process, setProfileForm, setPasswordForm, reset, setProfileError, setPasswordError, clearError } = slice.actions

export default slice.reducer