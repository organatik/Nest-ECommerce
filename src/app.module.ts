import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './share/user.service';




@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
