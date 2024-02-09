// import { ILogger } from '../../domain/logger/logger.interface';
// import { TodoM } from '../../domain/model/todo';
// import { TodoRepository } from '../../domain/repositories/todoRepository.interface';

import { AxiosService } from 'src/infrastructure/services/axios/axiosinstance.service';
import { EsignService } from 'src/infrastructure/services/sign/sign.service';
import { UploadService } from 'src/infrastructure/services/upload/upload.service';

export class SignDocumentUseCases {
  constructor(
    private readonly esignService: EsignService,
    private readonly axiosService: AxiosService,
  ) {}

  async signDocument(template_id: string) {
    const data = await this.esignService.sign(template_id);
    return data;
  }
}
