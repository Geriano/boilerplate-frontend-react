import { Card } from "flowbite-react";
import IncomingRequest from "../Charts/IncomingRequest";
import { useRole } from "../hooks";

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