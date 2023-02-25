import { Modal } from "flowbite-react"
import { useAppDispatch, useAppSelector, usePermission } from "../../../hooks"
import { CSSTransition } from "react-transition-group"
import { FormEvent, useEffect, useRef } from "react"
import { set, store, toggle, update } from "../../../store/permission"
import { route } from "../../../_backend/routes"
import Button from "../../../Components/Button"
import FloatingInput2 from "../../../Components/FloatingInput2"

export default function Form() {
  const dispatch = useAppDispatch()
  const permission = usePermission()
  const { open, form, errors } = useAppSelector(state => state.permission)
  const { name, key } = form
  
  const ref = useRef(null)

  useEffect(() => {
    if (open) {
      const observer = new MutationObserver(() => {
        const input = document.querySelector('[name=name]') as HTMLInputElement|undefined

        if (input) {
          input.focus()
          observer.disconnect()
        }
      })

      observer.observe(document, { attributes: true, childList: true, subtree: true, })
    }
  }, [open])

  const submit = (e: FormEvent) => {
    e.preventDefault()

    dispatch(form.id ? update() : store())
  }

  return (
    <CSSTransition nodeRef={ref} in={open} timeout={500} className="opacity">
      <div ref={ref}>
        <Modal show={open} className="text-base" size="md" onClose={() => dispatch(toggle(false))}>
          <form action={route(form.id ? 'permission.update' : 'permission.store', { id: form.id })} onSubmit={submit}>
            <Modal.Header className="py-1" />

            <Modal.Body>
              <div className="flex flex-col space-y-1">
                <FloatingInput2
                  name="name"
                  type="text"
                  label="Name"
                  value={name || key}
                  onChange={e => {
                    const target = e.target as HTMLInputElement

                    dispatch(set({
                      key: 'name',
                      value: target.value,
                    }))
                  }}
                  required
                  autoFocus
                />
                <p className="text-sm text-danger-0 text-right">{errors.name}</p>

                {permission.has('configure permission key') && (
                  <>
                    <FloatingInput2
                      name="key"
                      type="text"
                      label="Key"
                      value={key}
                      onChange={e => {
                        const target = e.target as HTMLInputElement

                        dispatch(set({
                          key: 'key',
                          value: target.value,
                        }))
                      }}
                      required
                    />
                    <p className="text-sm text-danger-0 text-right">{errors.key}</p>
                  </>
                )}
              </div>
            </Modal.Body>

            <Modal.Footer className="py-1">
              <div className="flex items-center justify-end w-full">
                <Button type="submit" color="primary" className="text-white">
                  Save
                </Button>
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </CSSTransition>
  )
}