import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Permission, State, ValidationErrorResponse } from "../_interfaces/permission"
import permission from "../_services/permission"
import { RootState } from "../store"
import { AxiosError } from "axios"
import { ErrorResponse } from "../_interfaces/response"
import Swal from "sweetalert2"

export const name = 'permission'
export const initialState: State = {
  open: false,
  processing: false,
  permissions: [],
  form: {
    id: '',
    name: '',
    key: '',
  },
  errors: {
    name: '',
    key: '',
  },
}

export const all = createAsyncThunk('permission/all', async (_, api) => {
  const state = api.getState() as RootState
  const { processing } = state.permission

  if (processing) {
    return
  }

  try {
    api.dispatch(process(true))
    const { response } = await permission.all()
    api.dispatch(permissions(response))
  } catch (e) {
    if (e instanceof AxiosError === false) {
      throw e
    }
  } finally {
    api.dispatch(process(false))
  }
})

export const store = createAsyncThunk('permission/store', async (_, api) => {
  const state = api.getState() as RootState
  const { processing, form } = state.permission

  if (processing) {
    return
  }

  try {
    api.dispatch(clearError())
    api.dispatch(process(true))
    const { response } = await permission.store(form)

    console.log(response)
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response! as ErrorResponse<unknown>

      if (response.status === 422) {
        const data = response.data as ValidationErrorResponse

        data.errors.forEach(error => {
          api.dispatch(setError({
            key: error.field,
            value: error.message,
          }))
        })
      } else {
        throw e
      }
    } else {
      throw e
    }
  } finally {
    api.dispatch(process(false))
    await api.dispatch(all())
    api.dispatch(toggle(false))
  }
})

export const update = createAsyncThunk('permission/update', async (_, api) => {
  const state = api.getState() as RootState
  const { processing, form } = state.permission

  if (processing) {
    return
  }

  try {
    api.dispatch(clearError())
    api.dispatch(process(true))
    const { response } = await permission.update(form.id!, form)

    console.log(response)
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response! as ErrorResponse<unknown>

      if (response.status === 422) {
        const data = response.data as ValidationErrorResponse

        data.errors.forEach(error => {
          api.dispatch(setError({
            key: error.field,
            value: error.message,
          }))
        })
      } else {
        throw e
      }
    } else {
      throw e
    }
  } finally {
    api.dispatch(process(false))
    await api.dispatch(all())
    api.dispatch(toggle(false))
  }
})

export const destroy = createAsyncThunk('permission/destroy', async (id: string, api) => {
  const state = api.getState() as RootState
  const { processing } = state.permission

  if (processing) {
    return
  }

  api.dispatch(toggle(false))

  try {
    api.dispatch(clearError())
    api.dispatch(process(true))
    const { isConfirmed } = await Swal.fire({
      title: `are you sure?`,
      text: `you can't revert your action after deleted`,
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
    })

    if (isConfirmed) {
      const { response } = await permission.destroy(id)
  
      console.log(response)
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response! as ErrorResponse<unknown>

      if (response.status === 422) {
        const data = response.data as ValidationErrorResponse

        data.errors.forEach(error => {
          api.dispatch(setError({
            key: error.field,
            value: error.message,
          }))
        })
      } else {
        throw e
      }
    } else {
      throw e
    }
  } finally {
    api.dispatch(process(false))
    api.dispatch(toggle(false))
    await api.dispatch(all())
  }
})

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    process(state: State, { payload }: PayloadAction<boolean|undefined>) {
      state.processing = payload ? payload : ! state.processing
    },
    permissions(state: State, { payload }: PayloadAction<Permission[]>) {
      state.permissions = payload
    },
    edit(state: State, { payload }: PayloadAction<Permission>) {
      state.form.id = payload.id
      state.form.name = payload.name
      state.form.key = payload.key
      state.open = true
    },
    set<T extends keyof State['form']>(state: State, { payload }: PayloadAction<{ key: T, value: State['form'][T] }>) {
      state.form[payload.key] = payload.value
    },
    reset<T extends keyof State['form']>(state: State, { payload }: PayloadAction<T|undefined>) {
      if (payload) {
        state.form[payload] = initialState.form[payload]
      } else {
        state.form = initialState.form
      }
    },
    setError<T extends keyof State['errors']>(state: State, { payload }: PayloadAction<{ key: T, value: string }>) {
      state.errors[payload.key] = payload.value
    },
    clearError<T extends keyof State['errors']>(state: State, { payload }: PayloadAction<T|undefined>) {
      if (payload) {
        state.errors[payload] = initialState.errors[payload]
      } else {
        state.errors = initialState.errors
      }
    },
    toggle(state: State, { payload }: PayloadAction<boolean|undefined>) {
      state.open = payload ? payload : ! state.open

      if (!state.open && state.form.id) {
        state.form = initialState.form
      }
    },
  },
})

export const { process, permissions, edit, set, reset, setError, clearError, toggle } = slice.actions

export default slice.reducer