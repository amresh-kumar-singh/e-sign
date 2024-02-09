import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosService } from '../axios/axiosinstance.service';

@Module({
  providers: [UploadService, AxiosService],
  exports: [UploadService],
  imports: [HttpModule, UploadModule],
})
export class UploadModule {}
