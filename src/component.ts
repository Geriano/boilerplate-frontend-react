window.components = window.components || {}
const loading: PromiseLike<void>[] = []
const modules = {
  ...import.meta.glob('./Layouts/*/*.tsx'),
  ...import.meta.glob('./Layouts/*.tsx'),
  ...import.meta.glob('./Pages/*/*.tsx'),
  ...import.meta.glob('./Pages/*.tsx'),
  ...import.meta.glob('./*/*.tsx'),
}

for (const path in modules) {
  const callback = modules[path] as () => PromiseLike<{ default: () => JSX.Element }>
  const load = callback().then((module) => {
    window.components[path.substring(0, path.length - 4)] = module.default
  })
  loading.push(load)
}

export default loading