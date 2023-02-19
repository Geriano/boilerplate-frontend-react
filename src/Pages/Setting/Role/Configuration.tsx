import { Navigate, useParams } from "react-router-dom";
import Button from "../../../Components/Button";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Role } from "../../../_interfaces/role";
import { Permission } from "../../../_interfaces/permission";
import { togglePermission } from "../../../store/role";

export default function Configuration() {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const role = useAppSelector(state => state.role.paginated.data.find(role => role.id === id))
  const permissions = useAppSelector(state => state.permission.permissions)

  if (!role) {
    return <Navigate to="/setting/role" />
  }

  return (
    <div className="col-span-8 flex flex-col bg-white rounded-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="font-medium">
          Permission for {role.title}
        </div>
      </div>
      
      {permissions.map(permission => {
        return (
          <div key={permission.id}>
            <input
              name={`permission:${permission.id}`}
              type="checkbox"
              className="rounded-md cursor-pointer"
              checked={role.permissions.find(p => p.key === permission.key) !== undefined}
              onChange={() => {
                dispatch(togglePermission({
                  role, permission,
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