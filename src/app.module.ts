import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATA_SOURCE_OPTIONS } from './config'
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(DATA_SOURCE_OPTIONS), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
