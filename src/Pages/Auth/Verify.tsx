import { mdiLoading } from "@mdi/js"
import { Card } from "flowbite-react"
import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAppDispatch } from "../../hooks"
import { error } from "../../store/toast"
import { verify } from "../../store/auth"
import Icon from "@mdi/react"

export default function Verify() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [valid, set] = useState(undefined as boolean | undefined)

  useEffect(() => {
    const search = new URLSearchParams(location.search)

    if (typeof valid === 'undefined') {
      if (!search.has('token')) {
        dispatch(error('Missing verification token'))
        set(false)
      } else {
        dispatch(verify(
          search.get('token')!
        ))
      }
    }
  }, [])

  if (typeof valid === 'boolean') {
    return <Navigate to="/login" />
  }

  return (
    <Card>
      <div className="flex flex-col space-y-4 items-center justify-center w-full">
        <h3 className="text-xl font-medium text-center lowercase first-letter:capitalize">
          your account will be verified in few second
        </h3>

        <div className="w-fit animate-spin text-primary-0">
          <Icon path={mdiLoading} size={7.5} />
        </div>
      </div>
    </Card>
  )
}