import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { all } from "../../store/permission"
import { paginate, search, toggle } from "../../store/user"
import { mdiPlus } from "@mdi/js"
import Button from "../../Components/Button"
import Form from "./User/Form"
import FloatingInput2 from "../../Components/FloatingInput2"
import Icon from "@mdi/react"
import Links from "./User/Links"
import Table from "./User/Table"

export default function User() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.layout.theme)
  const paginator = useAppSelector(state => state.user.paginator)
  
  useEffect(() => {
    dispatch(all())
    dispatch(paginate())
  }, [])

  return (
    <div className="h-full bg-white dark:bg-gray-700 rounded-md shadow p-4">
      <div className="flex flex-col md:flex-row items-end md:items-center space-y-2 md:space-y-0 justify-between mb-4">
        <Button onClick={() => dispatch(toggle(true))} color={theme === 'dark' ? 'dark' : 'light'}>
          <Icon path={mdiPlus} size={.5} />
          <p className="capitalize">Create</p>
        </Button>

        <div className="md:max-w-xs w-full">
          <FloatingInput2
            padding="sm"
            name="search"
            type="text"
            label="Search"
            className="pt-0 pb-0"
            value={paginator.search}
            onChange={e => {
              const target = e.target as HTMLInputElement

              dispatch(search(target.value))
            }}
          />
        </div>
      </div>

      <div className="overflow-auto">
        <Table />
      </div>
      <Links />
      <Form />
    </div>
  )
}