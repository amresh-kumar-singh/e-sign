import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UploadUseCases } from 'src/usecases/file/upload.usecases';
import { Request, Response } from 'express';
import * as multer from 'multer';
import { FileSizeValidationPipe } from 'src/infrastructure/common/validators/file-pipe-validators';
import * as fs from 'fs';
import { AddEsignTagUseCases } from 'src/usecases/file/tag.usecases';
import { AddEsignTag } from 'src/domain/upload/upload.interface';
import { SignDocumentUseCases } from 'src/usecases/file/sign.usecases';

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

@Controller('file')
export class FileController {
  constructor(
    @Inject(UsecasesProxyModule.UPLOAD_FILE_USECASES_PROXY)
    private readonly uploadFileUsecasesProxy: UseCaseProxy<UploadUseCases>,
    @Inject(UsecasesProxyModule.ADD_TAG_USECASES_PROXY)
    private readonly addEsignTagUsecasesProxy: UseCaseProxy<AddEsignTagUseCases>,
    @Inject(UsecasesProxyModule.ESIGN_USECASES_PROXY)
    private readonly eSignUsecasesProxy: UseCaseProxy<SignDocumentUseCases>,
  ) {}

  // Upload File and create zoho sign template
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(
    @UploadedFile(FileSizeValidationPipe)
    file: Express.Multer.File,
  ) {
    const data = await this.uploadFileUsecasesProxy.getInstance().upload(file);
    return data;
  }

  @Get()
  async viewFile(
    @Query('template_id') template_id: string,
    @Res() res: Response,
  ) {
    if (!fs.existsSync(`${template_id}.json`))
      throw new BadRequestException(
        `No file found with template id: ${template_id}`,
      );
    const file = fs.readFileSync(`${template_id}.json`, 'utf-8');
    const fileObjData = JSON.parse(file);
    // Saved template name as file name during upload
    const fileName = fileObjData.upload.templates.template_name;
    const filePath = 'uploads/' + fileName;
    const stats = fs.statSync(filePath);

    res.setHeader('Content-Length', stats.size);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);

    return res.status(HttpStatus.OK);
  }

  @Put()
  async addEsignTag(@Body() data: AddEsignTag) {
    const res = await this.addEsignTagUsecasesProxy
      .getInstance()
      .addEsignTag(data);
    return res;
  }

  @Post('sign')
  async eSign(@Query('template_id') template_id: string) {
    return await this.eSignUsecasesProxy
      .getInstance()
      .signDocument(template_id);
  }
}
