import Icon from "@mdi/react";
import Button from "../../../Components/Button";
import { Permission } from "../../../_interfaces/permission";
import { mdiDelete, mdiPen } from "@mdi/js";
import { useAppDispatch, usePermission } from "../../../hooks";
import { destroy, edit } from "../../../store/permission";

export default function Item({ item }: { item: Permission }) {
  const dispatch = useAppDispatch()
  const permission = usePermission()
  
  return (
    <div key={item.id} className="bg-gray-100 text-gray-700 text-sm rounded-md inline-block px-2 py-1 m-0.5 transition-all hover:scale-105">
      <div className="flex items-center space-x-1">
        <p className="capitalize">{item.title}</p>
        
        {permission.has('update permission') && (
          <Button
            color="primary"
            className="px-1 pt-1 pb-1"
            title="Edit"
            onClick={() => dispatch(edit(item))}
          >
            <Icon path={mdiPen} size={.5} color="white" />
          </Button>
        )}

        {permission.has('delete permission') && (
          <Button
            color="danger"
            className="px-1 pt-1 pb-1"
            title="Delete"
            onClick={() => dispatch(destroy(item.id))}
          >
            <Icon path={mdiDelete} size={.5} color="white" />
          </Button>
        )}
      </div>
    </div>
  )
}