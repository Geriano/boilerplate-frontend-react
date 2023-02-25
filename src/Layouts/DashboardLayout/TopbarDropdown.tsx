import { useAppDispatch, useAppSelector } from "../../hooks"
import { mdiAccount, mdiCog, mdiLogout, mdiMenuDown } from "@mdi/js"
import { toggle } from "../../store/layout"
import { Link } from "react-router-dom"
import { logout } from "../../store/auth"
import classNames from "classnames"
import Icon from "@mdi/react"
import TopbarColorPicker from "./TopbarColorPicker"

export default function TopbarDropdown() {
  const dispatch = useAppDispatch()
  const { dropdown } = useAppSelector(state => state.layout.open)
  const active = useAppSelector(state => state.layout.theme)

  const close = () => setTimeout(() => dispatch(toggle('dropdown')), 150)

  return (
    <div className="relative flex-none w-14 h-14 flex items-center justify-center">
      <button onClick={() => dispatch(toggle('dropdown'))} type="button" title="Toggle Dropdown" className={classNames("transition-all duration-300", {
        "rotate-90": !dropdown,
        "rotate-0": dropdown
      })}>
        <Icon path={mdiMenuDown} size={.75} />
      </button>

      <div className={classNames("absolute right-0 w-48 border rounded shadow flex flex-col transition-all duration-300", {
        '-top-[100vh]': !dropdown,
        'top-10': dropdown,
        'bg-white text-gray-700': active !== 'dark',
        'bg-gray-800 text-gray-100 border-gray-900': active == 'dark',
      })}>
        <div onClick={close} className={classNames("px-2 transition-all duration-300 hover:bg-gray-50", { 'hover:bg-gray-900': active === 'dark' })}>
          <Link to="/profile" className={classNames("flex items-center space-x-2 border-b px-4 py-2", { 'border-gray-900': active === 'dark' })} title="Profile">
            <Icon path={mdiAccount} size={.75} />
            <p className="capitalize font-medium">profile</p>
          </Link>
        </div>
        <div onClick={close} className={classNames("px-2 transition-all duration-300 hover:bg-gray-50", { 'hover:bg-gray-900': active === 'dark' })}>
          <Link to="/setting" className={classNames("flex items-center space-x-2 border-b px-4 py-2", { 'border-gray-900': active === 'dark' })} title="Setting">
            <Icon path={mdiCog} size={.75} />
            <p className="capitalize font-medium">setting</p>
          </Link>
        </div>
        <div onClick={close} className={classNames("px-2 transition-all duration-300 hover:bg-gray-50 border-b", { 'border-gray-900 hover:bg-gray-900': active === 'dark' })}>
          <button onClick={e => dispatch(logout())} type="button" className="flex items-center space-x-2 px-4 py-2" title="Logout">
            <Icon path={mdiLogout} size={.75} />
            <p className="capitalize font-medium">logout</p>
          </button>
        </div>

        <TopbarColorPicker />
      </div>
    </div>
  )
}