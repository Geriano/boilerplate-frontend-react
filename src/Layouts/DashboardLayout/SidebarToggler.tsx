import { useAppDispatch, useAppSelector } from "../../hooks"
import { mdiChevronDoubleRight } from "@mdi/js"
import { toggle } from "../../store/layout"
import Icon from "@mdi/react"
import classNames from "classnames"

export default function SidebarToggler() {
  const { sidebar } = useAppSelector(state => state.layout.open)
  const dispatch = useAppDispatch()

  return (
    <div className="flex-none w-14 h-14 flex items-center justify-center">
      <button onClick={() => dispatch(toggle('sidebar'))} type="button" title="Toggle Sidebar" className={classNames("transition-all duration-300", {
        "rotate-180": sidebar,
      })}>
        <Icon path={mdiChevronDoubleRight} size={.75} />
      </button>
    </div>
  )
}