import { CanActivate, ExecutionContext } from '@nestjs/common/interfaces';
import { Request } from 'express';

export class RoleGuard implements CanActivate {
  private role: string;

  constructor(role: string) {
    this.role = role;
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request: any = ctx.getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (this.role == request.user.role) return true;

    return false;
  }
}
