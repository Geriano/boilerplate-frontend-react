import { usePermission, useRole } from "../hooks"
import SettingDropdown from "../Components/SettingDropdown"
import SettingMenu from "../Components/SettingMenu"
import { Outlet } from "react-router-dom"

export default function Setting() {
  const role = useRole()
  const permission = usePermission()

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-2">
        <div className="flex flex-col space-y-2">
          {role.has(['superuser', 'dev']) && (
            <SettingDropdown label="Setup">
              <SettingMenu to="/setting/general">General</SettingMenu>
            </SettingDropdown>
          )}

          {role.has(['superuser', 'dev']) && (
            <SettingDropdown label="Access & Permission">
              {permission.has(['create permission', 'read permission', 'update permission', 'delete permission']) && (
                <SettingMenu to="/setting/permission">Permission</SettingMenu>
              )}

              {permission.has(['create role', 'read role', 'update role', 'delete role']) && (
                <SettingMenu to="/setting/role">Role</SettingMenu>
              )}

              {permission.has(['create user', 'read user', 'update user', 'delete user']) && (
                <SettingMenu to="/setting/user">User</SettingMenu>
              )}
            </SettingDropdown>
          )}
        </div>
      </div>
      <div className="col-span-10" style={{
        minHeight: 'calc(100vh - 6rem)',
      }}>
        <Outlet />
      </div>
    </div>
  )
}