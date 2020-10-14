import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
  }

  generateJWT(user: UserInterface): Promise<string> {
    const options = {
      expiresIn: '1d',
    };
    return this.jwtService.signAsync(user, options);
  }
}
