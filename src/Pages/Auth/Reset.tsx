import { useAppDispatch, useAppSelector } from "../../hooks"
import { resetPassword, set } from "../../store/auth"
import { mdiLoading } from "@mdi/js"
import { Link, Navigate, useLocation } from "react-router-dom"
import * as toast from "../../store/toast"
import Button from "../../Components/Button"
import FloatingInput2 from "../../Components/FloatingInput2"
import Icon from "@mdi/react"

export default function Reset() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const { password, password_confirmation } = useAppSelector(state => state.auth.form)
  const { processing, errors } = useAppSelector(state => state.auth)

  if (!search.has('token')) {
    dispatch(toast.error('Missing reset password token'))

    return <Navigate to="/login" />
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()

        dispatch(resetPassword())
      }}
      className="flex flex-col space-y-6 bg-white w-full max-w-sm rounded-md shadow"
    >
      <div className="px-4 py-4 border-b">
        <p className="lowercase first-letter:capitalize">
          Reset password
        </p>
      </div>

      <div className="flex flex-col space-y-2 px-8">
        <FloatingInput2
          name="password"
          type="password"
          label="Password"
          onChange={e => {
            const target = e.target as HTMLInputElement

            dispatch(set({
              key: 'password',
              value: target.value,
            }))
          }}
          value={password}
          autoFocus
        />
        <p className="text-sm text-danger-0 text-right">{errors.password}</p>
        <FloatingInput2
          name="password_confirmation"
          type="password"
          label="Password Confirmation"
          onChange={e => {
            const target = e.target as HTMLInputElement

            dispatch(set({
              key: 'password_confirmation',
              value: target.value,
            }))
          }}
          value={password_confirmation}
          autoFocus
        />
        <p className="text-sm text-danger-0 text-right">{errors.password_confirmation}</p>
      </div>

      <div className="flex items-center justify-between bg-gray-100 px-4 py-1 rounded-b-md">
        <div className="flex flex-col space-y-1">
          <p className="lowercase first-letter:capitalize text-sm">
            <Link
              to="/login"
              className="text-primary-0"
              title="Login"
              aria-label="Login"
            >
              login
            </Link>
          </p>
        </div>
        <Button
          type="submit"
          title="Reset Password"
          color="primary"
          className="text-white font-medium"
        >
          {processing && (
            <div className="animate-spin">
              <Icon path={mdiLoading} size={.75} />
            </div>
          )}
          <p>Reset Password</p>
        </Button>
      </div>
    </form>
  )
}