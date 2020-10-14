import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RetailersModule } from './retailers/retailers.module';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserInterface } from './user/interfaces/user.interface';
import { Model } from 'mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017', {
    useNewUrlParser: true, useUnifiedTopology: true,
    dbName: 'salesAssignmentDB',
  }), UserModule, RetailersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
