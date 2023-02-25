import { useAppDispatch, useAppSelector } from "../../../hooks"
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js"
import { next, previous } from "../../../store/user"
import Button from "../../../Components/Button"
import Icon from "@mdi/react"

export default function Links() {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(state => state.user.paginated.meta)

  return (
    <div className="flex items-center justify-end pt-3">
      <div className="flex max-w-xs border rounded-md">
        <Button onClick={() => dispatch(previous())} color="light" title="Previous">
          <Icon path={mdiChevronLeft} size={.5} />
        </Button>
        <div className="bg-primary text-white px-2 py-1 font-medium" title="Current Page">
          {meta.current_page}
        </div>
        <Button onClick={() => dispatch(next())} color="light" title="Next">
          <Icon path={mdiChevronRight} size={.5} />
        </Button>
      </div>
    </div>
  )
}