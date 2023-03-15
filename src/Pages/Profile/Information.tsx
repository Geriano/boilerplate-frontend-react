import { FormEvent, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { removeProfilePhoto, setProfileForm, updateProfileInformation } from "../../store/profile"
import { mdiAccount, mdiCheck, mdiDelete, mdiLoading, mdiSync } from "@mdi/js"
import { assets, route } from "../../_backend/routes"
import * as toast from "../../store/toast"
import Button from "../../Components/Button"
import FloatingInput2 from "../../Components/FloatingInput2"
import Icon from "@mdi/react"
import classNames from "classnames"

export default function Information() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const processing = useAppSelector(state => state.auth.processing)
  const { photo, name, username, email } = useAppSelector(state => state.profile.form.profile)
  const errors = useAppSelector(state => state.profile.errors.profile)
  const file = useRef<HTMLInputElement|null>(null)

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

  const remove = () => {
    if (photo) {
      dispatch(setProfileForm({
        key: 'photo',
        value: null,
      }))
    } else {
      dispatch(removeProfilePhoto())
    }
  }

  return (
    <>
      <div className="md:col-span-5">
        <h1 className="text-xl font-semibold">
          Information
        </h1>
      </div>

      <form onSubmit={submit} action={route('auth.update-profile-information')} className="md:col-span-7">
        <div className="bg-white dark:bg-gray-700 rounded-md">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between p-8">
            <div className="max-w-md flex-none flex flex-col space-y-2 w-full mt-4 md:mt-0">
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
            <div className="flex md:flex-col items-end md:items-center md:space-y-2 space-x-2 md:space-x-0 justify-center w-full">
              {user.profile_photo_path || photo ? (
                <img
                  src={photo ? URL.createObjectURL(photo) : assets(user.profile_photo_path!)}
                  alt={user.name}
                  width="80"
                  height="80"
                  className="w-20 h-20 border dark:border-gray-800 rounded-full"
                />
                ) : (
                <div className="flex items-center justify-center w-20 h-20 border dark:border-gray-800 rounded-full p-2">
                  <Icon path={mdiAccount} size={2} />
                </div>
              )}

              <div className="flex items-center justify-center">
                <input
                  type="file"
                  name="photo"
                  className="hidden"
                  accept="image/jpg, image/jpeg, image/png, image/webp"
                  ref={file}
                  onChange={e => {
                    const target = e.target as HTMLInputElement
                    const files = target.files!
                    const file = files.item(0)

                    dispatch(setProfileForm({
                      key: 'photo',
                      value: null,
                    }))

                    if (file && !['image/jpg', 'image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                      target.files = null
                      return dispatch(toast.error('Invalid file type'))
                    }

                    dispatch(setProfileForm({
                      key: 'photo',
                      value: file,
                    }))
                  }}
                />
                <Button
                  type="button"
                  color="primary"
                  title="Change"
                  className={classNames("text-white", {
                    'rounded-r-none': user.profile_photo_path || photo,
                  })}
                  onClick={() => file.current?.click()}
                >
                  <Icon path={mdiSync} size={.5} />
                </Button>
                {(user.profile_photo_path || photo) && (
                  <Button
                    type="button"
                    color="danger"
                    title="Remove"
                    className="text-white rounded-l-none"
                    onClick={remove}
                  >
                    <Icon path={mdiDelete} size={.5} />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end rounded-b-md bg-gray-100 dark:bg-gray-800 p-4">
            <Button
              color="dark"
              title="Update"
              className="text-white dark:bg-gray-900"
            >
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