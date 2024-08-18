import { Role } from '@prisma/client'

const allRoles = {
  [Role.USER]: [],
  [Role.OWNER]: ['manageUsers'],
  [Role.ADMIN]: ['manageOwners', 'manageUsers']
}

export const roles = Object.keys(allRoles)
export const roleRights = new Map(Object.entries(allRoles))
