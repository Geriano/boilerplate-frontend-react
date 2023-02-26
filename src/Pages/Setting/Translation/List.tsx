import { useAppDispatch, useAppSelector } from "../../../hooks"
import { lists } from "../../../store/translation"
import classNames from "classnames"

export default function List() {
  const dispatch = useAppDispatch()
  const { languages, current } = useAppSelector(state => state.translation)

  return (
    <div className="col-span-4" style={{
      minHeight: `calc(100vh - 8rem)`
    }}>
      <div className="flex flex-col bg-white rounded-md shadow pb-8">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium capitalize">Language</h3>
        </div>

        <div className="border-y">
          {languages.map(language => {
            return (
              <div 
                key={language} 
                className={classNames("border-r-4 hover:border-primary-0 transition-all hover:bg-gray-100 uppercase px-4 py-2 hover:pl-8 text-sm hover:font-medium cursor-pointer", {
                  'border-transparent': current.language !== language,
                  'bg-gray-100 border-primary-0 font-medium pl-8': current.language === language,
                })}
                onClick={e => {
                  dispatch(lists(language))
                }}
              >
                {language}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}