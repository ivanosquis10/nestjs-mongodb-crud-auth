import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UsersService } from 'src/users/users.service'
import { ROLES_KEY } from '../decorators/role.decorator'
import { Role } from '../types/roles.types'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const roles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!roles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()
    return user.role === roles
  }
}
