import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Icon from "@mdi/react";
import { mdiAccount, mdiCog, mdiLogout, mdiMenuDown } from "@mdi/js";
import { theme, toggle } from "../../store/layout";
import { Link } from "react-router-dom";

export default function TopbarDropdown() {
  const { dropdown } = useAppSelector(state => state.layout.open)
  const active = useAppSelector(state => state.layout.theme)
  const dispatch = useAppDispatch()

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
        <div className={classNames("px-2 transition-all duration-300 hover:bg-gray-50", { 'hover:bg-gray-900': active === 'dark' })}>
          <Link to="/profile" className={classNames("flex items-center space-x-2 border-b px-4 py-2", { 'border-gray-900': active === 'dark' })} title="Profile">
            <Icon path={mdiAccount} size={.75} />
            <p className="capitalize font-medium">profile</p>
          </Link>
        </div>
        <div className={classNames("px-2 transition-all duration-300 hover:bg-gray-50", { 'hover:bg-gray-900': active === 'dark' })}>
          <Link to="/setting" className={classNames("flex items-center space-x-2 border-b px-4 py-2", { 'border-gray-900': active === 'dark' })} title="Setting">
            <Icon path={mdiCog} size={.75} />
            <p className="capitalize font-medium">setting</p>
          </Link>
        </div>
        <div className={classNames("px-2 transition-all duration-300 hover:bg-gray-50 border-b", { 'border-gray-900 hover:bg-gray-900': active === 'dark' })}>
          <button type="button" className="flex items-center space-x-2 px-4 py-2" title="Logout">
            <Icon path={mdiLogout} size={.75} />
            <p className="capitalize font-medium">logout</p>
          </button>
        </div>
        <div className="grid gap-2 grid-cols-6 px-2 py-4">
          <div onClick={() => dispatch(theme("primary"))} className="w-4 h-4 flex items-center justify-center cursor-pointer">
            <div className={classNames("w-full h-full border rounded shadow-sm", {
              'bg-primary': active !== 'primary',
              'bg-primary-2': active === 'primary',
              'border-gray-900': active === 'dark',
            })}></div>
          </div>
          <div onClick={() => dispatch(theme("secondary"))} className="w-4 h-4 flex items-center justify-center cursor-pointer">
            <div className={classNames("w-full h-full border rounded shadow-sm", {
              'bg-secondary': active !== 'secondary',
              'bg-secondary-2': active === 'secondary',
              'border-gray-900': active === 'dark',
            })}></div>
          </div>
          <div onClick={() => dispatch(theme("success"))} className="w-4 h-4 flex items-center justify-center cursor-pointer">
            <div className={classNames("w-full h-full border rounded shadow-sm", {
              'bg-success': active !== 'success',
              'bg-success-2': active === 'success',
              'border-gray-900': active === 'dark',
            })}></div>
          </div>
          <div onClick={() => dispatch(theme("danger"))} className="w-4 h-4 flex items-center justify-center cursor-pointer">
            <div className={classNames("w-full h-full border rounded shadow-sm", {
              'bg-danger': active !== 'danger',
              'bg-danger-2': active === 'danger',
              'border-gray-900': active === 'dark',
            })}></div>
          </div>
          <div onClick={() => dispatch(theme("info"))} className="w-4 h-4 flex items-center justify-center cursor-pointer">
            <div className={classNames("w-full h-full border rounded shadow-sm", {
              'bg-info': active !== 'info',
              'bg-info-2': active === 'info',
              'border-gray-900': active === 'dark',
            })}></div>
          </div>
          <div onClick={() => dispatch(theme("warning"))} className="w-4 h-4 flex items-center justify-center cursor-pointer">
            <div className={classNames("w-full h-full border rounded shadow-sm", {
              'bg-warning': active !== 'warning',
              'bg-warning-2': active === 'warning',
              'border-gray-900': active === 'dark',
            })}></div>
          </div>
          <div onClick={() => dispatch(theme("yellow"))} className="w-4 h-4 flex items-center justify-center cursor-pointer">
            <div className={classNames("w-full h-full border rounded shadow-sm", {
              'bg-yellow': active !== 'yellow',
              'bg-yellow-2': active === 'yellow',
              'border-gray-900': active === 'dark',
            })}></div>
          </div>
          <div onClick={() => dispatch(theme("dark"))} className="w-4 h-4 flex items-center justify-center cursor-pointer">
            <div className={classNames("w-full h-full border rounded shadow-sm", {
              'bg-dark': active !== 'dark',
              'bg-dark-2': active === 'dark',
              'border-gray-900': active === 'dark',
            })}></div>
          </div>
          <div onClick={() => dispatch(theme("light"))} className="w-4 h-4 flex items-center justify-center cursor-pointer">
            <div className={classNames("w-full h-full border rounded shadow-sm", {
              'bg-light': active !== 'light',
              'bg-light-2': active === 'light',
              'border-gray-900': active === 'dark',
            })}></div>
          </div>
        </div>
      </div>
    </div>
  )
}