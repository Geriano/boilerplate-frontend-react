import { SuccessResponse } from "./response"

export interface Permission {
  id: string
  title: string
  name: string
  key: string
}

export interface State {
  open: boolean
  processing: boolean
  permissions: Permission[]
  form: {
    id: string|null
    name: string
    key: string
  }
  errors: {
    name: string
    key: string
  }
}

type Response = {
  message: string
  permission: Permission
}

export type AllResponse = SuccessResponse<Permission[]>
export type StoreSuccessResponse = SuccessResponse<Response>
export type UpdateSuccessResponse = SuccessResponse<Response>
export type DestroySuccessResponse = SuccessResponse<Response>
export type ValidationErrorResponse = {
  errors: {
    field: 'name'|'key'
    message: string
  }[]
}