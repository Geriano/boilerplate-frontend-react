import { useEffect, useState } from "react"
import { route } from "../../_backend/routes"
import axios from "axios"
import classNames from "classnames"

type ConfigType = Record<string, Record<string, any> | any>

export const RenderArray = ({ values }: { values: any[] }) => {
  return (
    <div className="flex flex-col">
      {values.map((value) => <Render key={value} value={value} />)}
    </div>
  )
}

export const RenderObject = ({ values }: { values: Record<string, any> }) => {
  return (
    <div className="flex flex-col space-y-1 rounded-md">
      {Object.keys(values).map((key) => (
        <div key={key} className="flex bg-gray-100 rounded-md transition-all hover:bg-gray-50">
          <p className="flex-none rounded-md p-2 mr-1">{key}</p>
          <div className="w-full flex items-center">
            <Render value={values[key]} />
          </div>
        </div>
      ))}
    </div>
  )
}

export const RenderBoolean = ({ value }: { value: boolean }) => {
  return <div className="p-2">{value ? 'true' : 'false'}</div>
}

export const RenderText = ({ value }: { value: string|number|undefined|null }) => {
  return <div className="p-2">{value}</div>
}

export const Render = ({ value }: { value: any }) => {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return <RenderObject values={value} />
  } else if (Array.isArray(value)) {
    return <RenderArray values={value} />
  } else if (typeof value === 'boolean') {
    return <RenderBoolean value={value} />
  } else {
    return <RenderText value={value} />
  }
}

export default function Config() {
  const [config, setConfig] = useState({} as ConfigType)
  const [active, setActive] = useState(null as string|null)

  useEffect(() => {
    axios.get(route('backend-config'))
      .then(response => response.data as ConfigType)
      .then(data => {
        setActive(Object.keys(data).shift()!)
        setConfig(data)
      })
  }, [])

  return (
    <div className="grid gap-4 grid-cols-12">
      <div className="col-span-4">
        <div className="bg-white rounded-md pb-8">
          <h3 className="px-4 font-medium py-4">Config</h3>
          <div className="border-y">
            {Object.keys(config).map(key => {
              return (
                <div
                  key={key}
                  onClick={e => setActive(key)}
                  className={classNames("flex items-center justify-between space-x-1 capitalize border-r-4 px-4 py-2 hover:bg-gray-100 hover:border-primary-0 hover:font-medium hover:pl-8 transition-all cursor-pointer text-sm", {
                    'border-transparent': active !== key,
                    'bg-gray-100 border-primary-0 pl-8 font-medium': active === key,
                  })}
                >
                  {key}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="col-span-8 bg-white rounded-md p-4" style={{
        minHeight: 'calc(100vh - 6rem)',
      }}>
        <Render value={config[active!]} />
      </div>
    </div>
  )
}