import { Global, Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { HttpModule } from '@nestjs/axios';
import { AddEsignTagModule } from './infrastructure/services/add-tag/tag.module';

@Global()
@Module({
  imports: [
    ControllersModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    AddEsignTagModule,
  ],
  // controllers: [ControllersModule],
  // providers: [AppService],
})
export class AppModule {}
