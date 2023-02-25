import { useEffect } from "react"
import { useAppDispatch } from "../../hooks"
import { paginate } from "../../store/user"
import { Outlet } from "react-router-dom"
import { limit } from "../../store/role"
import List from "./UserRole/List"

export default function UserRole() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(limit(15))
    dispatch(paginate())
  }, [])

  return (
    <div className="grid gap-4 grid-cols-12">
      <List />
      <Outlet />
    </div>
  )
}