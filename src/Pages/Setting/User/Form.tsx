import { Modal } from "flowbite-react"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { CSSTransition } from "react-transition-group"
import { FormEvent, useEffect, useRef } from "react"
import { set, store, toggle, update } from "../../../store/user"
import { route } from "../../../_backend/routes"
import Button from "../../../Components/Button"
import FloatingInput2 from "../../../Components/FloatingInput2"

export default function Form() {
  const dispatch = useAppDispatch()
  const { open, form, errors } = useAppSelector(state => state.user)
  
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
          <form action={route(form.id ? 'user.update' : 'user.store', { id: form.id })} onSubmit={submit}>
            <Modal.Header className="py-1" />

            <Modal.Body>
              <div className="flex flex-col space-y-1">
                <FloatingInput2
                  name="name"
                  type="text"
                  label="Name"
                  value={form.name}
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

                <FloatingInput2
                  name="email"
                  type="email"
                  label="Email"
                  value={form.email}
                  onChange={e => {
                    const target = e.target as HTMLInputElement

                    dispatch(set({
                      key: 'email',
                      value: target.value,
                    }))
                  }}
                  required
                />
                <p className="text-sm text-danger-0 text-right">{errors.email}</p>

                <FloatingInput2
                  name="username"
                  type="text"
                  label="Username"
                  value={form.username}
                  onChange={e => {
                    const target = e.target as HTMLInputElement

                    dispatch(set({
                      key: 'username',
                      value: target.value,
                    }))
                  }}
                  required
                />
                <p className="text-sm text-danger-0 text-right">{errors.username}</p>

                {!form.id && (
                  <>
                    <FloatingInput2
                      name="password"
                      type="password"
                      label="Password"
                      value={form.password}
                      onChange={e => {
                        const target = e.target as HTMLInputElement

                        dispatch(set({
                          key: 'password',
                          value: target.value,
                        }))
                      }}
                      required
                    />
                    <p className="text-sm text-danger-0 text-right">{errors.password}</p>
                  </>
                )}

                {!form.id && (
                  <>
                    <FloatingInput2
                      name="password_confirmation"
                      type="password"
                      label="Password Confirmation"
                      value={form.password_confirmation}
                      onChange={e => {
                        const target = e.target as HTMLInputElement

                        dispatch(set({
                          key: 'password_confirmation',
                          value: target.value,
                        }))
                      }}
                      required
                    />
                    <p className="text-sm text-danger-0 text-right">{errors.password_confirmation}</p>
                  </>
                )}
              </div>
            </Modal.Body>

            <Modal.Footer className="py-1">
              <div className="flex items-center justify-end w-full">
                <Button
                  type="submit"
                  title="Save"
                  color="primary"
                  className="text-white"
                >
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