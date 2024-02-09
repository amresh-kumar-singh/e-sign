import { DynamicModule, Module } from '@nestjs/common';
// import { addTodoUseCases } from '../../usecases/todo/addTodo.usecases';
// import { deleteTodoUseCases } from '../../usecases/todo/deleteTodo.usecases';

// import { updateTodoUseCases } from '../../usecases/todo/updateTodo.usecases';
// import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
// import { LoginUseCases } from '../../usecases/auth/login.usecases';
// import { LogoutUseCases } from '../../usecases/auth/logout.usecases';

// import { ExceptionsModule } from '../exceptions/exceptions.module';
// import { LoggerModule } from '../logger/logger.module';
// import { LoggerService } from '../logger/logger.service';

// import { BcryptModule } from '../services/bcrypt/bcrypt.module';
// import { BcryptService } from '../services/bcrypt/bcrypt.service';
// import { JwtModule } from '../services/jwt/jwt.module';
// import { JwtTokenService } from '../services/jwt/jwt.service';
// import { RepositoriesModule } from '../repositories/repositories.module';

// import { DatabaseTodoRepository } from '../repositories/todo.repository';
// import { DatabaseUserRepository } from '../repositories/user.repository';

// import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
// import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';
import { UploadUseCases } from 'src/usecases/file/upload.usecases';
import { UploadService } from '../services/upload/upload.service';
import { AxiosService } from '../services/axios/axiosinstance.service';
import { UploadModule } from '../services/upload/upload.module';
import { AxiosModule } from '../services/axios/axios.module';
import { AddEsignTagService } from '../services/add-tag/tag.service';
import { AddEsignTagModule } from '../services/add-tag/tag.module';
import { AddEsignTagUseCases } from 'src/usecases/file/tag.usecases';
import { EsignService } from '../services/sign/sign.service';
import { EsignModule } from '../services/sign/sign.module';
import { SignDocumentUseCases } from 'src/usecases/file/sign.usecases';

@Module({
  imports: [UploadModule, AxiosModule, AddEsignTagModule, EsignModule],
})
export class UsecasesProxyModule {
  static UPLOAD_FILE_USECASES_PROXY = 'uploadFileUsecasesProxy';
  static ADD_TAG_USECASES_PROXY = 'addTagUsecasesProxy';
  static ESIGN_USECASES_PROXY = 'eSignUsecasesProxy';
  static DOWNNLOAD_USECASES_PROXY = 'downloadUsecasesProxy';
  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [UploadService, AxiosService],
          provide: UsecasesProxyModule.UPLOAD_FILE_USECASES_PROXY,
          useFactory: (
            uploadService: UploadService,
            axiosService: AxiosService,
          ) =>
            new UseCaseProxy(new UploadUseCases(uploadService, axiosService)),
        },
        {
          inject: [AddEsignTagService, AxiosService],
          provide: UsecasesProxyModule.ADD_TAG_USECASES_PROXY,
          useFactory: (
            addEsignTagService: AddEsignTagService,
            axiosService: AxiosService,
          ) =>
            new UseCaseProxy(
              new AddEsignTagUseCases(addEsignTagService, axiosService),
            ),
        },
        {
          inject: [EsignService, AxiosService],
          provide: UsecasesProxyModule.ESIGN_USECASES_PROXY,
          useFactory: (
            esignService: EsignService,
            axiosService: AxiosService,
          ) =>
            new UseCaseProxy(
              new SignDocumentUseCases(esignService, axiosService),
            ),
        },
      ],
      exports: [
        UsecasesProxyModule.UPLOAD_FILE_USECASES_PROXY,
        UsecasesProxyModule.ADD_TAG_USECASES_PROXY,
        UsecasesProxyModule.ESIGN_USECASES_PROXY,
        // UsecasesProxyModule.DOWNNLOAD_USECASES_PROXY
      ],
    };
  }
}
