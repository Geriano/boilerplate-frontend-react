import { Navigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { toggleRole } from "../../../store/user"
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js"
import { next, previous } from "../../../store/role"
import Button from "../../../Components/Button"
import Icon from "@mdi/react"

export default function Configuration() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.layout.theme)
  const { id } = useParams()
  const user = useAppSelector(state => state.user.paginated.data.find(user => user.id === id))
  const paginated = useAppSelector(state => state.role.paginated)

  if (!user) {
    return <Navigate to="/setting/user/role" />
  }

  return (
    <div className="col-span-8 flex flex-col justify-between bg-white dark:bg-gray-700 rounded-md">
      <div className="flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="font-medium">
            Role for {user.name} (@{user.username})
          </div>
        </div>
        
        {paginated.data.map(role => {
          return (
            <div key={role.id}>
              <input
                name={`role:${role.id}`}
                type="checkbox"
                className="dark:bg-gray-700 dark:border-gray-800 rounded-md cursor-pointer"
                checked={user.roles.find(r => r.key === role.key) !== undefined}
                onChange={() => {
                  dispatch(toggleRole({
                    user, role,
                  }))
                }}
              />
              <label htmlFor={`role:${role.id}`} className="ml-2 capitalize text-sm">{role.title}</label>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-end border-t dark:border-gray-800 py-2 px-4 text-sm">
        <div className="flex border dark:border-gray-700 rounded-md">
          <Button onClick={() => dispatch(previous())} color={theme === 'dark' ? 'dark' : 'light'} className="rounded-r-none px-1.5">
            <Icon path={mdiChevronLeft} size={.5} />
          </Button>
          <div className="bg-primary px-2 py-1 font-medium text-white border border-primary-0">
            {paginated.meta.current_page}
          </div>
          <Button onClick={() => dispatch(next())} color={theme === 'dark' ? 'dark' : 'light'} className="rounded-l-none px-1.5">
            <Icon path={mdiChevronRight} size={.5} />
          </Button>
        </div>
      </div>
    </div>
  )
}