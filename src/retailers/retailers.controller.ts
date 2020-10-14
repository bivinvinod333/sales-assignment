import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RetailersService } from '../retailers/retailers.service';
import { Auth } from '../auth/decorators/role.decorator';
import { USER_ROLES } from '../user/user.module';
import { RetailerInterface } from './interfaces/retailer.interface';
import { CreateNewRetailerDto } from './dto/retailer.dto';


@ApiBearerAuth()
@ApiTags('retailers')
@Controller('retailers')
export class RetailersController {
  constructor(private retailersService: RetailersService) {
  }

  @Auth(USER_ROLES.SALES_HEAD)
  @Post('/')
  async retailersLogin(@Body() createNewRetailerDto: CreateNewRetailerDto) {
    const retailers = await this.retailersService.createNewRetailer(createNewRetailerDto);
    return { message: 'Retailers has been successfully created', data: retailers };
  }
}
