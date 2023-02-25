import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { languages } from "../../store/translation"
import Configuration from "./Translation/Configuration"
import List from "./Translation/List"

export default function Translation() {
  const dispatch = useAppDispatch()
  const language = useAppSelector(state => state.translation.current.language)

  useEffect(() => {
    dispatch(languages())
  }, [])

  return (
    <div className="grid gap-4 grid-cols-12">
      <List />
      {language && (
        <Configuration />
      )}
    </div>
  )
}