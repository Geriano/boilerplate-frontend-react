import axios from "axios"
import { route } from "../_backend/routes"
import { GetLanguageSuccessResponse, ListSuccessResponse, Recursive, ShowSuccessResponse, UpdateSuccessResponse } from "../_interfaces/translation"

export const index = async () => {
  const { status, data: response } = await axios.get(route('translation.index')) as GetLanguageSuccessResponse

  return { status, response }
}

export const list = async (id: string) => {
  const { status, data: response } = await axios.get(route('translation.list', { id })) as ListSuccessResponse

  return { status,response }
}

export const show = async (id: string, name: string) => {
  const { status, data: response } = await axios.get(route('translation.show', { id, name })) as ShowSuccessResponse

  return { status, response }
}

export const update = async (id: string, name: string, form: Recursive) => {
  const { status, data: response } = await axios.put(route('translation.update', { id, name }), form) as UpdateSuccessResponse

  return { status, response }
}

export default {
  index, list, show, update,
}