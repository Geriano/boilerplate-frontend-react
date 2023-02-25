import classNames from "classnames"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { theme } from "../../store/layout"

export default function TopbarColorPicker() {
  const dispatch = useAppDispatch()
  const active = useAppSelector(state => state.layout.theme)

  return (
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
  )
}