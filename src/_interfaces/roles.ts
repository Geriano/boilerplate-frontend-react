import { Permission } from "./permission"

export interface Role {
  id: string
  title: string
  key: string
  permissions: Permission[]
}