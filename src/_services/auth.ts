import { route } from "../_backend/routes"
import { LoginForm, LoginSuccess, LogoutSuccess, RegisterForm, RegisterSuccess, User, VerifySuccess } from '../_interfaces/auth'
import { SuccessResponse } from "../_interfaces/response"
import axios from "axios"

export const user = async () => {
  const { status, data: response } = await axios.post(route('auth.user')) as SuccessResponse<User>

  return { status, response }
}

export const login = async (form: LoginForm) => {
  const { status, data: response } = await axios.post(route('auth.login'), form) as LoginSuccess

  return { status, response }
}

export const logout = async () => {
  const { status, data: response } = await axios.delete(route('auth.logout')) as LogoutSuccess

  return { status, response }
}

export const register = async (form: RegisterForm) => {
  const next = import.meta.env.VITE_APP_URL
  const { status, data: response } = await axios.post(route('auth.register', { next }), form) as RegisterSuccess

  return { status, response }
}

export const verify = async (token: string) => {
  const { status, data: response } = await axios.get(route('auth.verify')) as VerifySuccess

  return { status, response }
}

export default {
  user, login, logout, register, verify,
}