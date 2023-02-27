import { useAppDispatch, useAppSelector } from "../../../hooks"
import { mdiChevronLeft, mdiChevronRight, mdiDelete, mdiPen, mdiPlus } from "@mdi/js"
import { Link, useParams } from "react-router-dom"
import { destroy, edit, next, previous, toggle } from "../../../store/role"
import Button from "../../../Components/Button"
import classNames from "classnames"
import Icon from "@mdi/react"

export default function List() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.layout.theme)
  const { id } = useParams()
  const roles = useAppSelector(state => state.role.paginated.data)
  const paginated = useAppSelector(state => state.role.paginated)

  return (
    <div className="md:col-span-4 overflow-y-scroll">
      <div className="flex flex-col bg-white dark:bg-gray-700 rounded-md shadow py-4">
        <div className="flex items-center justify-between pb-4 px-4">
          <h3 className="font-medium">Role list</h3>
          <Button
            onClick={() => dispatch(toggle({
              type: 'form',
              open: true,
            }))}
            color={theme === 'dark' ? 'dark' : 'light'}
            title="Create"
          >
            <Icon path={mdiPlus} size={.5} />
          </Button>
        </div>
        <div className="border dark:border-gray-800">
          {roles.map(role => {
            return (
              <Link key={role.id} to={`/setting/role/${role.id}`} className={classNames("flex items-center space-x-1 justify-between hover:bg-gray-100 dark:hover:bg-gray-800 border-r-4 hover:border-primary-0 py-2 px-4 hover:pl-6 hover:font-medium capitalize transition-all", {
                'bg-gray-100 dark:bg-gray-800 pl-6 border-primary-0 font-medium': id === role.id,
                'border-transparent': id !== role.id,
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
        <div className="flex items-center justify-end pt-4 px-4">
          <div className="flex border dark:border-gray-700 rounded-md">
            <Button
              onClick={() => dispatch(previous())}
              color={theme === 'dark' ? 'dark' : 'light'}
              className="rounded-r-none px-1.5"
            >
              <Icon path={mdiChevronLeft} size={.5} />
            </Button>
            <div className="bg-primary px-2 py-1 font-medium text-white border border-primary-0">
              {paginated.meta.current_page}
            </div>
            <Button
              onClick={() => dispatch(next())}
              color={theme === 'dark' ? 'dark' : 'light'}
              className="rounded-l-none px-1.5"
            >
              <Icon path={mdiChevronRight} size={.5} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}