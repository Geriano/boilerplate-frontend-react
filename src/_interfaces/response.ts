export interface Response<C extends number,T> {
  status: C
  data: T
}

export type SuccessResponse<T> = Response<200|201, T>
export type CreatedResponse<T> = Response<201, T>
export type BadRequestResponse<T> = Response<400, T>
export type UnauthorizeResponse<T> = Response<401, T>
export type PaymentRequeiredResponse<T> = Response<402, T>
export type ForbiddenResponse<T> = Response<403, T>
export type NotFoundResponse<T> = Response<404, T>
export type MethodNotAllowedResponse<T> = Response<405, T>
export type PageExpiredResponse<T> = Response<419, T>
export type UnprocessableEntityResponse<T> = Response<422, T>
export type InternalServerError<T> = Response<500, T>

export interface ValidationError<T extends string[]> {
  field: T
  message: string
}
