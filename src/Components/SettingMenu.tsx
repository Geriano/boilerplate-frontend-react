import { PropsWithChildren } from "react"
import { Link, useLocation } from "react-router-dom"
import classNames from "classnames"

type Props = {
  to: string
}

export default function SettingMenu({ children, to }: PropsWithChildren<Props>) {
  const location = useLocation()
  const active = location.pathname.startsWith(to)

  return (
    <Link to={to} className={classNames("text-sm hover:bg-gray-100 border-r-4 hover:border-primary-0 rounded-l py-2 hover:pl-12 transition-all", {
      'border-primary-0 bg-gray-100 pl-12 font-medium': active,
      'border-transparent pl-8': !active,
    })}>
      {children}
    </Link>
  )
}