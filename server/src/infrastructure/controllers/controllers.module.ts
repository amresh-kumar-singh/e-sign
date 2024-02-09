import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { FileController } from './file/file.controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
// import { FileValidationMiddleware } from '../middleware/file.middleware';
import { FileValidatorsModule } from '../common/validators/file-validators.module';
import { MulterMiddleware } from '../middleware/multer.middleware';
import { MulterSingleMiddleware } from '../middleware/upload.middleware';
import { EsignModule } from '../services/esign/esign.module';
import { AxiosModule } from '../services/axios/axios.module';
import { UploadModule } from '../services/upload/upload.module';

@Module({
  imports: [
    UsecasesProxyModule.register(),
    FileValidatorsModule,
    EsignModule,
    AxiosModule,
    UploadModule,
  ],
  // imports: [UsecasesProxyModule.register()],
  providers: [EsignModule, AxiosModule, UploadModule],
  controllers: [FileController],
})
export class ControllersModule {}
// export class ControllersModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(MulterMiddleware, MulterSingleMiddleware)
//       .forRoutes({ path: '*', method: RequestMethod.POST });
//   }
// }
