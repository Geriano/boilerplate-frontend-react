import { Link, useLocation, useResolvedPath } from "react-router-dom"
import Icon from "@mdi/react"
import classNames from "classnames"

export default function SidebarLink({ icon, text, to }: { icon: string, text: string, to: string }) {
  const location = useLocation()
  const route = useResolvedPath(location.pathname)
  const active = route.pathname === to

  return (
    <Link
      to={to}
      title={text}
      className={classNames("flex items-center space-x-2 py-2 px-4 rounded-md text-gray-100 hover:text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-all", {
        'bg-white text-gray-800 dark:bg-gray-700': active,
      })}
    >
      <Icon path={icon} size={.5} />
      <p className="capitalize font-medium">{text}</p>
    </Link>
  )
}