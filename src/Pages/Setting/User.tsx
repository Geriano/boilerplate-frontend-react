import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { all } from "../../store/permission"
import { paginate, search, toggle } from "../../store/user"
import Button from "../../Components/Button"
import Icon from "@mdi/react"
import { mdiPlus } from "@mdi/js"
import FloatingInput2 from "../../Components/FloatingInput2"
import Table from "./User/Table"
import Links from "./User/Links"
import Form from "./User/Form"

export default function User() {
  const dispatch = useAppDispatch()
  const paginator = useAppSelector(state => state.user.paginator)
  
  useEffect(() => {
    dispatch(all())
    dispatch(paginate())
  }, [])

  return (
    <>
      <div className="h-full bg-white rounded-md shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={() => dispatch(toggle(true))} color="light">
            <Icon path={mdiPlus} size={.5} />
            <p className="capitalize">Create</p>
          </Button>

          <div className="max-w-xs w-full">
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

        <Table />
        <Links />
      </div>

      <Form />
    </>
  )
}