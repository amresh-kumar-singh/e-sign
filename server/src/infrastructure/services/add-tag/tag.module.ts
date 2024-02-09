import { Module } from '@nestjs/common';
import { AddEsignTagService } from './tag.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosService } from '../axios/axiosinstance.service';

@Module({
  providers: [AddEsignTagService, AxiosService],
  exports: [AddEsignTagService],
  imports: [HttpModule],
})
export class AddEsignTagModule {}
