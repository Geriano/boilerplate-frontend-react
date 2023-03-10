import { mdiViewDashboard } from "@mdi/js"
import { useAppSelector } from "../../hooks"
import classNames from "classnames"
import SidebarLink from "./SidebarLink"
import SidebarToggler from "./SidebarToggler"

export function Title() {
  const APP_NAME = import.meta.env.VITE_APP_NAME

  return (
    <div className="flex-none w-full h-14 flex items-center justify-end p-2">
      <div className="flex-none w-14 h-14"></div>
      <div className="w-full text-center font-semibold text-xl">
        {APP_NAME}
      </div>
      <div className="flex-none w-14 h-14 flex items-center justify-center">
        <div className="md:hidden flex items-center justify-center">
          <SidebarToggler />
        </div>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const { sidebar } = useAppSelector(state => state.layout.open)
  const theme = useAppSelector(state => state.layout.theme)

  return (
    <div className={classNames("absolute md:static flex-none h-full min-h-screen flex flex-col border-r shadow-xl transition-all duration-300 z-20", {
      'w-14': !sidebar,
      'w-64': sidebar,
      'bg-primary-0 text-white': theme === 'primary',
      'bg-secondary-0 text-white': theme === 'secondary',
      'bg-success-0 text-white': theme === 'success',
      'bg-danger-0 text-white': theme === 'danger',
      'bg-info-0 text-white': theme === 'info',
      'bg-warning-0 text-white': theme === 'warning',
      'bg-yellow-0 text-white': theme === 'yellow',
      'bg-dark-0 text-white border-none': theme === 'dark',
      'bg-light-0 text-gray-800': theme === 'light',
    })}>
      {sidebar && (
        <Title />
      )}
      <div className={classNames("flex flex-col space-y-2", {
        'p-4': sidebar,
        'py-1.5 px-1': !sidebar,
      })}>
        {!sidebar && (
          <div className="md:hidden flex items-center justify-center">
            <SidebarToggler />
          </div>
        )}
        <SidebarLink to="/" icon={mdiViewDashboard} text="Dashboard" />
      </div>
    </div>
  )
}