import { route } from "../_backend/routes"
import { Paginator } from "../_interfaces/pagination"
import { DestroySuccessResponse, Form, PaginatedResponse, ShowSuccessResponse, StoreSuccessResponse, TogglePermissionSuccessResponse } from "../_interfaces/role"
import { UpdateSuccessResponse } from "../_interfaces/permission"
import { sanitizePaginatorQuery } from "../helper"
import axios from "axios"

export const paginate = async (paginator: Paginator) => {
  const query = sanitizePaginatorQuery(paginator)
  const { status, data: response } = await axios.get(route('role.paginate', query)) as PaginatedResponse

  return { status, response }
}

export const store = async (form: Form) => {
  const { status, data: response } = await axios.post(route('role.store'), form) as StoreSuccessResponse

  return { status, response }
}

export const show = async (id: string) => {
  const { status, data: response } = await axios.get(route('role.show', { id })) as ShowSuccessResponse

  return { status, response }
}

export const update = async (id: string, form: Form) => {
  const { status, data: response } = await axios.put(route('role.show', { id }), form) as UpdateSuccessResponse

  return { status, response }
}

export const destroy = async (id: string) => {
  const { status, data: response } = await axios.delete(route('role.show', { id })) as DestroySuccessResponse

  return { status, response }
}

export const togglePermission = async (role: string, permission: string) => {
  const { status, data: response } = await axios.put(route('role.toggle-permission', {
    role, permission
  })) as TogglePermissionSuccessResponse

  return { status, response }
}

export default {
  paginate, store, show, update, destroy, togglePermission,
}