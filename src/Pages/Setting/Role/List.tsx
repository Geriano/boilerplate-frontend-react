import Icon from "@mdi/react"
import Button from "../../../Components/Button"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { mdiDelete, mdiPen, mdiPlus } from "@mdi/js"
import { Link, useParams } from "react-router-dom"
import classNames from "classnames"
import { destroy, edit, toggle } from "../../../store/role"

export default function List() {
  const dispatch = useAppDispatch()
  const roles = useAppSelector(state => state.role.paginated.data)
  const { id } = useParams()

  return (
    <div className="col-span-4 overflow-y-scroll" style={{
      minHeight: 'calc(100vh - 8rem)'
    }}>
      <div className="flex flex-col bg-white rounded-md shadow py-4">
        <div className="flex items-center justify-between mb-4 px-4">
          <h3 className="font-medium">Role list</h3>
          <Button onClick={() => dispatch(toggle({
            type: 'form',
            open: true,
          }))} color="light" title="Create">
            <Icon path={mdiPlus} size={.5} />
          </Button>
        </div>
        {roles.map(role => {
          return (
            <Link key={role.id} to={`/setting/role/${role.id}`} className={classNames("flex items-center space-x-1 justify-between hover:bg-gray-100 border-r-4 hover:border-primary-0 py-2 px-4 hover:pl-6 hover:font-medium capitalize transition-all", {
              'bg-gray-100 pl-6 border-primary-0 font-medium': id === role.id,
            })}>
              <p>{role.title}</p>
              <div className="flex items-center space-x-1">

                <Button onClick={() => dispatch(edit(role))} type="button" color="primary" className="px-1 pt-1 pb-1 text-white rounded-t-full rounded-b-full" title="Edit">
                  <Icon path={mdiPen} size={.5} />
                </Button>

                <Button onClick={() => dispatch(destroy(role.id))} type="button" color="danger" className="px-1 pt-1 pb-1 text-white rounded-t-full rounded-b-full" title="Delete">
                  <Icon path={mdiDelete} size={.5} />
                </Button>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}