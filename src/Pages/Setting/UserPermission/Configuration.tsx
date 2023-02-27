import { Navigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { togglePermission } from "../../../store/user"

export default function Configuration() {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const user = useAppSelector(state => state.user.paginated.data.find(user => user.id === id))
  const permissions = useAppSelector(state => state.permission.permissions)

  if (!user) {
    return <Navigate to="/setting/user/permission" />
  }

  return (
    <div className="md:col-span-8 flex flex-col bg-white dark:bg-gray-700 rounded-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="font-medium">
          Permission for {user.name} (@{user.username})
        </div>
      </div>
      
      {permissions.map(permission => {
        return (
          <div key={permission.id}>
            <input
              name={`permission:${permission.id}`}
              type="checkbox"
              className="dark:bg-gray-700 dark:border-gray-800 rounded-md cursor-pointer"
              checked={user.permissions.find(p => p.key === permission.key) !== undefined}
              onChange={() => {
                dispatch(togglePermission({
                  user, permission,
                }))
              }}
            />
            <label htmlFor={`permission:${permission.id}`} className="ml-2 capitalize text-sm">{permission.title}</label>
          </div>
        )
      })}
    </div>
  )
}