import { AddEsignTag } from 'src/domain/upload/upload.interface';
import { AddEsignTagService } from 'src/infrastructure/services/add-tag/tag.service';
import { AxiosService } from 'src/infrastructure/services/axios/axiosinstance.service';

export class AddEsignTagUseCases {
  constructor(
    private readonly addEsignTagService: AddEsignTagService,
    private readonly axiosService: AxiosService,
  ) {}
  async addEsignTag(data: AddEsignTag) {
    const res = await this.addEsignTagService.addSignTag(data);
    return res;
  }
}
