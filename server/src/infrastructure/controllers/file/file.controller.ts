import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  RawBodyRequest,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UploadUseCases } from 'src/usecases/file/upload.usecases';
import { NextFunction, Request, Response } from 'express';
// import { FileValidationMiddleware } from 'src/infrastructure/middleware/file.middleware';
import * as multer from 'multer';
// import { FileValidationMiddleware } from 'src/infrastructure/middleware/file.middleware';
import { FileSizeValidationPipe } from 'src/infrastructure/common/validators/file-pipe-validators';
// import { EsignModule } from 'src/infrastructure/services/add-tag/tag.module';
// import { EsignService } from 'src/infrastructure/services/add-tag/tag.service';
import { AxiosService } from 'src/infrastructure/services/axios/axiosinstance.service';
import { AxiosInstance } from 'axios';
import { UploadService } from 'src/infrastructure/services/upload/upload.service';
import { AddEsignTagService } from 'src/infrastructure/services/add-tag/tag.service';
import { EsignService } from 'src/infrastructure/services/sign/sign.service';

interface DocumentInfo {
  template_id: string;
  document_id: string;
  template_name: string;
  role1: RoleInfo;
  role2: RoleInfo;
  role3: RoleInfo;
}

interface RoleInfo {
  name: string;
  email: string;
}
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) => {
    // const customFileName = `${Date.now()}-${Math.random() * 1e10 || 0}-${file.originalname}`;
    callback(null, file.originalname);
  },
});
interface ESignTagData {
  tagId: string;
  tagName: string;
  // other fields...
}
@Controller('file')
export class FileController {
  constructor(
    // @Inject(UsecasesProxyModule.UPLOAD_FILE_USECASES_PROXY)
    // private readonly fileUploadUsecasesProxy: UseCaseProxy<UploadUseCases>,
    // private readonly get: EsignService,
    private readonly axiosService: AxiosService,
    private readonly uploadService: UploadService,
    private readonly addEsignTagService: AddEsignTagService,
    private readonly esignService: EsignService,
  ) {}

  // Upload File and create zoho sign template
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(
    @UploadedFile(FileSizeValidationPipe)
    file: Express.Multer.File,
  ) {
    return await this.uploadService.uploadFile(file);
  }

  @Get()
  async viewFile() {}

  @Put()
  async addEsignTag(@Body() data: DocumentInfo) {
    console.log(data);
    let res = await this.addEsignTagService.addSignTag(data);
    return res;
  }

  @Post('sign')
  async eSign(@Query('template_id') template_id: string) {
    return await this.esignService.sign(template_id);
  }
}
