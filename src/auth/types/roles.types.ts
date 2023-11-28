export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const

// Exporta un tipo que represente las claves del objeto ROLES
export type Role = keyof typeof ROLES

// Define un tipo que represente las opciones de roles permitidos
export type RoleOption = typeof ROLES[Role]

// Exporta el conjunto de roles para su uso en el decorador
export const roles: Record<Role, RoleOption> = {
  ADMIN: ROLES.ADMIN,
  USER: ROLES.USER,
}