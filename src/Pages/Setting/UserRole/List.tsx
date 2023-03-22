import { Link, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { next, previous, search } from "../../../store/user"
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js"
import Button from "../../../Components/Button"
import classNames from "classnames"
import FloatingInput2 from "../../../Components/FloatingInput2"
import Icon from "@mdi/react"

export default function List() {
  const dispatch = useAppDispatch()
  const paginator = useAppSelector(state => state.user.paginator)
  const paginated = useAppSelector(state => state.user.paginated)
  const users = paginated.data
  const { id } = useParams()

  return (
    <div className="md:col-span-4 overflow-y-scroll">
      <div className="flex flex-col bg-white dark:bg-gray-700 rounded-md shadow">
        <div className="flex items-center justify-between px-4 py-4">
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
        <div className="border-y dark:border-gray-800">
          {users.map(user => {
            return (
              <Link
                key={user.id}
                to={`/setting/user/role/${user.id}`}
                title={`Role for ${user.name}`}
                aria-label={`Role for ${user.name}`}
                className={classNames("flex items-center space-x-1 justify-between hover:bg-gray-100 dark:hover:bg-gray-800 border-r-4 hover:border-primary-0 py-2 px-4 hover:pl-6 hover:font-medium capitalize transition-all", {
                  'bg-gray-100 dark:bg-gray-800 pl-6 border-primary-0 font-medium': id === user.id,
                  'border-transparent': id !== user.id,
                })}
              >
                <p>{user.name}</p>
              </Link>
            )
          })}
        </div>
        <div className="flex items-center justify-end py-2 px-4 text-sm">
          <div className="flex border dark:border-gray-700 rounded-md">
            <Button
              title="Previous"
              onClick={() => dispatch(previous())}
              className="rounded-r-none px-1.5"
            >
              <Icon path={mdiChevronLeft} size={.5} />
            </Button>
            <div className="bg-primary px-2 py-1 font-medium text-white border border-primary-0">
              {paginated.meta.current_page}
            </div>
            <Button
              title="Next"
              onClick={() => dispatch(next())}
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