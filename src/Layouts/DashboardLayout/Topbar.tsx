import { useAppSelector } from "../../hooks"
import classNames from "classnames"
import SidebarToggler from "./SidebarToggler"
import TopbarDropdown from "./TopbarDropdown"

export default function Topbar() {
  const theme = useAppSelector(state => state.layout.theme)
  
  return (
    <div className={classNames("sticky top-0 w-full h-14 border-b flex items-center justify-between shadow transition-all duration-300 z-10", {
      'bg-white text-gray-700': theme !== 'dark',
      'bg-gray-800 text-gray-100 border-gray-800': theme == 'dark',
    })}>
      <div className="flex-none w-14 h-14 flex items-center justify-center">
        <SidebarToggler />
      </div>
      <div className="flex items-center justify-end w-full h-full p-2">
        <TopbarDropdown />
      </div>
    </div>
  )
}