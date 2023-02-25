import { Card } from "flowbite-react"
import { useRole } from "../hooks"
import IncomingRequest from "../Charts/IncomingRequest"

export default function Dashboard() {
  const role = useRole()

  return (
    <div className="grid gap-4">
      {role.has(['superuser', 'dev']) && (
        <Card>
          <IncomingRequest />
        </Card>
      )}
    </div>
  )
}