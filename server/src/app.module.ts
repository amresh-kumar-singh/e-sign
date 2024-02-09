import { Global, Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { HttpModule } from '@nestjs/axios';
import { EsignService } from './infrastructure/services/esign/esign.service';
import { EsignModule } from './infrastructure/services/esign/esign.module';

@Global()
@Module({
  imports: [
    ControllersModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    EsignModule,
  ],
  // controllers: [ControllersModule],
  // providers: [AppService],
})
export class AppModule {}
