import { useEffect } from "react"
import { useAppDispatch } from "../../hooks"
import { paginate } from "../../store/user"
import * as role from "../../store/role"
import List from "./UserRole/List"
import { Outlet } from "react-router-dom"

export default function UserRole() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(role.limit(15))
    dispatch(paginate())
  }, [])

  return (
    <div className="grid gap-4 grid-cols-12">
      <List />
      <Outlet />
    </div>
  )
}