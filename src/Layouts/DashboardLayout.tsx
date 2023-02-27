import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "../hooks"
import Sidebar from "./DashboardLayout/Sidebar"
import Topbar from "./DashboardLayout/Topbar"


export default function DashboardLayout() {
  const authenticated = useAppSelector(state => state.auth.authenticated)
  const location = useLocation()
  const theme = useAppSelector(state => state.layout.theme)
  const query = location.search

  if (theme === 'dark' && !document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.add('dark')
    import('@sweetalert2/theme-dark/dark.css').finally(() => {
      document.documentElement.classList.add('dark')
    })
  } else {
    document.documentElement.classList.remove('dark')
  }

  if (!authenticated) {
    const url = location.pathname + (location.pathname.includes('?') ? query.replace(/^\?/, '&') : query)
    return <Navigate to={`/login?from=${url}`} />
  }

  return (
    <div className="relative flex w-full h-full bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-100 antialiased font-sans text-base transition-all duration-300">
      <Sidebar />
      <div className="w-full h-full min-h-screen">
        <Topbar />

        <main className="flex flex-col space-y-4 px-6 py-4 overflow-auto pl-16 md:pl-6" style={{
          maxHeight: 'calc(100vh - 4rem)'
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}