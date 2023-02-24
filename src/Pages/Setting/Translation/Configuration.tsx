import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Button from "../../../Components/Button";
import Icon from "@mdi/react";
import { mdiCheck } from "@mdi/js";
import Tree from "./Tree";
import { update } from "../../../store/translation";
import React from "react";

export default function Configuration() {
  const dispatch = useAppDispatch()
  const { lists, current } = useAppSelector(state => state.translation)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(update())
  }

  return (
    <form onSubmit={submit} className="col-span-8 bg-white rounded-md">
      <div className="grid grid-cols-12 rounded-md">
        <div className="col-span-11 flex items-center overflow-x-auto w-full border-b">
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

        <div className="col-span-1 flex items-center justify-center px-4 py-2 border-b">
          <Button
            color="light"
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