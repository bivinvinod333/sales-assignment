import { forwardRef, Module } from '@nestjs/common';
import { RetailersService } from './retailers.service';
import { RetailersController } from './retailers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schemas/user.schema';
import { AuthModule } from '../auth/auth.module';
import { RetailerSchema } from './schemas/retailer.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'Retailer', schema: RetailerSchema,
  }]), forwardRef(() => AuthModule), UserModule],
  providers: [RetailersService],
  exports: [RetailersService],
  controllers: [RetailersController],
})
export class RetailersModule {
}
