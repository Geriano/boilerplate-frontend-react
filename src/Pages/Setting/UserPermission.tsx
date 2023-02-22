import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { paginate } from "../../store/user";
import { all } from "../../store/permission";
import List from "./UserPermission/List";
import { Outlet } from "react-router-dom";

export default function UserPermission() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(all())
    dispatch(paginate())
  }, [])

  return (
    <div className="grid gap-4 grid-cols-12">
      <List />
      <Outlet />
    </div>
  )
}