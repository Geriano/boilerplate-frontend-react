import { SuccessResponse, UnprocessableEntityResponse } from "./response"

export interface User {
  id: string
  name: string
  email: string
  username: string
  permissions: Permission[]
  roles: Role[]
  can: (names: string|string[]) => boolean
}

export interface Permission {
  key: string
}

export interface Role {
  key: string
  permissions: Permission[]
}

export interface State {
  authenticated: boolean
  user: User
  token: string
  processing: boolean
  form: {
    name: string
    email: string
    username: string
    password: string
    password_confirmation: string
  }
  errors: {
    [key in keyof State['form']]: string
  }
}

export interface LoginForm {
  username: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  username: string
  password: string
  password_confirmation: string
}

export interface ForgotPasswordForm {
  email: string
}

export type LoginSuccess = SuccessResponse<{
  user: User
  token: string
}>

export type LogoutSuccess = SuccessResponse<{
  message: string
}>

export type RegisterSuccess = SuccessResponse<{
  message: string
}>

export type LoginValidationError = UnprocessableEntityResponse<{
  errors: {
    field: keyof LoginForm
    message: string
  }[]
}>