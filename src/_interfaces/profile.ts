import { SuccessResponse } from "./response"

export interface UpdateProfileInformationForm {
  photo: File|null
  name: string
  username: string
  email: string
}

export interface UpdatePasswordForm {
  old_password: string
  password: string
  password_confirmation: string
}

export interface State {
  processing: boolean
  form: {
    profile: UpdateProfileInformationForm
    password: UpdatePasswordForm
  }
  errors: {
    profile: {
      [key in keyof UpdateProfileInformationForm]: string
    }
    password: {
      [key in keyof UpdatePasswordForm]: string
    }
  }
}

type Response = {
  message: string
}

export type UpdateSuccessResponse = SuccessResponse<Response>