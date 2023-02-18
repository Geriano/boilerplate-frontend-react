import { mdiChevronDown } from "@mdi/js"
import Icon from "@mdi/react"
import classNames from "classnames"
import { PropsWithChildren, useState, MouseEvent, useRef } from "react"
import { CSSTransition } from "react-transition-group"

type Props = {
  label: string
}

export default function SettingDropdown({ children, label }: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const toggle = (e: MouseEvent) => {
    e.preventDefault()
    setOpen(!open)
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-2">
        <a onClick={toggle} href="#" className="flex items-center justify-between">
          <p className={classNames("capitalize", {
            'font-medium': open,
          })}>{label}</p>
          <div className={classNames("transition-all duration-300", {
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