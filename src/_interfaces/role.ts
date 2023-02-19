import { Paginated, Paginator } from "./pagination"
import { Permission } from "./permission"
import { SuccessResponse } from "./response"

export interface Role {
  id: string
  title: string
  name: string
  key: string
  permissions: Permission[]
}

export interface Form {
  id: string
  name: string
  key: string
  permissions: string[]
}

export interface State {
  timeout: number|null
  processing: boolean
  open: {
    form: boolean
    list: boolean
  }
  paginator: Paginator
  paginated: Paginated<Role>
  form: Form
  errors: {
    [key in keyof Form]: string
  }
}

type Response = {
  message: string
  role: Role
}

export type PaginatedResponse = SuccessResponse<Paginated<Role>>
export type TogglePermissionSuccessResponse = SuccessResponse<Response>
export type StoreSuccessResponse = SuccessResponse<Response>
export type ShowSuccessResponse = SuccessResponse<Role>
export type UpdateSuccessResponse = SuccessResponse<Response>
export type DestroySuccessResponse = SuccessResponse<Response>
export type ValidationErrorResponse = {
  errors: {
    field: 'name'|'key'
    message: string
  }[]
}