import { mdiChevronDown } from "@mdi/js"
import { PropsWithChildren, useState, MouseEvent, useRef } from "react"
import { useLocation } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import Icon from "@mdi/react"
import classNames from "classnames"

type Props = {
  label: string
  actives: string[]
}

export default function SettingDropdown({ actives, children, label }: PropsWithChildren<Props>) {
  const location = useLocation()
  const active = actives.find(path => location.pathname.startsWith(path)) !== undefined
  const [open, setOpen] = useState(active)
  const ref = useRef(null)

  const toggle = (e: MouseEvent) => {
    e.preventDefault()
    setOpen(!open)
  }

  return (
    <div className={classNames("flex flex-col space-y-2 bg-white dark:bg-gray-700 rounded-md pt-4", {
      'pb-4': active,
      'pb-2': !active,
    })}>
      <div className="flex flex-col space-y-2 ">
        <a onClick={toggle} href="#" title="Toggle" aria-label="Toggle" className="flex items-center justify-between px-4">
          <p aria-label={label} className={classNames("capitalize", {
            'font-medium': open,
          })}>{label}</p>
          <div aria-label="Icon" className={classNames("transition-all duration-300", {
            'rotate-0': !open,
            'rotate-180': open,
          })}>
            <Icon path={mdiChevronDown} size={.75} />
          </div>
        </a>

        <CSSTransition nodeRef={ref} in={open} timeout={400} classNames="opacity">
          <div ref={ref} className="flex flex-col">
            {open && children}
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}