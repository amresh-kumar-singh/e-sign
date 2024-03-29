// import { ILogger } from '../../domain/logger/logger.interface';
// import { TodoM } from '../../domain/model/todo';
// import { TodoRepository } from '../../domain/repositories/todoRepository.interface';

import { AxiosService } from 'src/infrastructure/services/axios/axiosinstance.service';
import { UploadService } from 'src/infrastructure/services/upload/upload.service';

export class UploadUseCases {
  constructor(
    private readonly uploadService: UploadService,
    private readonly axiosService: AxiosService,
  ) {}

  async upload(file: Express.Multer.File) {
    const data = await this.uploadService.uploadFile(file);
    return data;
  }
}
