import { PropsWithChildren, HTMLInputTypeAttribute, InputHTMLAttributes } from "react"
import classNames from "classnames"

type Props = {
  name: string
  type: HTMLInputTypeAttribute
  label: string
  padding?: 'xs'|'sm'|'md'|'lg'
}

export default function FloatingInput2(props: PropsWithChildren<InputHTMLAttributes<{}> & Props>) {
  const padding = props.padding as undefined|'xs'|'sm'|'md'|'lg'

  return (
    <div className="relative w-full">
      <input 
        {...props as InputHTMLAttributes<{}>}
        className={classNames("block w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer", {
          'px-2.5 pb-2.5 pt-4': padding === undefined,
          'px-1.5 pb-1.5 pt-2 text-sm': padding === 'sm',
          'px-0.5 pb-0.5 pt-1 text-xs': padding === 'xs',
        })} 
        placeholder=" " 
      />
      <label 
        htmlFor={props.name} 
        className={classNames("absolute rounded-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1", {
          'text-base': padding === undefined,
          'text-sm': padding === 'sm',
          'text-xs': padding === 'xs',
        })}
      >
        {props.label}
      </label>
    </div>
  )
}