import { SuccessResponse } from "./response"

export type KeyValuePair = Record<string, string | Recursive>
export type Recursive = Record<string, string | Record<string, string | Record<string, string>>>

export interface State {
  processing: boolean
  timeout: number|null
  languages: string[]
  lists: string[]
  current: {
    language: string|null
    list: string|null
  }
  tree: Recursive|null
}

export type GetLanguageSuccessResponse = SuccessResponse<string[]>
export type ListSuccessResponse = SuccessResponse<string[]>
export type ShowSuccessResponse = SuccessResponse<Recursive>
export type UpdateSuccessResponse = SuccessResponse<Recursive>