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
import { AddEsignTagModule } from '../services/add-tag/tag.module';
import { AxiosModule } from '../services/axios/axios.module';
import { UploadModule } from '../services/upload/upload.module';
import { EsignModule } from '../services/sign/sign.module';
import { EsignService } from '../services/sign/sign.service';

@Module({
  imports: [
    UsecasesProxyModule.register(),
    FileValidatorsModule,
    AddEsignTagModule,
    AxiosModule,
    UploadModule,
    EsignModule,
  ],
  // imports: [UsecasesProxyModule.register()],
  providers: [
    AddEsignTagModule,
    AxiosModule,
    UploadModule,
    EsignModule,
    EsignService,
  ],
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
