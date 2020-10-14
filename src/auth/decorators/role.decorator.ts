import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';

export const hasRoles = (...hasRoles: string[]) => SetMetadata('roles', hasRoles);
export const Public = (...hasRoles: string[]) => SetMetadata('roles', true);
export const Auth = (...roles: string[]) => {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(JwtAuthGuard, RolesGuard),
    );
};
