import { useAppDispatch, useAppSelector } from "../../../hooks"
import { mdiCheck } from "@mdi/js"
import { update } from "../../../store/translation"
import { FormEvent } from "react"
import Button from "../../../Components/Button"
import classNames from "classnames"
import Icon from "@mdi/react"
import Tree from "./Tree"

export default function Configuration() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.layout.theme)
  const { lists, current } = useAppSelector(state => state.translation)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(update())
  }

  return (
    <form onSubmit={submit} className="md:col-span-8 bg-white dark:bg-gray-700 rounded-md">
      <div className="grid grid-cols-12 rounded-md">
        <div className="col-span-11 flex items-center overflow-x-auto w-full border-b dark:border-gray-800">
          {lists.map(list => {
            return (
              <div 
                key={list} 
                className={classNames("border-b-4 hover:border-primary-0 transition-all px-4 py-2 cursor-pointer uppercase", {
                  'border-primary-0 font-medium': current.list === list,
                  'border-transparent': current.list !== list,
                })}
              >
                {list}
              </div>
            )
          })}
        </div>

        <div className="col-span-1 flex items-center justify-center px-4 py-2 border-b dark:border-gray-800">
          <Button
            color={theme === 'dark' ? 'dark' : 'light'}
            onClick={() => {
              dispatch(update())
            }}
          >
            <Icon path={mdiCheck} size={.5} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col p-4">
        <Tree />
      </div>
    </form>
  )
}