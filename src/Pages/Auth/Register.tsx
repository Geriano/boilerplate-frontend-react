import { useAppDispatch, useAppSelector } from "../../hooks"
import { register, set } from "../../store/auth"
import { mdiLoading } from "@mdi/js"
import Button from "../../Components/Button"
import FloatingInput2 from "../../Components/FloatingInput2"
import Icon from "@mdi/react"
import { Link } from "react-router-dom"

export default function Register() {
  const dispatch = useAppDispatch()
  const { name, email, username, password, password_confirmation } = useAppSelector(state => state.auth.form)
  const { processing, errors } = useAppSelector(state => state.auth)

  return (
    <form
      onSubmit={e => {
        e.preventDefault()

        dispatch(register())
      }}
      className="flex flex-col space-y-6 bg-white w-full max-w-sm rounded-md shadow"
    >
      <div className="px-4 pt-8 text-center">
        <h3 className="text-3xl capitalize font-semibold">Register</h3>
      </div>

      <div className="flex flex-col space-y-2 px-8">
        <FloatingInput2
          name="name"
          type="text"
          label="Name"
          onChange={e => {
            const target = e.target as HTMLInputElement

            dispatch(set({
              key: 'name',
              value: target.value,
            }))
          }}
          value={name}
          autoFocus
        />
        <p className="text-sm text-danger-0 text-right">{errors.name}</p>
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
        />
        <p className="text-sm text-danger-0 text-right">{errors.email}</p>
        <FloatingInput2
          name="username"
          type="text"
          label="Username"
          onChange={e => {
            const target = e.target as HTMLInputElement

            dispatch(set({
              key: 'username',
              value: target.value,
            }))
          }}
          value={username}
        />
        <p className="text-sm text-danger-0 text-right">{errors.username}</p>
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
        />
        <p className="text-sm text-danger-0 text-right">{errors.password_confirmation}</p>
      </div>

      <div className="flex items-center justify-between bg-gray-100 px-4 py-1 rounded-b-md">
        <div className="flex flex-col space-y-1">
          <p className="lowercase first-letter:capitalize text-sm">
            already have account? <Link to="/login" className="text-primary-0">login</Link>
          </p>
        </div>
        <Button type="submit" title="Register" color="primary" className="text-white font-medium">
          {processing && (
            <div className="animate-spin">
              <Icon path={mdiLoading} size={.75} />
            </div>
          )}
          <p>Register</p>
        </Button>
      </div>
    </form>
  )
}