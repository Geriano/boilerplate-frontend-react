import classNames from "classnames"
import { PropsWithChildren } from "react"
import { Link, useLocation, useResolvedPath } from "react-router-dom"

type Props = {
  to: string
}

export default function SettingMenu({ children, to }: PropsWithChildren<Props>) {
  const location = useLocation()
  const route = useResolvedPath(location.pathname)
  const active = route.pathname === to

  return (
    <Link to={to} className={classNames("text-sm hover:bg-gray-100 border-l-4 hover:border-primary-0 rounded-r pr-2 py-1 hover:pl-4 transition-all", {
      'border-primary-0 bg-gray-100 pl-4 font-medium': active,
      'border-transparent pl-2': !active,
    })}>
      {children}
    </Link>
  )
}