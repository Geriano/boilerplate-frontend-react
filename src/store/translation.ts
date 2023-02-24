import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Recursive, State } from "../_interfaces/translation"
import { RootState } from "../store"
import translation from "../_services/translation"

export const name = 'translation'
export const initialState: State = {
  processing: false,
  timeout: null,
  languages: [],
  lists: [],
  current: {
    language: null,
    list: null,
  },
  tree: null,
}

export const languages = createAsyncThunk('translation/languages', async (_, api) => {
  const state = api.getState() as RootState
  const { processing } = state.translation

  if (processing) {
    return
  }

  try {
    api.dispatch(slice.actions.process(true))
    const { response } = await translation.index()

    api.dispatch(slice.actions.languages(response))
  } catch (e) {
    console.log(e)
  } finally {
    api.dispatch(slice.actions.process(false))
  }
})

export const lists = createAsyncThunk('translation/list', async (language: string, api) => {
  const state = api.getState() as RootState
  const { processing } = state.translation

  if (processing) {
    return
  }

  try {
    api.dispatch(slice.actions.process(true))
    api.dispatch(slice.actions.language(language))
    const { response } = await translation.list(language)

    api.dispatch(slice.actions.lists(response))
    api.dispatch(slice.actions.list(
      response.length ? response[0] : null
    ))

    if (response.length) {
      api.dispatch(slice.actions.process(false))
      await api.dispatch(tree())
    }
  } catch (e) {
    console.log(e)
  } finally {
    api.dispatch(slice.actions.process(false))
  }
})

export const tree = createAsyncThunk('translation/tree', async (_, api) => {
  const state = api.getState() as RootState
  const { processing, current } = state.translation

  if (processing) {
    return
  }

  try {
    api.dispatch(slice.actions.process(true))
    const { response } = await translation.show(current.language!, current.list!)

    api.dispatch(slice.actions.tree(response))
  } catch (e) {
    console.log(e)
  } finally {
    api.dispatch(slice.actions.process(false))
  }
})

export const change = createAsyncThunk('translation/change', async (payload: { key: string, value: string }, api) => {
  api.dispatch(slice.actions.change(payload))

  if (!import.meta.env.DEV) {
    await api.dispatch(update())
  }
})

export const update = createAsyncThunk('translation/update', async (_, api) => {
  const state = api.getState() as RootState
  const timeout = state.translation.timeout
  const { language, list } = state.translation.current

  timeout && clearTimeout(timeout)
  api.dispatch(slice.actions.timeout(
    setTimeout(async () => {
      try {
        const state = api.getState() as RootState
        const { response } = await translation.update(language!, list!, state.translation.tree!)

        api.dispatch(slice.actions.tree(response))
      } catch (e) {
        console.log(e)
      }
    }, 200)
  ))
})

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    process(state: State, { payload }: PayloadAction<boolean|undefined>) {
      state.processing = payload !== undefined ? payload : ! state.processing
    },
    timeout(state: State, { payload }: PayloadAction<number|null>) {
      state.timeout = payload
    },
    language(state: State, { payload }: PayloadAction<string|null>) {
      state.current.language = payload
    },
    list(state: State, { payload }: PayloadAction<string|null>) {
      state.current.list = payload
    },
    languages(state: State, { payload }: PayloadAction<State['languages']>) {
      state.languages = payload
    },
    lists(state: State, { payload }: PayloadAction<State['lists']>) {
      state.lists = payload
    },
    tree(state: State, { payload }: PayloadAction<State['tree']>) {
      state.tree = payload
    },
    change(state: State, { payload }: PayloadAction<{ key: string, value: string }>) {
      const tree = state.tree!
      const { key, value } = payload
      const split = key.split('.')

      let before = {} as Recursive

      for (let i = 0; i < split.length; i++) {
        if (i > 0) {
          const b = before[split[i - 1]]

          if (typeof b !== 'string') {
            before = b
          }
        } else {
          before = tree
        }
        
        if (typeof before[split[i]] === 'string') {
          before[split[i]] = value
          break
        }
      }
    },
  },
})

export default slice.reducer