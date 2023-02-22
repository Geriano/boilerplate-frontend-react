import { Paginated, Paginator } from "./pagination"
import { Permission } from "./permission"
import { SuccessResponse } from "./response"
import { Role } from "./role"

export interface User {
  id: string
  name: string
  email: string
  username: string
  email_verified_at: string
  created_at: string
  updated_at: string
  deleted_at: string
  permissions: Permission[]
  roles: Role[]
}

export interface Form {
  id: string
  name: string
  email: string
  username: string
  password: string
  password_confirmation: string
  permissions: string[]
  roles: string[]
}

export interface State {
  timeout: number|null
  processing: boolean
  open: boolean
  paginator: Paginator
  paginated: Paginated<User>
  form: Form
  errors: {
    [key in keyof Form]: string
  }
}

export type OrderColumn = 'name'|'email'|'username'

type Response = {
  message: string
  user: User
}

export type PaginatedResponse = SuccessResponse<Paginated<User>>
export type StoreSuccessResponse = SuccessResponse<Response>
export type ShowSuccessResponse = SuccessResponse<User>
export type UpdateSuccessResponse = SuccessResponse<Response>
export type DestroySuccessResponse = SuccessResponse<Response>
export type TogglePermissionSuccessResponse = SuccessResponse<Response>
export type ToggleRoleSuccessResponse = SuccessResponse<Response>
export type ValidationErrorResponse = {
  errors: {
    field: keyof Form
    message: string
  }[]
}