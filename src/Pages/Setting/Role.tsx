import { useEffect } from "react"
import { useAppDispatch } from "../../hooks"
import { all } from "../../store/permission"
import { paginate } from "../../store/role"
import { Outlet } from "react-router-dom"
import Form from "./Role/Form"
import List from "./Role/List"

export default function Role() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(all())
    dispatch(paginate())
  }, [])

  return (
    <>
      <div className="grid gap-4 grid-cols-12">
        <List />
        <Outlet />
      </div>
      <Form />
    </>
  )
}