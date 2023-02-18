import { mdiPlus } from "@mdi/js";
import Button from "../../Components/Button";
import Icon from "@mdi/react";
import { useAppDispatch, useAppSelector, usePermission } from "../../hooks";
import { useEffect } from "react";
import { all, toggle } from "../../store/permission";
import Form from "./Permission/Form";
import Item from "./Permission/Item";

export default function Permission() {
  const dispatch = useAppDispatch()
  const permission = usePermission()
  const permissions = useAppSelector(state => state.permission.permissions)

  useEffect(() => {
    dispatch(all())
  }, [])

  return (
    <>
      <div className="h-full bg-white rounded-md shadow p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium capitalize">Permission</h3>

          {permission.has('create permission') && permission.has('configure permission key') && (
            <Button
              type="button"
              color="light"
              title="Create"
              onClick={() => dispatch(toggle(true))}
            >
              <Icon path={mdiPlus} size={.5} />
              <p className="capitalize">Create</p>
            </Button>
          )}
        </div>

        <div className="overflow-y-scroll mt-4" style={{
          height: 'calc(100vh - 12rem)'
        }}>
          <div className="flex-wrap">
            {permissions.map(item => <Item key={item.id} item={item} />)}
          </div>
        </div>
      </div>

      <Form />
    </>
  )
}