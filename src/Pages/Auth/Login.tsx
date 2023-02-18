import Icon from "@mdi/react";
import Button from "../../Components/Button";
import FloatingInput2 from "../../Components/FloatingInput2";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login, set } from "../../store/auth";
import { mdiLoading } from "@mdi/js";

export default function Login() {
  const dispatch = useAppDispatch()
  const { username, password } = useAppSelector(state => state.auth.form)
  const { processing, errors } = useAppSelector(state => state.auth)

  return (
    <form
      onSubmit={e => {
        e.preventDefault()

        dispatch(login())
      }}
      className="flex flex-col space-y-6 bg-white w-full max-w-sm rounded-md shadow"
    >
      <div className="px-4 pt-8 text-center">
        <h3 className="text-3xl capitalize font-semibold">Login</h3>
      </div>

      <div className="flex flex-col space-y-2 px-8">
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
          autoFocus
        />
        <p className="text-sm text-danger-0 text-right">{errors.username}</p>
        <FloatingInput2
          name="password"
          type="password"
          label="password"
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
      </div>

      <div className="flex items-center justify-end bg-gray-100 px-4 py-1 rounded-b-md">
        <Button type="submit" title="Login" color="primary">
          {processing && (
            <div className="animate-spin">
              <Icon path={mdiLoading} size={.75} />
            </div>
          )}
          <p>Login</p>
        </Button>
      </div>
    </form>
  )
}