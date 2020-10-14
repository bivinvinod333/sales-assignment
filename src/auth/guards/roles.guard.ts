import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from '../../user/interfaces/user.interface';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @InjectModel('User') private readonly userInterfaceModel: Model<UserInterface>,
  ) {
  }

  canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('Roles,', roles);
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log('LOG', request.user);
    const user: any = request.user.payload;
    return this.userService.getSingleUser(user._id)
      .then((userDetails: UserInterface | any) => {
          console.log('User Details', userDetails);
          const hasRole = () => roles.indexOf(userDetails.role) > -1;
          let hasPermission = false;

          if (hasRole()) {
            hasPermission = true;
          } else {
            return false;
          }
          return userDetails && hasPermission;
        },
      );
  }
}
