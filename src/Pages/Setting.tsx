import { usePermission, useRole } from "../hooks"
import { Outlet } from "react-router-dom"
import SettingDropdown from "../Components/SettingDropdown"
import SettingMenu from "../Components/SettingMenu"

export default function Setting() {
  const role = useRole()
  const permission = usePermission()

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3">
        <div className="flex flex-col space-y-2">
          {role.has(['superuser', 'dev']) && (
            <SettingDropdown actives={['/setting/config', '/setting/translation']} label="Setup">
              <SettingMenu to="/setting/config">Config</SettingMenu>
              <SettingMenu to="/setting/translation">Translation</SettingMenu>
            </SettingDropdown>
          )}

          {role.has(['superuser', 'dev']) && (
            <SettingDropdown actives={['/setting/permission', '/setting/role', '/setting/user']} label="Access & Permission">
              {permission.has(['create permission', 'read permission', 'update permission', 'delete permission']) && (
                <SettingMenu to="/setting/permission">Permission</SettingMenu>
              )}

              {permission.has(['create role', 'read role', 'update role', 'delete role']) && (
                <SettingMenu to="/setting/role">Role</SettingMenu>
              )}

              {permission.has(['create user', 'read user', 'update user', 'delete user']) && (
                <>
                  <SettingMenu to="/setting/user">User</SettingMenu>
                  <SettingMenu to="/setting/user/permission">User Permission</SettingMenu>
                  <SettingMenu to="/setting/user/role">User Role</SettingMenu>
                </>
              )}
            </SettingDropdown>
          )}
        </div>
      </div>
      <div className="col-span-9" style={{
        minHeight: 'calc(100vh - 6rem)',
      }}>
        <Outlet />
      </div>
    </div>
  )
}