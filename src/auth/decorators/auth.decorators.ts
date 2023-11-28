import { UseGuards, applyDecorators } from '@nestjs/common'
import { Role, RoleOption } from '../types/roles.types'
import { Roles } from './role.decorator'
import { AuthGuard } from '../auth.guard'
import { RolesGuard } from '../guard/roles.guard'

export function Auth(role: RoleOption) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard))
}