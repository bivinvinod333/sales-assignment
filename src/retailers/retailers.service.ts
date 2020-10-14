import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { RetailerInterface } from './interfaces/retailer.interface';
import { Model } from 'mongoose';
import { CreateNewRetailerDto } from './dto/retailer.dto';

@Injectable()
export class RetailersService {
  constructor(@InjectModel('Retailer') private readonly retailerModel: Model<RetailerInterface>) {
  }

  async createNewRetailer(createNewRetailerDto: CreateNewRetailerDto): Promise<RetailerInterface> {
    const options = {
      checkIn: createNewRetailerDto.checkIn,
      checkOut: createNewRetailerDto.checkOut,
      date: createNewRetailerDto.date,
    };
    const isAlreadyAllocated = await this.retailerModel.countDocuments(options);
    if (!isAlreadyAllocated) {
      const userDetails: RetailerInterface | any = await this.retailerModel.create(createNewRetailerDto);
      if (userDetails) {
        return userDetails;
      } else {
        throw new UnauthorizedException('Something Went Wrong!!!!');
      }
    } else {
      throw new BadRequestException('Already assigned a user for this time slot');
    }

  }
}
