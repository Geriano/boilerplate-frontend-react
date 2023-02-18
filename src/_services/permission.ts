import axios from "axios"
import { route } from "../_backend/routes"
import { AllResponse, DestroySuccessResponse, State, StoreSuccessResponse, UpdateSuccessResponse } from "../_interfaces/permission"

export const all = async () => {
  const { status, data: response } = await axios.get(route('permission.all')) as AllResponse

  return { status, response }
}

export const store = async (form: State['form']) => {
  const { status, data: response } = await axios.post(route('permission.store'), form) as StoreSuccessResponse

  return { status, response }
}

export const update = async (id: string, form: State['form']) => {
  const { status, data: response } = await axios.put(route('permission.update', { id }), form) as UpdateSuccessResponse

  return { status, response }
}

export const destroy = async (id: string) => {
  const { status, data: response } = await axios.delete(route('permission.destroy', { id })) as DestroySuccessResponse

  return { status, response }
}

export default {
  all, store, update, destroy,
}