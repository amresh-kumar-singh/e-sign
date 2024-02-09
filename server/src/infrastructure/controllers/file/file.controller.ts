import {
  Controller,
  Get,
  Inject,
  Next,
  ParseFilePipe,
  Post,
  Req,
  Res,
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
import { EsignModule } from 'src/infrastructure/services/esign/esign.module';
import { EsignService } from 'src/infrastructure/services/esign/esign.service';
import { AxiosService } from 'src/infrastructure/services/axios/axiosinstance.service';
import { AxiosInstance } from 'axios';
import { UploadService } from 'src/infrastructure/services/upload/upload.service';

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
// const upload = multer({ storage: storage });
@Controller('file')
export class FileController {
  constructor(
    // @Inject(UsecasesProxyModule.UPLOAD_FILE_USECASES_PROXY)
    // private readonly fileUploadUsecasesProxy: UseCaseProxy<UploadUseCases>,
    private readonly get: EsignService,
    private readonly axiosService: AxiosService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(
    @UploadedFile(FileSizeValidationPipe)
    file: Express.Multer.File,
  ) {
    // console.log(file, 'amre');
    // const data = await this.get.eSign();
    return await this.uploadService.uploadFile(file);
  }
  // https://accounts.zoho.in/oauth/v2/token?refresh_token=1000.267533a8680ee40c52637add071db9c5.ac56aaa00ac3cf28f0577882564a4ed6&client_id=1000.K43Z4WVTXSVS2Z4OFJIUV32Q6YCSOK&client_secret=294143f816d92063e4c35e448b8cc6a4d9367e0a13&redirect_uri=https://sign.zoho.com&grant_type=refresh_token
  @Get()
  async genrate() {
    const axiosInstance = this.axiosService.getAxiosInstance();
    try {
      const response = await axiosInstance.get(`templates/57265000000032594`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
