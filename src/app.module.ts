import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './modules/cards/cards.module';
import { StoresModule } from './modules/stores/stores.module';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), CardsModule, StoresModule, CronModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
