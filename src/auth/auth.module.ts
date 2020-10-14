import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt-strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({

      // secret: configService.get('JWT_SECRET'),
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '10000s' },

    }),
  ],
  providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {
}
