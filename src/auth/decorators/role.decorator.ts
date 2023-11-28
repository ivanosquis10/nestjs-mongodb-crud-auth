// en Nest.js se utiliza para asignar metadatos personalizados a los controladores, controladores de métodos o parámetros de un método
import { SetMetadata } from '@nestjs/common'
import { RoleOption } from '../types/roles.types'

export const ROLES_KEY = 'roles'
export const Roles = (role: RoleOption) => SetMetadata(ROLES_KEY, role)