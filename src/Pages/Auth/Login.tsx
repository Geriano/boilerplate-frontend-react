import { useAppDispatch, useAppSelector } from "../../hooks"
import { login, set } from "../../store/auth"
import { mdiAccount, mdiAt, mdiEyeOffOutline, mdiEyeOutline, mdiFacebook, mdiGithub, mdiGitlab, mdiGoogle, mdiLinkedin, mdiLoading, mdiTwitter } from "@mdi/js"
import { Link } from "react-router-dom"
import { useState } from "react"
import Button from "../../Components/Button"
import FloatingInput2 from "../../Components/FloatingInput2"
import Icon from "@mdi/react"

export default function Login() {
  const dispatch = useAppDispatch()
  const [show, setShow] = useState(false)
  const { username, password } = useAppSelector(state => state.auth.form)
  const { processing, errors } = useAppSelector(state => state.auth)

  return (
    <div className="w-full max-w-sm">
      <form
        onSubmit={e => {
          e.preventDefault()

          dispatch(login())
        }}
        className="flex flex-col space-y-6 bg-white w-full rounded-md shadow py-6"
      >
        <div className="px-6 flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border p-2 bg-primary-0 bg-opacity-20">
            <Icon path={mdiAccount} size={1} className="text-primary-0" />
          </div>
          <h3 className="text-xl capitalize font-semibold">Login</h3>
        </div>

        <div className="flex flex-col space-y-2 px-8">
          <div className="relative flex flex-col space-y-1">
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
            {errors.username && <p className="text-sm text-danger-0 text-right">{errors.username}</p>}
            <div className="absolute right-0 flex items-center h-full rounded-r-md text-gray-500">
              <Icon path={mdiAt} size={1} className="mr-4" />
            </div>
          </div>
          <div className="relative flex flex-col space-y-1">
            <FloatingInput2
              name="password"
              type={show ? 'text': 'password'}
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
            {errors.password && <p className="text-sm text-danger-0 text-right">{errors.password}</p>}
            <div className="absolute right-0 flex items-center h-full rounded-r-md text-gray-500">
              <button onClick={() => setShow(!show)} type="button" className="mr-4">
                <Icon path={show ? mdiEyeOffOutline : mdiEyeOutline} size={1} />
              </button>
            </div>
          </div>
          <Link to="/request-reset-password" className="lowercase first-letter:capitalize text-sm text-right text-gray-500">
            forgot your password?
          </Link>
        </div>

        <div className="px-8 w-full">
          <Button type="submit" title="Login" color="primary" className="text-white text-md font-medium w-full">
            <div className="flex items-center justify-center w-full space-x-2">
              {processing && (
                <div className="animate-spin">
                  <Icon path={mdiLoading} size={.6} />
                </div>
              )}
              <p>Login</p>
            </div>
          </Button>

          <div className="text-center text-sm text-gray-500 my-2">or</div>
          
          <div className="flex items-center space-x-2 justify-center">
            <Button type="button" color="light" className="border" title="Google">
              <Icon path={mdiGoogle} size={.6} />
            </Button>
            <Button type="button" color="dark" className="border text-white" title="Github">
              <Icon path={mdiGithub} size={.6} />
            </Button>
            <Button type="button" color="warning" className="border text-white" title="Gitlab">
              <Icon path={mdiGitlab} size={.6} />
            </Button>
            <Button type="button" color="primary" className="border text-white" title="Facebook">
              <Icon path={mdiFacebook} size={.6} />
            </Button>
            <Button type="button" color="info" className="border text-white" title="Twitter">
              <Icon path={mdiTwitter} size={.6} />
            </Button>
            <Button type="button" color="primary" className="border text-white" title="Linkedin">
              <Icon path={mdiLinkedin} size={.6} />
            </Button>
          </div>
        </div>
      </form>

      <div className="flex flex-col space-y-1 mt-2">
        <p className="lowercase first-letter:capitalize text-sm text-center">
          doens't have account? <Link to="/register" className="text-primary-0">register</Link>
        </p>
      </div>
    </div>
  )
}