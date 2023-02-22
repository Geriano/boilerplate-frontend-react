import Icon from "@mdi/react"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { mdiDelete, mdiPen } from "@mdi/js"
import Button from "../../../Components/Button"
import { destroy, edit } from "../../../store/user"

export default function Table() {
  const paginated = useAppSelector(state => state.user.paginated)
  const dispatch = useAppDispatch()

  return (
    <div className="h-full rounded-md border overflow-scroll" style={{
      maxHeight: 'calc(100% - 6rem)',
    }}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="sticky top-0 border-b border-gray-400">
            <th className="sticky top-0 bg-gray-50 py-2 px-3 whitespace-nowrap">No</th>
            <th className="sticky top-0 bg-gray-50 py-2 px-3 whitespace-nowrap">Name</th>
            <th className="sticky top-0 bg-gray-50 py-2 px-3 whitespace-nowrap">Email</th>
            <th className="sticky top-0 bg-gray-50 py-2 px-3 whitespace-nowrap">Username</th>
            <th className="sticky top-0 bg-gray-50 py-2 px-3 whitespace-nowrap">Email Verified At</th>
            <th className="sticky top-0 bg-gray-50 py-2 px-3 whitespace-nowrap">Created At</th>
            <th className="sticky top-0 bg-gray-50 py-2 px-3 whitespace-nowrap">#</th>
          </tr>
        </thead>
        <tbody>
          {paginated.data.map((user, i) => {
            return (
              <tr key={user.id} className="border transition-all hover:bg-gray-50">
                <td className="py-1 px-3 whitespace-nowrap text-center">{i+1}</td>
                <td className="py-1 px-3 whitespace-nowrap">{user.name}</td>
                <td className="py-1 px-3 whitespace-nowrap">{user.email}</td>
                <td className="py-1 px-3 whitespace-nowrap">{user.username}</td>
                <td className="py-1 px-3 whitespace-nowrap text-center">{ user.email_verified_at ? new Date(user.email_verified_at).toLocaleString() : '-' }</td>
                <td className="py-1 px-3 whitespace-nowrap text-center">{ user.created_at ? new Date(user.created_at).toLocaleString() : '-' }</td>
                <td className="py-1 px-3 whitespace-nowrap text-center">
                  <Button
                    color="primary"
                    className="pl-1.5 pr-1.5 text-white mr-1"
                    onClick={() => {
                      dispatch(edit(user))
                    }}
                  >
                    <Icon path={mdiPen} size={.5} />
                  </Button>

                  <Button
                    color="danger"
                    className="pl-1.5 pr-1.5 text-white"
                    onClick={() => {
                      dispatch(destroy(user.id))
                    }}
                  >
                    <Icon path={mdiDelete} size={.5} />
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}