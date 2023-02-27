import { useAppDispatch, useAppSelector } from "../../hooks"
import { forgotPassword, set } from "../../store/auth"
import { mdiLoading } from "@mdi/js"
import Button from "../../Components/Button"
import FloatingInput2 from "../../Components/FloatingInput2"
import Icon from "@mdi/react"
import { Link } from "react-router-dom"

export default function RequestForgotPassword() {
  const dispatch = useAppDispatch()
  const { email } = useAppSelector(state => state.auth.form)
  const { processing, errors } = useAppSelector(state => state.auth)

  return (
    <form
      onSubmit={e => {
        e.preventDefault()

        dispatch(forgotPassword())
      }}
      className="flex flex-col space-y-6 bg-white w-full max-w-sm rounded-md shadow"
    >
      <div className="px-4 py-4 border-b">
        <p className="lowercase first-letter:capitalize">
          please provide your email to reset your password, we will send you an email to reset your account.
        </p>
      </div>

      <div className="flex flex-col space-y-2 px-8">
        <FloatingInput2
          name="email"
          type="email"
          label="Email"
          onChange={e => {
            const target = e.target as HTMLInputElement

            dispatch(set({
              key: 'email',
              value: target.value,
            }))
          }}
          value={email}
          autoFocus
        />
        <p className="text-sm text-danger-0 text-right">{errors.email}</p>
      </div>

      <div className="flex items-center justify-between bg-gray-100 px-4 py-1 rounded-b-md">
        <div className="flex flex-col space-y-1">
          <p className="lowercase first-letter:capitalize text-sm">
            <Link to="/login" className="text-primary-0">login</Link>
          </p>
        </div>
        <Button type="submit" title="Send Reset Password Link" color="primary" className="text-white font-medium">
          {processing && (
            <div className="animate-spin">
              <Icon path={mdiLoading} size={.75} />
            </div>
          )}
          <p>Send Reset Password Link</p>
        </Button>
      </div>
    </form>
  )
}