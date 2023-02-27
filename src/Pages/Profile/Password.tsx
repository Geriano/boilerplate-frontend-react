import { FormEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { setPasswordForm, updatePassword } from "../../store/profile"
import { mdiCheck, mdiLoading } from "@mdi/js"
import { route } from "../../_backend/routes"
import Button from "../../Components/Button"
import FloatingInput2 from "../../Components/FloatingInput2"
import Icon from "@mdi/react"

export default function Password() {
  const dispatch = useAppDispatch()
  const processing = useAppSelector(state => state.auth.processing)
  const { old_password, password, password_confirmation } = useAppSelector(state => state.profile.form.password)
  const errors = useAppSelector(state => state.profile.errors.password)

  const submit = (e: FormEvent) => {
    e.preventDefault()

    dispatch(updatePassword())
  }

  return (
    <>
      <div className="md:col-span-5">
        <h1 className="text-xl font-semibold">
          Password
        </h1>
      </div>

      <form onSubmit={submit} action={route('auth.update-profile-information')} className="md:col-span-7">
        <div className="bg-white dark:bg-gray-700 rounded-md">
          <div className="p-8">
            <div className="max-w-md flex flex-col space-y-2 w-full">
              <FloatingInput2
                name="old_password"
                type="password"
                label="Old Password"
                value={old_password}
                onChange={e => {
                  const target = e.target as HTMLInputElement

                  dispatch(setPasswordForm({
                    key: 'old_password',
                    value: target.value,
                  }))
                }}
              />
              <p className="text-sm text-danger-0 text-right">{errors.old_password}</p>

              <FloatingInput2
                name="password"
                type="password"
                label="Password"
                value={password}
                onChange={e => {
                  const target = e.target as HTMLInputElement

                  dispatch(setPasswordForm({
                    key: 'password',
                    value: target.value,
                  }))
                }}
              />
              <p className="text-sm text-danger-0 text-right">{errors.password}</p>

              <FloatingInput2
                name="password_confirmation"
                type="password"
                label="Password Confirmation"
                value={password_confirmation}
                onChange={e => {
                  const target = e.target as HTMLInputElement

                  dispatch(setPasswordForm({
                    key: 'password_confirmation',
                    value: target.value,
                  }))
                }}
              />
              <p className="text-sm text-danger-0 text-right">{errors.password_confirmation}</p>
            </div>
          </div>

          <div className="flex items-center justify-end rounded-b-md bg-gray-100 dark:bg-gray-800 p-4">
            <Button color="dark" className="text-white dark:bg-gray-900">
              {processing ? <Icon path={mdiLoading} /> : <Icon path={mdiCheck} size={.5} />}
              <p className="capitalize">
                Update
              </p>
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}