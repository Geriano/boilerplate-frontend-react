import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { relog } from "../store/auth";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { useEffect } from "react";

export function Loading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="animate-spin text-primary-0">
        <Icon path={mdiLoading} size={10} />
      </div>
    </div>
  )
}

export default function AuthLayout() {
  const dispatch = useAppDispatch()
  const { authenticated, token, processing } = useAppSelector(state => state.auth)
  const to = new URLSearchParams(window.location.search).get('from') || '/'

  useEffect(() => {
    if (token && !processing) {
      dispatch(relog())
    }
  }, [])

  if (processing) {
    return <Loading />
  }
  
  if (authenticated) {
    return <Navigate to={to} />
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-200">
      <Outlet />
    </div>
  )
}