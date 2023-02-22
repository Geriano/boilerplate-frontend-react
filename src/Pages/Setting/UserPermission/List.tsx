import { Link, useParams } from "react-router-dom"
import FloatingInput2 from "../../../Components/FloatingInput2"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import classNames from "classnames"
import { next, previous, search } from "../../../store/user"
import Button from "../../../Components/Button"
import Icon from "@mdi/react"
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js"

export default function List() {
  const dispatch = useAppDispatch()
  const paginator = useAppSelector(state => state.user.paginator)
  const paginated = useAppSelector(state => state.user.paginated)
  const users = paginated.data
  const { id } = useParams()

  return (
    <div className="col-span-4 overflow-y-scroll" style={{
      minHeight: 'calc(100vh - 8rem)',
    }}>
      <div className="flex flex-col bg-white rounded-md shadow">
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h3 className="font-medium capitalize">User</h3>

          <div className="max-w-xs">
            <FloatingInput2
              padding="sm"
              name="search"
              type="search"
              label="Search"
              value={paginator.search}
              onChange={e => {
                const target = e.target as HTMLInputElement

                dispatch(search(
                  target.value
                ))
              }}
            />
          </div>
        </div>
        {users.map(user => {
          return (
            <Link key={user.id} to={`/setting/user/permission/${user.id}`} className={classNames("flex items-center space-x-1 justify-between hover:bg-gray-100 border-r-4 hover:border-primary-0 py-2 px-4 hover:pl-6 hover:font-medium capitalize transition-all", {
              'bg-gray-100 pl-6 border-primary-0 font-medium': id === user.id,
              'border-transparent': id !== user.id,
            })}>
              <p>{user.name}</p>
            </Link>
          )
        })}
        <div className="flex items-center justify-end border-t py-2 px-4 text-sm">
          <div className="flex border rounded-md">
            <Button onClick={() => dispatch(previous())} color="light" className="rounded-r-none px-1.5">
              <Icon path={mdiChevronLeft} size={.5} />
            </Button>
            <div className="bg-primary px-2 py-1 font-medium text-white border border-primary-0">
              {paginated.meta.current_page}
            </div>
            <Button onClick={() => dispatch(next())} color="light" className="rounded-l-none px-1.5">
              <Icon path={mdiChevronRight} size={.5} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}