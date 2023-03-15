import { Link, useLocation, useResolvedPath } from "react-router-dom"
import Icon from "@mdi/react"
import classNames from "classnames"
import { useAppSelector } from "../../hooks"

export default function SidebarLink({ icon, text, to }: { icon: string, text: string, to: string }) {
  const location = useLocation()
  const open = useAppSelector(state => state.layout.open.sidebar)
  const route = useResolvedPath(location.pathname)
  const active = route.pathname === to

  return (
    <Link
      to={to}
      title={text}
      aria-label={text}
      className={classNames("flex items-center space-x-2 py-2 rounded-md text-gray-100 hover:text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-all", {
        'bg-white text-gray-800 dark:bg-gray-700': active,
        'px-4': open,
        'px-1 justify-center': !open,
      })}
    >
      <Icon path={icon} size={.5} />
      {open && <p className="capitalize font-medium">{text}</p>}
    </Link>
  )
}