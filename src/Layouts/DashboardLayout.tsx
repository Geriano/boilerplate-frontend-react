import classNames from "classnames"
import { useAppSelector } from "../hooks"
import Sidebar from "./DashboardLayout/Sidebar"
import Topbar from "./DashboardLayout/Topbar"
import { Navigate, Outlet, useLocation } from "react-router-dom"


export default function DashboardLayout() {
  const theme = useAppSelector(state => state.layout.theme)
  const authenticated = useAppSelector(state => state.auth.authenticated)
  const location = useLocation()
  const query = location.search

  if (!authenticated) {
    return <Navigate to={`/login?from=${location.pathname}${query}`} />
  }

  return (
    <div className={classNames("flex w-full h-full antialiased font-sans text-base transition-all duration-300", {
      'bg-gray-200 text-gray-700': theme !== 'dark',
      'bg-slate-800 text-gray-100': theme == 'dark',
    })}>
      <Sidebar />
      <div className="w-full h-full min-h-screen">
        <Topbar />

        <main className="flex flex-col space-y-4 px-6 py-4 overflow-auto" style={{
          maxHeight: 'calc(100vh - 4rem)'
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}