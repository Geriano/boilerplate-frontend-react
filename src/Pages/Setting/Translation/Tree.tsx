import { Recursive } from "../../../_interfaces/translation"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { change } from "../../../store/translation"
import classNames from "classnames"
import FloatingInput2 from "../../../Components/FloatingInput2"

export function ValueString(props: { name: string, value: string, parent: string[] }) {
  const dispatch = useAppDispatch()
  const joined = props.parent.join('.')
  return (
    <div className="border rounded-md text-sm my-1">
      <FloatingInput2
        name={joined}
        label={props.name}
        type="string"
        value={props.value}
        onChange={e => {
          const target = e.target as HTMLInputElement

          dispatch(change({
            key: joined,
            value: target.value,
          }))
        }}
        required
      />
    </div>
  )
}

export function ValueObject(props: { tree: Recursive, parent: string[] }) {
  const keys = Object.keys(props.tree)

  return (
    <>
      {keys.map(key => {
        const value = props.tree[key]

        return (
          <div key={key} className="flex flex-col space-y-1">
            {typeof value !== 'string' && <div className="w-fit bg-gray-100 py-1 px-3 rounded-md">{key}</div>}
            <div className={classNames("flex flex-col space-y-1", {
              'pl-4': typeof value === 'string'
            })}>
              {
                typeof value === 'string' ? 
                <ValueString name={key} value={value} parent={props.parent.concat([key])} /> :
                <div className="pl-8">
                  <ValueObject tree={value} parent={props.parent.concat([key])}  />
                </div>
              }
            </div>
          </div>
        )
      })}
    </>
  )
}

export default function Tree() {
  const tree = useAppSelector(state => state.translation.tree)

  return <ValueObject tree={tree || {}} parent={[]} />
}