import { FormEvent, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { setProfileForm, updateProfileInformation } from "../../store/profile"
import { mdiCheck, mdiLoading } from "@mdi/js"
import { route } from "../../_backend/routes"
import Button from "../../Components/Button"
import FloatingInput2 from "../../Components/FloatingInput2"
import Icon from "@mdi/react"

export default function Information() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const processing = useAppSelector(state => state.auth.processing)
  const { name, username, email } = useAppSelector(state => state.profile.form.profile)
  const errors = useAppSelector(state => state.profile.errors.profile)

  useEffect(() => {
    dispatch(setProfileForm({
      key: 'name',
      value: user.name,
    }))

    dispatch(setProfileForm({
      key: 'username',
      value: user.username,
    }))

    dispatch(setProfileForm({
      key: 'email',
      value: user.email,
    }))
  }, [])

  const submit = (e: FormEvent) => {
    e.preventDefault()

    dispatch(updateProfileInformation())
  }

  return (
    <>
      <div className="col-span-5">
        <h1 className="text-xl font-semibold">
          Information
        </h1>
      </div>

      <form onSubmit={submit} action={route('auth.update-profile-information')} className="col-span-7">
        <div className="bg-white dark:bg-gray-700 rounded-md">
          <div className="p-8">
            <div className="max-w-md flex flex-col space-y-2 w-full">
              <FloatingInput2
                name="name"
                type="text"
                label="Name"
                value={name}
                onChange={e => {
                  const target = e.target as HTMLInputElement

                  dispatch(setProfileForm({
                    key: 'name',
                    value: target.value,
                  }))
                }}
              />
              <p className="text-sm text-danger-0 text-right">{errors.name}</p>

              <FloatingInput2
                name="username"
                type="text"
                label="Name"
                value={username}
                onChange={e => {
                  const target = e.target as HTMLInputElement

                  dispatch(setProfileForm({
                    key: 'username',
                    value: target.value,
                  }))
                }}
              />
              <p className="text-sm text-danger-0 text-right">{errors.username}</p>

              <FloatingInput2
                name="email"
                type="text"
                label="Name"
                value={email}
                onChange={e => {
                  const target = e.target as HTMLInputElement

                  dispatch(setProfileForm({
                    key: 'email',
                    value: target.value,
                  }))
                }}
              />
              <p className="text-sm text-danger-0 text-right">{errors.email}</p>
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