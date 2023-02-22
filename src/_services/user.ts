import axios from "axios"
import { Paginator } from "../_interfaces/pagination"
import { route } from "../_backend/routes"
import { DestroySuccessResponse, Form, PaginatedResponse, ShowSuccessResponse, StoreSuccessResponse, UpdateSuccessResponse } from "../_interfaces/user"
import { sanitizePaginatorQuery } from "../helper"

export const paginate = async (paginator: Paginator) => {
  const { status, data: response } = await axios.get(route('user.paginate', sanitizePaginatorQuery(paginator))) as PaginatedResponse

  return { status, response }
}

export const store = async (form: Form) => {
  const { status, data: response } = await axios.post(route('user.store'), form) as StoreSuccessResponse

  return { status, response }
}

export const show = async (id: string) => {
  const { status, data: response } = await axios.get(route('user.show', { id })) as ShowSuccessResponse

  return { status, response }
}

export const update = async (id: string, form: Form) => {
  const { status, data: response } = await axios.put(route('user.update', { id }), form) as UpdateSuccessResponse

  return { status, response }
}

export const destroy = async (id: string) => {
  const { status, data: response } = await axios.delete(route('user.destroy', { id })) as DestroySuccessResponse

  return { status, response }
}

export default {
  paginate, store, show, update, destroy,
}