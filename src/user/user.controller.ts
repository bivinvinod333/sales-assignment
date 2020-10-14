import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Post('/login')
  async userLogin(@Body() loginUserDto: UserLoginDto) {
    const user = await this.userService.loginUser(loginUserDto);
    return { message: 'User has been successfully logged in', data: user };
  }
}
