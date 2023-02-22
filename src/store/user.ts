import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { OrderColumn, State, User, ValidationErrorResponse } from "../_interfaces/user"
import { createInitialPaginatedState, createInitialPaginatorState } from "../helper"
import { Paginated } from "../_interfaces/pagination"
import { RootState } from "../store"
import user from "../_services/user"
import { AxiosError } from "axios"
import { ErrorResponse } from "../_interfaces/response"
import Swal from "sweetalert2"

export const name = 'user'
export const initialState: State = {
  timeout: null,
  processing: false,
  open: false,
  paginator: createInitialPaginatorState('name'),
  paginated: createInitialPaginatedState<User>(),
  form: {
    id: '',
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    permissions: [],
    roles: [],
  },
  errors: {
    id: '',
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    permissions: '',
    roles: '',
  },
}

export const paginate = createAsyncThunk('user/paginate', async (_, api) => {
  const state = api.getState() as RootState
  const { timeout, paginator } = state.user

  timeout && clearTimeout(timeout)
  api.dispatch(slice.actions.timeout(
    setTimeout(async () => {
      const { response } = await user.paginate(paginator)
      api.dispatch(slice.actions.paginated(response))
    }, 200)
  ))
})

export const search = createAsyncThunk('user/search', async (search: string, api) => {
  api.dispatch(slice.actions.search(search))
  await api.dispatch(paginate())
})

export const limit = createAsyncThunk('user/limit', async (limit: number, api) => {
  api.dispatch(slice.actions.limit(limit))
  await api.dispatch(paginate())
})

export const order = createAsyncThunk('user/order', async (key: OrderColumn, api) => {
  const state = api.getState() as RootState
  const paginator = state.user.paginator
  const dir = paginator.order.key === key ? (paginator.order.dir === 'asc' ? 'desc' : 'asc') : 'asc'
  api.dispatch(slice.actions.order({
    dir, key,
  }))

  await api.dispatch(paginate())
})

export const previous = createAsyncThunk('user/previous', async (_, api) => {
  const state = api.getState() as RootState
  const page = state.user.paginator.page

  if (page - 1 < 1) {
    return
  }

  api.dispatch(slice.actions.previous())
  await api.dispatch(paginate())
})

export const next = createAsyncThunk('user/next', async (_, api) => {
  const state = api.getState() as RootState
  const paginated = state.user.paginated
  const page = state.user.paginator.page

  if (page + 1 > paginated.meta.last_page) {
    return
  }

  api.dispatch(slice.actions.next())
  await api.dispatch(paginate())
})

export const store = createAsyncThunk('user/store', async (_, api) => {
  const state = api.getState() as RootState
  const { processing, form } = state.user

  if (processing) {
    return
  }

  try {
    api.dispatch(process(true))
    const { response } = await user.store(form)

    console.log(response)
    api.dispatch(toggle(false))
    api.dispatch(clearError())
    api.dispatch(reset())
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
    await api.dispatch(paginate())
  }
})

export const update = createAsyncThunk('user/update', async (_, api) => {
  const state = api.getState() as RootState
  const { processing, form } = state.user

  if (processing) {
    return
  }

  try {
    api.dispatch(process(true))
    const { response } = await user.update(form.id!, form)

    console.log(response)
    api.dispatch(toggle(false))
    api.dispatch(clearError())
    api.dispatch(reset())
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response! as ErrorResponse<unknown>

      console.log(response)

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
    await api.dispatch(paginate())
  }
})

export const destroy = createAsyncThunk('user/destroy', async (id: string, api) => {
  const state = api.getState() as RootState
  const { processing } = state.user

  if (processing) {
    return
  }

  try {
    api.dispatch(clearError())
    api.dispatch(process(true))
    api.dispatch(toggle(false))
    const { isConfirmed } = await Swal.fire({
      title: `are you sure?`,
      text: `you can't revert your action after deleted`,
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
    })

    if (isConfirmed) {
      const { response } = await user.destroy(id)
  
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
    await api.dispatch(paginate())
    api.dispatch(toggle(false))
  }
})

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    timeout(state: State, { payload }: PayloadAction<number|null>) {
      state.timeout = payload
    },
    search(state: State, { payload }: PayloadAction<string>) {
      state.paginator.search = payload
    },
    limit(state: State, { payload }: PayloadAction<number>) {
      state.paginator.limit = payload
    },
    previous(state: State) {
      state.paginator.page--
    },
    next(state: State) {
      state.paginator.page++
    },
    order(state: State, { payload }: PayloadAction<{ dir: 'asc'|'desc', key: OrderColumn }>) {
      state.paginator.order.dir = payload.dir
      state.paginator.order.key = payload.key
    },
    process(state: State, { payload }: PayloadAction<boolean|undefined>) {
      state.processing = payload ? payload : ! state.processing
    },
    toggle(state: State, { payload }: PayloadAction<boolean|undefined>) {
      state.open = payload !== undefined ? payload : ! state.open
    },
    paginated(state: State, { payload }: PayloadAction<Paginated<User>>) {
      state.paginated = payload
    },
    set<T extends keyof State['form'], U extends State['form'][T]>(state: State, { payload }: PayloadAction<{ key: T, value: U }>) {
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
    edit(state: State, { payload }: PayloadAction<User>) {
      state.form.id = payload.id
      state.form.name = payload.name
      state.form.email = payload.email
      state.form.username = payload.username
      state.form.permissions = payload.permissions.map(permission => permission.key)
      state.form.roles = payload.roles.map(role => role.key)

      state.open = true
    },
  },
})

export const { process, toggle, paginated, set, reset, setError, clearError, edit } = slice.actions

export default slice.reducer