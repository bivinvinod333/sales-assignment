import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserInterface } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserLoginDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userInterface: Model<UserInterface>,
    private authService: AuthService) {
    (async function () {
      if (!await userInterface.countDocuments()) {
        await userInterface.create({ name: 'Bivin Vinod', userName: 'bivin', password: 'bivin' });
      }
    })();
  }

  async loginUser(userLoginDto: UserLoginDto): Promise<UserInterface> {
    const userDetails: UserInterface | any = await this.userInterface.findOne(userLoginDto).lean();
    if (userDetails) {
      userDetails.token = await this.authService.generateJWT(userDetails);
      return userDetails;
    } else {
      throw new UnauthorizedException('Invalid Username Or password!!');
    }
  }

  async getSingleUser(_id: string): Promise<UserInterface> {
    const userDetails: UserInterface = await this.userInterface.findOne({ _id });
    return userDetails;
  }
}
