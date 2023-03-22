import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import classNames from "classnames"
import { useAppSelector } from "../hooks"

type Props = {
  color?: 'primary'|'secondary'|'success'|'danger'|'info'|'warning'|'dark'|'light'
}

export default function Button(props: PropsWithChildren<Props> & ButtonHTMLAttributes<{}>) {
  const theme = useAppSelector(state => state.layout.theme)
  const color = props.color === 'light' && theme === 'dark' ? 'dark' : props.color

  return (
    <button
      {...props}
      className={classNames(`focus:ring-1 font-medium rounded-lg text-sm px-4 py-2 shadow focus:outline-none transition-all ${props.className || ''}`, {
        'bg-primary-0 hover:bg-primary-1 focus:ring-primary-2': color === 'primary',
        'bg-secondary-0 hover:bg-secondary-1 focus:ring-secondary-2': color === 'secondary',
        'bg-success-0 hover:bg-success-1 focus:ring-success-2': color === 'success',
        'bg-danger-0 hover:bg-danger-1 focus:ring-danger-2': color === 'danger',
        'bg-info-0 hover:bg-info-1 focus:ring-info-2': color === 'info',
        'bg-warning-0 hover:bg-warning-1 focus:ring-warning-2': color === 'warning',
        'bg-dark-0 hover:bg-dark-1 focus:ring-dark-2': color === 'dark',
        'bg-light-0 hover:bg-light-1 focus:ring-light-2': color === 'light',
      })}
    >
      <div className="flex items-center space-x-1">
        {props.children}
      </div>
    </button>
  )
}