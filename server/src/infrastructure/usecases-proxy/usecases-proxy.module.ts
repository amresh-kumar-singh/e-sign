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

// @Module({
//   imports: [
//     // LoggerModule,
//     // JwtModule,
//     // BcryptModule,
//     // EnvironmentConfigModule,
//     // RepositoriesModule,
//     // ExceptionsModule,
//   ],
// })
export class UsecasesProxyModule {
  static UPLOAD_FILE_USECASES_PROXY = 'fileUploadUsecasesProxy';
  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [],
          provide: UsecasesProxyModule.UPLOAD_FILE_USECASES_PROXY,
          useFactory: (file: Express.Multer.File) =>
            new UseCaseProxy(new UploadUseCases()),
        },
      ],
      exports: [UsecasesProxyModule.UPLOAD_FILE_USECASES_PROXY],
    };
  }
}
