import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Role, State, ValidationErrorResponse } from "../_interfaces/role"
import { createInitialPaginatedState, createInitialPaginatorState } from "../helper"
import { Paginated } from "../_interfaces/pagination"
import { RootState } from "../store"
import { AxiosError } from "axios"
import { ErrorResponse } from "../_interfaces/response"
import { Permission } from "../_interfaces/permission"
import role from "../_services/role"
import Swal from "sweetalert2"
import * as toast from "./toast"

export const name = 'role'
export const initialState: State = {
  timeout: null,
  processing: false,
  open: {
    form: false,
    list: false,
  },
  paginator: createInitialPaginatorState('key'),
  paginated: createInitialPaginatedState<Role>(),
  form: {
    id: '',
    name: '',
    key: '',
    permissions: [],
  },
  errors: {
    id: '',
    name: '',
    key: '',
    permissions: '',
  },
}

export const paginate = createAsyncThunk('role/paginate', async (_, api) => {
  const state = api.getState() as RootState
  const { paginator } = state.role

  state.role.timeout && clearTimeout(state.role.timeout)
  api.dispatch(timeout(
    setTimeout(async () => {
      try {
        const { response } = await role.paginate(paginator)
        api.dispatch(paginated(response))
      } catch (e) {
        if (e instanceof AxiosError) {
          const { status, data } = e.response!

          if (status !== 422) {
            api.dispatch(toast.error(data && data.message ? data.message : e.message))
          }
        } else {
          const error = e as Error
          api.dispatch(toast.error(error.message))
        }
      }
    }, 200)
  ))
})

export const limit = createAsyncThunk('role/limit', async (limit: number, api) => {
  api.dispatch(slice.actions.limit(limit))
  await api.dispatch(paginate())
})

export const search = createAsyncThunk('role/search', async (search: string, api) => {
  api.dispatch(slice.actions.search(search))
  await api.dispatch(paginate())
})

export const previous = createAsyncThunk('role/previous', async (_, api) => {
  const state = api.getState() as RootState
  const { paginated } = state.role

  if (paginated.meta.current_page - 1 < 1) {
    return
  }

  api.dispatch(slice.actions.previous())
  await api.dispatch(paginate())
})

export const next = createAsyncThunk('role/next', async (_, api) => {
  const state = api.getState() as RootState
  const { paginated } = state.role

  if (paginated.meta.current_page + 1 > paginated.meta.last_page) {
    return
  }

  api.dispatch(slice.actions.next())
  await api.dispatch(paginate())
})

export const store = createAsyncThunk('role/store', async (_, api) => {
  const state = api.getState() as RootState
  const { processing, form } = state.role

  if (processing) {
    return
  }

  try {
    api.dispatch(clearError())
    api.dispatch(process(true))
    const { response } = await role.store(form)

    api.dispatch(toast.success(response.message))
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response! as ErrorResponse<any>

      if (response.status === 422) {
        const data = response.data as ValidationErrorResponse

        data.errors.forEach(error => {
          api.dispatch(setError({
            key: error.field,
            value: error.message,
          }))
        })
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
    await api.dispatch(paginate())
    api.dispatch(toggle({
      type: 'form',
      open: false,
    }))
  }
})

export const update = createAsyncThunk('role/update', async (_, api) => {
  const state = api.getState() as RootState
  const { processing, form } = state.role

  if (processing) {
    return
  }

  try {
    api.dispatch(clearError())
    api.dispatch(process(true))
    const { response } = await role.update(form.id!, form)

    api.dispatch(toast.success(response.message))
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response! as ErrorResponse<any>

      if (response.status === 422) {
        const data = response.data as ValidationErrorResponse

        data.errors.forEach(error => {
          api.dispatch(setError({
            key: error.field,
            value: error.message,
          }))
        })
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
    await api.dispatch(paginate())
    api.dispatch(toggle({
      type: 'form',
      open: false,
    }))
  }
})

export const destroy = createAsyncThunk('role/destroy', async (id: string, api) => {
  const state = api.getState() as RootState
  const { processing } = state.role

  if (processing) {
    return
  }

  api.dispatch(toggle({
    type: 'form',
    open: false,
  }))

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
      const { response } = await role.destroy(id)
  
      api.dispatch(toast.success(response.message))
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response! as ErrorResponse<any>

      if (response.status === 422) {
        const data = response.data as ValidationErrorResponse

        data.errors.forEach(error => {
          api.dispatch(setError({
            key: error.field,
            value: error.message,
          }))
        })
      } else {
        const error = e as Error
        api.dispatch(toast.error(error.message))
      }
    } else {
      const error = e as Error
      api.dispatch(toast.error(error.message))
    }
  } finally {
    api.dispatch(process(false))
    await api.dispatch(paginate())
    api.dispatch(toggle({
      type: 'form',
      open: false,
    }))
  }
})

export const togglePermission = createAsyncThunk('role/togglePermission', async (payload: { role: Role, permission: Permission }, api) => {
  try {
    const { response } = await role.togglePermission(payload.role.id, payload.permission.id)
    api.dispatch(toast.success(response.message))
  } catch (e) {
    if (e instanceof AxiosError) {
      const { data } = e.response!
      api.dispatch(toast.success(data && data.message ? data.message : e.message))
    } else {
      const error = e as Error
      api.dispatch(toast.error(error.message))
    }
  } finally {
    await api.dispatch(paginate())
  }
})

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    limit(state: State, { payload }: PayloadAction<number>) {
      state.paginator.limit = payload
    },
    search(state: State, { payload }: PayloadAction<string>) {
      state.paginator.search = payload
    },
    previous(state: State) {
      state.paginator.page--
    },
    next(state: State) {
      state.paginator.page++
    },
    edit(state: State, { payload }: PayloadAction<Role>) {
      state.form.id = payload.id
      state.form.name = payload.name
      state.form.key = payload.key

      state.open.form = true
    },
    timeout(state: State, { payload }: PayloadAction<number>) {
      state.timeout = payload
    },
    process(state: State, { payload }: PayloadAction<boolean|undefined>) {
      state.processing = payload ? payload : ! state.processing
    },
    toggle<T extends keyof State['open']>(state: State, { payload }: PayloadAction<{ type: T, open: boolean|undefined }>) {
      const { type, open } = payload
      state.open[type] = open ? open : ! state.open[type]

      if (!state.open[type]) {
        state.form = initialState.form
      }
    },
    paginated(state: State, { payload }: PayloadAction<Paginated<Role>>) {
      state.paginated = payload
    },
    set<T extends keyof State['form'], U extends State['form'][T]>(state: State, { payload }: PayloadAction<{ key: T, value: U }>) {
      const { key, value } = payload
      state.form[key] = value
    },
    reset<T extends keyof State['form']|undefined>(state: State, { payload }: PayloadAction<T>) {
      if (payload) {
        state.form[payload] = initialState.form[payload]
      } else {
        state.form = initialState.form
      }
    },
    setError<T extends keyof State['errors']>(state: State, { payload }: PayloadAction<{ key: T, value: string }>) {
      state.errors[payload.key] = payload.value
    },
    clearError<T extends keyof State['errors']|undefined>(state: State, { payload }: PayloadAction<T>) {
      if (payload) {
        state.errors[payload] = initialState.errors[payload]
      } else {
        state.errors = initialState.errors
      }
    },
  },
})

export const { edit, timeout, process, toggle, paginated, set, reset, setError, clearError } = slice.actions

export default slice.reducer