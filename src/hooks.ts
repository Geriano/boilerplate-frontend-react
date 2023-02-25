import { AppDispatch, RootState } from "./store"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { Role as RoleModel, Permission as PermissionModel } from "./_interfaces/auth"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useRole = () => {
  const { user } = useAppSelector(state => state.auth)

  return new class Role {
    protected roles: RoleModel[]

    constructor() {
      this.roles = user.roles
    }

    has(names: string|string[]) {
      if (this.roles.filter(role => role.key === 'superuser').length > 0) {
        return true
      }

      if (Array.isArray(names)) {
        for (const name of names) {
          if (this.has(name)) {
            return true
          }
        }

        return false
      }

      return this.roles.filter(role => role.key === names).length > 0
    }
  }
}

export const usePermission = () => {
  const { user } = useAppSelector(state => state.auth)

  return new class Permission {
    protected permissions: PermissionModel[]

    constructor() {
      this.permissions = user.roles.reduce((permissions: PermissionModel[], role: RoleModel) => {
        return permissions.concat(...role.permissions)
      }, user.permissions)
    }

    has(names: string|string[]) {
      if (user.roles.filter(role => role.key === 'superuser').length > 0) {
        return true
      }

      if (Array.isArray(names)) {
        for (const name of names) {
          if (this.has(name)) {
            return true
          }
        }

        return false
      }

      return this.permissions.filter(permission => permission.key === names).length > 0
    }
  }
}