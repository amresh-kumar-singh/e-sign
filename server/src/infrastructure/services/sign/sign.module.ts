import { Module } from '@nestjs/common';
import { EsignService } from './sign.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosService } from '../axios/axiosinstance.service';

@Module({
  providers: [EsignService, AxiosService],
  exports: [EsignService],
  imports: [HttpModule],
})
export class EsignModule {}
