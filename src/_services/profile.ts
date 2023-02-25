import axios from "axios";
import { UpdatePasswordForm, UpdateProfileInformationForm, UpdateSuccessResponse } from "../_interfaces/profile";
import { route } from "../_backend/routes";

export const updateProfileInformation = async (form: UpdateProfileInformationForm) => {
  const { status, data: response } = await axios.put(route('auth.update-profile-information'), form) as UpdateSuccessResponse

  return { status, response }
}

export const updatePassword = async (form: UpdatePasswordForm) => {
  const { status, data: response } = await axios.patch(route('auth.update-password'), form) as UpdateSuccessResponse

  return { status, response }
}

export default {
  updateProfileInformation, updatePassword,
}